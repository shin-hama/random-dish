import PropTypes from 'prop-types'
import React from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'

const containerStyle = {
  width: '100%',
  height: '60vh',
}

function Map({ center, places, radius }) {
  const [apiKey, setApiKey] = React.useState('')
  const markerLabel = (label) => {
    return {
      color: 'white',
      fontFamily: 'sans-serif',
      fontSize: '15px',
      fontWeight: '100',
      text: label,
    }
  }

  const ZoomLevel = () => {
    if (radius) {
      if (radius <= 1000) {
        return 16
      } else if (radius <= 2000) {
        return 14
      } else {
        return 12
      }
    } else {
      return 14
    }
  }

  React.useEffect(() => {
    setApiKey(process.env.REACT_APP_API_KEY || '')
  }, [])

  return apiKey ? (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={ZoomLevel()}>
        {/* Child components, such as markers, info windows, etc. */}
        {places.map((place, i) => (
          <Marker
            key={i}
            position={place.location}
            label={markerLabel(i.toString())}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  ) : (
    <></>
  )
}
Map.propTypes = {
  center: PropTypes.object.isRequired,
  places: PropTypes.arrayOf(
    PropTypes.shape({
      location: PropTypes.shape({
        lat: PropTypes.number,
        lng: PropTypes.number,
      }),
    })
  ),
  radius: PropTypes.number,
}
export default Map
