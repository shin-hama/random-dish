import React from 'react'
import axios from 'axios'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Collapse from '@material-ui/core/Collapse'
import Container from '@material-ui/core/Container'
import CssBaseLine from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import Snackbar from '@material-ui/core/Snackbar'
import Typography from '@material-ui/core/Typography'
import Alert from '@material-ui/lab/Alert'

import Copyright from './Footer'
import Header from './Header'
import Map from './Map'
import PlaceCards from './PlaceCard'
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

const BaseApiHost = `//${location.host}/api`

function App() {
  const classes = useStyles()
  const [openDrawer, setOpenDrawer] = React.useState(false)
  const [openMap, setOpenMap] = React.useState(false)
  const [places, setPlaces] = React.useState({ results: [] })
  const [position, setPosition] = React.useState({})
  const [openNow, setOpenNow] = React.useState(true)
  const [radius, setRadius] = React.useState(0)
  const [openAlert, setOpenAlert] = React.useState(false)
  const [alertMessage, setAlertMessage] = React.useState('')

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

  const handleOpenAlert = (message) => {
    setOpenAlert(true)
    setAlertMessage(message)
  }

  const handleAlertClose = (_event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpenAlert(false)
  }

  React.useEffect(() => {
    getPosition()
  }, [])

  const getPlaces = () => {
    const queries = `lat=${position.lat}&lng=${position.lng}&radius=${radius}&open_now=${openNow}`
    axios
      .get(`${BaseApiHost}/places/nearby?${queries}`)
      .then((response) => {
        setPlaces(response.data)
      })
      .catch(() => {
        console.log('fail to use google map api')
        handleOpenAlert('fail to communicate with api')
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
                handleOpenAlert(
                  'Enable location permissions for this website in your browser settings and reload this page.'
                )
              }
            })
          } else {
            handleOpenAlert(
              'Unable to access location. You can continue by submitting location manually.'
            )
          }
        }
      )
    } else {
      handleOpenAlert('Sorry, Geolocation is not supported by this browser.')
    }
  }

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
            <PlaceCards places={places.results} />
            <Grid container justify="center">
              <Map center={position} places={places.results} radius={radius} />
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
      <Snackbar
        open={openAlert}
        autoHideDuration={6000}
        onClose={handleAlertClose}>
        <Alert
          elevation={6}
          variant="filled"
          onClose={handleAlertClose}
          severity="error">
          {alertMessage}
        </Alert>
      </Snackbar>
    </div>
  )
}

export default App
