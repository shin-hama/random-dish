import PropTypes from 'prop-types'
import React from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'

const containerStyle = {
  width: '90%',
  height: '60vh',
}

function MyMap({ apiKey, center, places }) {
  return apiKey ? (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={14}>
        {/* Child components, such as markers, info windows, etc. */}
        {places.map((place, i) => (
          <Marker key={i} position={place.geometry.location} />
        ))}
      </GoogleMap>
    </LoadScript>
  ) : (
    <></>
  )
}
MyMap.propTypes = {
  apiKey: PropTypes.string.isRequired,
  center: PropTypes.object.isRequired,
  places: PropTypes.array,
}
export default MyMap
