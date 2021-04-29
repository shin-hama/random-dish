import React from 'react'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'© '}
      {new Date().getFullYear()}
      {'.'}
      <Link color="inherit" href="https://material-ui.com/">
        coppla
      </Link>{' '}
    </Typography>
  )
}

export default Copyright
