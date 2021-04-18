import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import IconButton from '@material-ui/core/IconButton'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import MenuIcon from '@material-ui/icons/Menu'

import RightDrawer from './RightDrawer'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    color: 'white',
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  title: {
    flexGrow: 1,
  },
}))

function Header() {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  return (
    <>
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" className={classes.title} noWrap>
            Random Dish
          </Typography>
          <IconButton color="inherit" aria-label="menu">
            <MenuIcon onClick={handleDrawerOpen} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <RightDrawer setOpen={setOpen} open={open} />
    </>
  )
}

export default Header
