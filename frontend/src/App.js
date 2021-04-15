import React from 'react'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import CssBaseLine from '@material-ui/core/CssBaseline'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import Copyright from './Footer'
import Header from './Header'
import MyMap from './Map'
import PlaceCards from './PlaceCard'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
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
  const [apiKey, setApiKey] = React.useState({ apikey: '' })
  const [places, setPlaces] = React.useState({ results: [] })
  const [center, setCenter] = React.useState({
    lat: 0,
    lng: 0,
  })

  const onClick = () => {
    if (!apiKey.apikey) {
      getApi()
      getCurrentPosition()
    }
    getPlaces()
  }

  const getPlaces = () => {
    axios
      .get(`http://127.0.01:8000/places/nearby`)
      .then((response) => {
        console.log(response.data)
        setPlaces(response.data)
      })
      .catch(() => {
        console.log('fail to use google map api')
      })
  }

  const getApi = () => {
    axios
      .get('http://127.0.0.1:8000/apikey')
      .then((response) => {
        setApiKey(response.data)
      })
      .catch(() => {
        console.log('error')
      })
  }

  React.useEffect(() => {}, [])

  const getCurrentPosition = () => {
    axios
      .get('http://127.0.0.1:8000/geolocate')
      .then((response) => {
        setCenter({
          lat: response.data.lat,
          lng: response.data.lng,
        })
      })
      .catch(() => {
        console.log('error')
      })
  }

  return (
    <div>
      <CssBaseLine />
      <Header />
      <main className={classes.content}>
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
          <PlaceCards places={places.results} />
          <Grid container justify="center">
            <MyMap
              apiKey={apiKey.apikey}
              center={center}
              places={places.results}
            />
          </Grid>
          <Grid container justify="center">
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={onClick}
                className={classes.mainButton}>
                {apiKey.apikey ? 'retry' : 'Enjoy your dish'}
              </Button>
            </Grid>
          </Grid>
        </Container>
      </main>
      <footer className={classes.footer}>
        <Copyright />
      </footer>
    </div>
  )
}

export default App
