import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Collapse from '@material-ui/core/Collapse'
import Container from '@material-ui/core/Container'
import CssBaseLine from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import { AlertDialog, setAlertMessage, useAlertDialog } from './AlertDialog'
import { getMethod } from './APIConnection'
import Copyright from './Footer'
import Header from './Header'
import Map from './Map'
import CardList from './CardList'
import RightDrawer from './RightDrawer'

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: 0,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: theme.mixins.drawer.width,
  },
  card: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  mainButton: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  footer: {
    padding: theme.spacing(6),
  },
}))

function App() {
  const classes = useStyles()
  const [isOpenDrawer, setIsOpenDrawer] = React.useState(false)
  const [isOpenMap, setIsOpenMap] = React.useState(false)
  const [places, setPlaces] = React.useState([])
  const [position, setPosition] = React.useState({})
  const [isOpenNow, setIsOpenNow] = React.useState(true)
  const [radius, setRadius] = React.useState(0)

  useAlertDialog()

  const handleDrawerOpen = () => {
    setIsOpenDrawer(!isOpenDrawer)
  }

  const openNowChanged = () => {
    setIsOpenNow(!isOpenNow)
  }

  const updateRadius = (value) => {
    setRadius(value)
  }

  const onClick = () => {
    getPlaces()
    setIsOpenMap(true)
  }

  React.useEffect(() => {
    getPosition()
  }, [])

  const getPlaces = () => {
    const query = `lat=${position.lat}&lng=${position.lng}&radius=${radius}&open_now=${isOpenNow}`
    getMethod({
      endpoint: 'places/nearby',
      query: query,
      callback: (data) => {
        setPlaces(
          data.result.map((item) => ({
            name: item.name,
            rating: item.rating,
            location: {
              lat: item.geometry.location.lat,
              lng: item.geometry.location.lng,
            },
            id: item.place_id,
          }))
        )
      },
    })
  }

  const getPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setPosition({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
        },
        () => {
          if (navigator.permissions) {
            navigator.permissions.query({ name: 'geolocation' }).then((res) => {
              if (res.state === 'denied') {
                setAlertMessage(
                  'Enable location permissions for this website in your browser settings and reload this page.'
                )
              }
            })
          } else {
            setAlertMessage(
              'Unable to access location. You can continue by submitting location manually.'
            )
          }
        }
      )
    } else {
      setAlertMessage('Sorry, Geolocation is not supported by this browser.')
    }
  }

  return (
    <div>
      <CssBaseLine />
      <Header menuIconClicked={handleDrawerOpen} />
      <RightDrawer
        open={isOpenDrawer}
        handleDrawerClose={handleDrawerOpen}
        updateRadius={updateRadius}
        openNow={isOpenNow}
        openNowChanged={openNowChanged}
      />
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: isOpenDrawer,
        })}>
        <Container>
          <Typography
            component="h2"
            variant="h3"
            align="center"
            color="textPrimary"
            gutterBottom>
            今日なに食べる ?
          </Typography>
          <Collapse in={isOpenMap} timeout="auto">
            <CardList places={places} />
            <Grid container justify="center">
              <Map center={position} places={places} radius={radius} />
            </Grid>
          </Collapse>
          <Grid container justify="center">
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={onClick}
                className={classes.mainButton}>
                {isOpenMap ? 'なんか違う...' : 'なんでもいい'}
              </Button>
            </Grid>
          </Grid>
        </Container>
      </main>
      <footer
        className={clsx(classes.footer, classes.content, {
          [classes.contentShift]: isOpenDrawer,
        })}>
        <Copyright />
      </footer>
      <AlertDialog />
    </div>
  )
}

export default App
