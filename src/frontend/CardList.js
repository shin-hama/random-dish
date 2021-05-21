import PropTypes from 'prop-types'
import React from 'react'
import Grid from '@material-ui/core/Grid'

import PlaceCard from './PlaceCard'

function CardList(props) {
  return (
    <Grid container spacing={0} alignItems="center" justify="center">
      {props.places ? (
        props.places.map((item, i) => (
          <Grid key={i} item xs={12} md={4} lg={4}>
            <PlaceCard place={item} id={i} />
          </Grid>
        ))
      ) : (
        <></>
      )}
    </Grid>
  )
}
CardList.propTypes = {
  places: PropTypes.arrayOf(PropTypes.object),
}

export default CardList
