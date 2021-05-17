import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Collapse from '@material-ui/core/Collapse'
import Container from '@material-ui/core/Container'
import CssBaseLine from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import AlertDialog from './AlertDialog'
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
  const [openDrawer, setOpenDrawer] = React.useState(false)
  const [openMap, setOpenMap] = React.useState(false)
  const [places, setPlaces] = React.useState([])
  const [position, setPosition] = React.useState({})
  const [openNow, setOpenNow] = React.useState(true)
  const [radius, setRadius] = React.useState(0)
  const [message, setMessage] = React.useState('')

  const handleDrawerOpen = () => {
    setOpenDrawer(!openDrawer)
  }

  const openNowChanged = () => {
    setOpenNow(!openNow)
  }

  const updateRadius = (value) => {
    setRadius(value)
  }

  const onClick = () => {
    getPlaces()
    setOpenMap(true)
  }

  React.useEffect(() => {
    getPosition()
  }, [])

  React.useEffect(() => {
    console.log('change places')
    setPlaces(
      places.map((item) => ({
        ...item,
        url: getPlaceDetail(item.place_id).url,
      }))
    )

    console.log('update')
  }, places)

  const getPlaces = () => {
    const query = `lat=${position.lat}&lng=${position.lng}&radius=${radius}&open_now=${openNow}`
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
          }))
        )
      },
      errorCallback: setMessage,
    })
  }

  const getPlaceDetail = (place) => {
    getMethod({
      endpoint: `details/${place.place_id}`,
      callback: (data) => {
        const placeDetail = data
        console.log(placeDetail)
      },
      errorCallback: setMessage,
    })
    getPlacePhoto('')
  }

  const getPlacePhoto = (placeDetail) => {
    getMethod({
      endpoint: `photos/${placeDetail.photo_reference}`,
      callback: (data) => {
        const photo = data
        console.log(photo)
      },
      errorCallback: setMessage,
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
                setMessage(
                  'Enable location permissions for this website in your browser settings and reload this page.'
                )
              }
            })
          } else {
            setMessage(
              'Unable to access location. You can continue by submitting location manually.'
            )
          }
        }
      )
    } else {
      setMessage('Sorry, Geolocation is not supported by this browser.')
    }
  }

  console.log(places)
  return (
    <div>
      <CssBaseLine />
      <Header menuIconClicked={handleDrawerOpen} />
      <RightDrawer
        open={openDrawer}
        handleDrawerClose={handleDrawerOpen}
        updateRadius={updateRadius}
        openNow={openNow}
        openNowChanged={openNowChanged}
      />
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: openDrawer,
        })}>
        <Container>
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="textPrimary"
            gutterBottom>
            Find Your Dish!!
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            paragraph>
            What will you eat?
          </Typography>{' '}
          <Collapse in={openMap} timeout="auto">
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
                {openMap ? 'retry' : 'Enjoy your dish'}
              </Button>
            </Grid>
          </Grid>
        </Container>
      </main>
      <footer
        className={clsx(classes.footer, classes.content, {
          [classes.contentShift]: openDrawer,
        })}>
        <Copyright />
      </footer>
      <AlertDialog message={message} setMessage={setMessage} />
    </div>
  )
}

export default App
