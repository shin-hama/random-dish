import PropTypes from 'prop-types'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import IconButton from '@material-ui/core/IconButton'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import MenuIcon from '@material-ui/icons/Menu'

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
}))

function Header({ menuIconClicked }) {
  const classes = useStyles()

  return (
    <>
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" className={classes.title} noWrap>
            Random Dish
          </Typography>
          <IconButton color="inherit" aria-label="menu">
            <MenuIcon onClick={menuIconClicked} />
          </IconButton>
        </Toolbar>
      </AppBar>
    </>
  )
}
Header.propTypes = {
  menuIconClicked: PropTypes.func.isRequired,
}

export default Header
