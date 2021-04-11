import React from 'react'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import CssBaseLine from '@material-ui/core/CssBaseline'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import Copyright from './Footer'
import Header from './Header'
import MyMap from './Map'

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
  const [button, setButton] = React.useState('Enjoy Your Dish!')
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
    getTest()
  }

  const getTest = () => {
    axios
      .get(`http://127.0.01:8000/search_nearby`)
      .then((response) => {
        console.log(response.data)
        setPlaces(response.data)
        setButton('retry')
      })
      .catch(() => {
        console.log('fail to use google map api')
      })
  }

  const getApi = () => {
    axios
      .get('http://127.0.0.1:8000/api-key')
      .then((response) => {
        setApiKey(response.data)
      })
      .catch(() => {
        console.log('error')
      })
  }

  React.useEffect(() => {}, [])

  const getCurrentPosition = () => {
    // 精度があまり高くないので、要検討
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
        console.log(position.coords)
      },
      (err) => {
        console.log(err)
      }
    )
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
          <Grid container spacing={3}>
            {places.results.map((item, i) => (
              <Grid key={i} item xs={3}>
                <Card className={classes.card}>
                  <CardContent>{item.name}</CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
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
                {button}
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
