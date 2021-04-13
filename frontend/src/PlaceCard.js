import PropTypes from 'prop-types'
import React from 'react'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import IconButton from '@material-ui/core/IconButton'
import ToolTip from '@material-ui/core/Tooltip'
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
    paddingLeft: '5%',
    paddingRight: '5%',
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
  const [photo, setPhoto] = React.useState('')
  console.log(place)

  const GetPlacePhoto = (ref) => {
    axios
      .get(`http://127.0.0.1:8000/place/${ref}`)
      .then((response) => {
        console.log(response)
        setPhoto(response.data.image)
      })
      .catch(() => {
        console.log('error')
      })
  }

  React.useEffect(() => {
    GetPlacePhoto(place.photos[0].photo_reference)
  }, [])

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
      <CardMedia
        className={classes.media}
        component="img"
        src={photo}
        title={place.name}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          This is sample body
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Rating name="place-rate" value={3} readOnly />
        <ToolTip title="Open GoogleMap">
          <IconButton className={classes.map}>
            <MapIcon />
          </IconButton>
        </ToolTip>
      </CardActions>
    </Card>
  )
}
PlaceCard.propTypes = {
  place: PropTypes.object.isRequired,
}

export default PlaceCards
