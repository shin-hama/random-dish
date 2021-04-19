import PropTypes from 'prop-types'
import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import CssBaseline from '@material-ui/core/CssBaseline'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar'
import DirectionsWalkIcon from '@material-ui/icons/DirectionsWalk'

const useStyles = makeStyles((theme) => ({
  drawer: {
    ...theme.mixins.drawer,
    flexShrink: 0,
  },
  drawerPaper: { ...theme.mixins.drawer },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
  },
  selector: {
    minWidth: 200,
  },
}))

const SearchRange = () => {
  const classes = useStyles()
  const [range, setRange] = React.useState(5)

  const handleChange = (event) => {
    setRange(event.target.value)
  }

  return (
    <FormControl className={classes.selector}>
      <InputLabel shrink id="select-range-label">
        Within
      </InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={range}
        onChange={handleChange}>
        {[3, 5, 10, 15].map((time, i) => (
          <MenuItem key={i} value={time}>
            ~{time} min
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

function RightDrawer({ setOpen, open }) {
  const classes = useStyles()
  const theme = useTheme()

  const handleDrawerClose = () => {
    setOpen(false)
  }

  return (
    <>
      <CssBaseline />
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}>
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem>
            <ListItemText primary="Search Area" />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="comments">
                <DirectionsWalkIcon />
                <DirectionsCarIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem>
            <SearchRange></SearchRange>
          </ListItem>
        </List>
      </Drawer>
    </>
  )
}
RightDrawer.propTypes = {
  setOpen: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
}

export default RightDrawer
