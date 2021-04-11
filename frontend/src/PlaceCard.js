import PropTypes from 'prop-types'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles((theme) => ({
  card: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
}))

function PlaceCards({ places }) {
  return (
    <Grid container spacing={3} alignItems="center" justify="center">
      {places.map((item, i) => (
        <Grid key={i} item xs={4}>
          <PlaceCard name={item.name} />
        </Grid>
      ))}
    </Grid>
  )
}
PlaceCards.propTypes = {
  places: PropTypes.array,
}

function PlaceCard({ name }) {
  const classes = useStyles()

  return (
    <Card className={classes.card} align="center">
      <CardContent>{name}</CardContent>
    </Card>
  )
}
PlaceCard.propTypes = {
  name: PropTypes.string.isRequired,
}

export default PlaceCards
