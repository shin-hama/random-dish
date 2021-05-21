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
import MobileStepper from '@material-ui/core/MobileStepper'
import Button from '@material-ui/core/Button'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'

import { useAlertDialog } from './AlertDialog'
import { getMethod } from './APIConnection'

const useStyles = makeStyles((theme) => ({
  card: {
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

function PlaceCard({ place, id }) {
  const classes = useStyles()
  const theme = useTheme()
  const minStep = 0
  const [maxStep, setMaxStep] = React.useState(0)
  const [activeStep, setActiveStep] = React.useState(0)
  const [detail, setDetail] = React.useState({})
  const [name, setName] = React.useState('')
  const [photos, setPhotos] = React.useState([])
  const [url, setUrl] = React.useState('')

  useAlertDialog()

  const handleNext = () => {
    setActiveStep((prevValue) => {
      return prevValue === maxStep ? maxStep : prevValue + 1
    })
  }

  const handleBack = () => {
    setActiveStep((prevValue) => {
      return prevValue === minStep ? minStep : prevValue - 1
    })
  }

  const updateMaxStep = () => {
    if (photos && photos.length > 3) {
      setMaxStep(3)
    } else if (photos) {
      setMaxStep(photos.length)
    } else {
      setMaxStep(0)
    }
  }

  const getPlacePhoto = (ref) => {
    getMethod({
      endpoint: `photos/${ref}`,
      callback: (data) => {
        setPhotos((prev) => [...prev, data.result])
      },
    })
  }

  const getPlaceDetail = (id) => {
    getMethod({
      endpoint: `details/${id}`,
      callback: (data) => {
        setDetail(data)
      },
    })
  }

  React.useEffect(() => {
    setPhotos([])
    getPlaceDetail(place.id)
  }, [place])

  React.useEffect(() => {
    setUrl(detail.url ?? '')
    setName(detail.name ?? '')
  }, [detail.url, detail.name])

  React.useEffect(() => {
    for (const photo of detail.photos?.slice(0, 3) ?? []) {
      getPlacePhoto(photo.photo_reference)
    }
  }, [detail.photos])

  React.useEffect(() => {
    updateMaxStep()
  }, [photos.length])

  return (
    <Card className={classes.card} align="center">
      <CardHeader
        avatar={<Avatar className={classes.avatar}>{id}</Avatar>}
        titleTypographyProps={{ variant: 'h6' }}
        title={name}
        className={classes.header}
      />
      <CardActions disableSpacing className={classes.actions}>
        <ToolTip title={place.rating ? place.rating : 0}>
          <Rating
            name="place-rate"
            value={place.rating ? place.rating : 0}
            precision={0.5}
            readOnly
          />
        </ToolTip>
        <ToolTip title="Open GoogleMap">
          <IconButton className={classes.button} href={url} target="_blank">
            <MapIcon />
          </IconButton>
        </ToolTip>
      </CardActions>
      {photos.length !== 0 ? (
        <>
          <CardMedia
            className={classes.media}
            component="img"
            src={photos[activeStep]}
            title={place.name}
          />
          <MobileStepper
            steps={maxStep}
            position="static"
            variant="dots"
            activeStep={activeStep}
            nextButton={
              <Button
                size="small"
                onClick={handleNext}
                disabled={activeStep === maxStep - 1}>
                Next
                {theme.direction === 'rtl' ? (
                  <KeyboardArrowLeft />
                ) : (
                  <KeyboardArrowRight />
                )}
              </Button>
            }
            backButton={
              <Button
                size="small"
                onClick={handleBack}
                disabled={activeStep === minStep}>
                {theme.direction === 'rtl' ? (
                  <KeyboardArrowRight />
                ) : (
                  <KeyboardArrowLeft />
                )}
                Back
              </Button>
            }
          />
        </>
      ) : (
        <></>
      )}
    </Card>
  )
}
PlaceCard.propTypes = {
  place: PropTypes.shape({
    name: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
  id: PropTypes.number.isRequired,
}

export default PlaceCard
