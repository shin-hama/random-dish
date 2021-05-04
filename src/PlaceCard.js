import PropTypes from 'prop-types'
import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardActions from '@material-ui/core/CardActions'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import ToolTip from '@material-ui/core/Tooltip'
import Rating from '@material-ui/lab/Rating'
import { red } from '@material-ui/core/colors'
import MapIcon from '@material-ui/icons/Map'
import Grid from '@material-ui/core/Grid'
import MobileStepper from '@material-ui/core/MobileStepper'
import Button from '@material-ui/core/Button'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'

const useStyles = makeStyles((theme) => ({
  card: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  header: {
    marginBottom: 10,
  },
  avatar: {
    backgroundColor: red[500],
  },
  actions: {
    paddingTop: 0,
  },
  button: {
    marginLeft: 'auto',
  },
  media: {
    width: '100%',
    height: 300,
    objectFit: 'contain',
  },
}))

function PlaceCards({ places }) {
  return (
    <Grid container spacing={3} alignItems="center" justify="center">
      {places.map((item, i) => (
        <Grid key={i} item xs={6} md={4} lg={4}>
          <PlaceCard place={item} id={i} />
        </Grid>
      ))}
    </Grid>
  )
}
PlaceCards.propTypes = {
  places: PropTypes.array,
}

function PlaceCard({ place, id }) {
  const classes = useStyles()
  const theme = useTheme()
  const maxSteps = place.photos.length >= 3 ? 3 : place.photos.length
  const [activeStep, setActiveStep] = React.useState(0)

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  return (
    <Card className={classes.card} align="center">
      <CardHeader
        avatar={<Avatar className={classes.avatar}>{id}</Avatar>}
        titleTypographyProps={{ variant: 'h6' }}
        title={place.name}
        className={classes.header}
      />
      <CardActions disableSpacing className={classes.actions}>
        <Rating
          name="place-rate"
          value={place.rating}
          precision={0.5}
          readOnly
        />
        <ToolTip title="Open GoogleMap">
          <IconButton
            className={classes.button}
            href={place.url}
            target="_blank">
            <MapIcon />
          </IconButton>
        </ToolTip>
      </CardActions>
      <CardMedia
        className={classes.media}
        component="img"
        src={place.photos[activeStep]}
        title={place.name}
      />
      <MobileStepper
        steps={maxSteps}
        position="static"
        variant="dots"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}>
            Next
            {theme.direction === 'rtl' ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
    </Card>
  )
}
PlaceCard.propTypes = {
  place: PropTypes.object.isRequired,
  id: PropTypes.number.isRequired,
}

export default PlaceCards
