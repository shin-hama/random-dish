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

import Header from './Header'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },

  appBarSpacer: theme.mixins.toolbar,
  content: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(4, 0, 6),
  },
  mainButton: {
    marginTop: theme.spacing(4),
  },
}))

function App() {
  const classes = useStyles()
  const [test, setTest] = React.useState({ test: [] })

  const getTest = () => {
    axios
      .get('http://127.0.0.1:8000')
      .then((response) => {
        console.log(response)
        setTest(response.data)
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
            Find Your Dish !!
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            paragraph>
            食べたいものが決まらない、そんなあなたに提案します。
          </Typography>{' '}
          <Grid container spacing={3}>
            {test.test.map((item) => (
              <Grid key={item} item xs={3}>
                <Card>
                  <CardContent>{item}</CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Grid container justify="center">
            <Grid item>
              <Button
                variant="contained"
                onClick={getTest}
                className={classes.mainButton}>
                Lets search!
              </Button>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  )
}

export default App
