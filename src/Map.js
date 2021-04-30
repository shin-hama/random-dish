import PropTypes from 'prop-types'
import React from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'

const containerStyle = {
  width: '100%',
  height: '60vh',
}

function MyMap({ center, places }) {
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

  React.useEffect(() => {
    setApiKey(process.env.REACT_APP_API_KEY || '')
    console.log(apiKey)
  })

  return apiKey ? (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={14}>
        {/* Child components, such as markers, info windows, etc. */}
        {places.map((place, i) => (
          <Marker
            key={i}
            position={place.geometry.location}
            label={markerLabel(i.toString())}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  ) : (
    <></>
  )
}
MyMap.propTypes = {
  center: PropTypes.object.isRequired,
  places: PropTypes.array,
}
export default MyMap
