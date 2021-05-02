import React from 'react'
import axios from 'axios'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import Collapse from '@material-ui/core/Collapse'
import Container from '@material-ui/core/Container'
import CssBaseLine from '@material-ui/core/CssBaseline'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Copyright from './Footer'
import Header from './Header'
import MyMap from './Map'
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

const BaseHost = `https://${location.host}`

function App() {
  const classes = useStyles()
  const [openDrawer, setOpenDrawer] = React.useState(false)
  const [openMap, setOpenMap] = React.useState(false)
  const [places, setPlaces] = React.useState({ results: [] })

  const [currentLocation, setLocation] = React.useState({
    lat: 0,
    lng: 0,
  })
  const [openNow, setOpenNow] = React.useState(true)
  const [radius, setRadius] = React.useState(0)

  const handleDrawerOpen = () => {
    setOpenDrawer(true)
  }

  const handleDrawerClose = () => {
    setOpenDrawer(false)
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

  const getPlaces = () => {
    const queries = `lat=${currentLocation.lat}&lng=${currentLocation.lng}&radius=${radius}&open_now=${openNow}`
    axios
      .get(`${BaseHost}/places/nearby?${queries}`)
      .then((response) => {
        console.log(response.data)
        setPlaces(response.data)
      })
      .catch(() => {
        console.log('fail to use google map api')
      })
  }

  React.useEffect(() => {
    getCurrentPosition()
  }, [])

  const getCurrentPosition = () => {
    console.log(BaseHost)
    axios
      .get(`${BaseHost}/geolocate`)
      .then((response) => {
        setLocation({
          lat: response.data.lat,
          lng: response.data.lng,
        })
      })
      .catch((error) => {
        for (const key of Object.keys(error)) {
          console.log(key)
          console.log(error[key])
        }
      })
  }

  return (
    <div>
      <CssBaseLine />
      <Header menuIconClicked={handleDrawerOpen} />
      <RightDrawer
        open={openDrawer}
        handleDrawerClose={handleDrawerClose}
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
              <MyMap center={currentLocation} places={places.results} />
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
    </div>
  )
}

export default App
