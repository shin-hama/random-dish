import PropTypes from 'prop-types'
import React from 'react'
import Grid from '@material-ui/core/Grid'

import PlaceCard from './PlaceCard'

function CardList({ places }) {
  return (
    <Grid container spacing={3} alignItems="center" justify="center">
      {places ? (
        places.map((item, i) => (
          <Grid key={i} item xs={6} md={4} lg={4}>
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
