import PropTypes from 'prop-types'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Rating from '@material-ui/lab/Rating'
import { red } from '@material-ui/core/colors'
import MapIcon from '@material-ui/icons/Map'
import ShareIcon from '@material-ui/icons/Share'
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles((theme) => ({
  card: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  map: {
    marginLeft: 'auto',
  },
  avatar: {
    backgroundColor: red[500],
  },
}))

function PlaceCards({ places }) {
  return (
    <Grid container spacing={3} alignItems="center" justify="center">
      {places.map((item, i) => (
        <Grid key={i} item xs={4}>
          <PlaceCard place={item} />
        </Grid>
      ))}
    </Grid>
  )
}
PlaceCards.propTypes = {
  places: PropTypes.array,
}

function PlaceCard({ place }) {
  const classes = useStyles()
  console.log(place)

  return (
    <Card className={classes.card} align="center">
      <CardHeader
        avatar={
          <Avatar aria-lavel="recipe" className={classes.avatar}>
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
        }
        title={place.name}
        subheader="test"
      />
      <CardMedia className={classes.media} />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="P">
          This is sample body
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Rating name="place-rate" value={3} readOnly />
        <IconButton className={classes.map}>
          <MapIcon />
        </IconButton>
      </CardActions>
    </Card>
  )
}
PlaceCard.propTypes = {
  place: PropTypes.object.isRequired,
}

export default PlaceCards
