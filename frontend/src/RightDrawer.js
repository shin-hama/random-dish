import PropTypes from 'prop-types'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Checkbox from '@material-ui/core/Checkbox'
import CssBaseline from '@material-ui/core/CssBaseline'
import Drawer from '@material-ui/core/Drawer'
import Divider from '@material-ui/core/Divider'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import IconButton from '@material-ui/core/IconButton'
import InputLabel from '@material-ui/core/InputLabel'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import CloseIcon from '@material-ui/icons/Close'
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar'
import DirectionsWalkIcon from '@material-ui/icons/DirectionsWalk'
import { blue, grey } from '@material-ui/core/colors'

const useStyles = makeStyles((theme) => ({
  drawer: {
    ...theme.mixins.drawer,
    flexShrink: 0,
  },
  drawerPaper: {
    ...theme.mixins.drawer,
  },
  drawerHeader: {
    display: 'flex',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  selector: {
    minWidth: 200,
  },
  enable: {
    color: blue[600],
  },
  disable: {
    color: grey[400],
    fontSize: 'small',
  },
}))

const SearchRangeForm = () => {
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

const TransportationIcon = () => {
  const classes = useStyles()
  const [byWalk, setByWalk] = React.useState(true)

  const handleTransportation = () => {
    setByWalk(!byWalk)
  }

  return (
    <IconButton edge="end" aria-label="comments" onClick={handleTransportation}>
      <DirectionsWalkIcon
        className={byWalk ? classes.enable : classes.disable}
      />
      <DirectionsCarIcon
        className={byWalk ? classes.disable : classes.enable}
      />
    </IconButton>
  )
}

function RightDrawer({ open, setOpen }) {
  const classes = useStyles()
  const [openNow, setOpenNow] = React.useState(true)

  const handleDrawerClose = () => {
    setOpen(false)
  }

  const handleOpenNow = () => {
    setOpenNow(!openNow)
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
            <CloseIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem>
            <ListItemText primary="Search Area" />
            <ListItemSecondaryAction>
              <TransportationIcon />
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem>
            <SearchRangeForm />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem>
            <FormControlLabel
              control={<Checkbox checked={openNow} onChange={handleOpenNow} />}
              label="Open Now"
            />
          </ListItem>
        </List>
      </Drawer>
    </>
  )
}
RightDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
}

export default RightDrawer
