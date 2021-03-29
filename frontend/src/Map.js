import PropTypes from 'prop-types'
import React from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api'

const containerStyle = {
  width: '400px',
  height: '400px',
}

function MyMap(props) {
  return props.apiKey ? (
    <LoadScript googleMapsApiKey={props.apiKey}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={props.center}
        zoom={14}>
        {/* Child components, such as markers, info windows, etc. */}
        <></>
      </GoogleMap>
    </LoadScript>
  ) : (
    <></>
  )
}
MyMap.propTypes = {
  apiKey: PropTypes.string.isRequired,
  center: PropTypes.object.isRequired,
}
export default MyMap
