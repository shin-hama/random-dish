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
}))

const SearchRangeForm = ({ range, onChange }) => {
  const classes = useStyles()

  return (
    <FormControl className={classes.selector}>
      <InputLabel shrink id="select-range-label">
        Within
      </InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={range}
        onChange={onChange}>
        {[3, 5, 10, 15].map((time) => (
          <MenuItem key={time} value={time}>
            ~{time} min
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
SearchRangeForm.propTypes = {
  range: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
}

const TransportationIcon = ({ byWalk, handleTransportation }) => {
  const selected = {
    color: 'primary',
    fontSize: 'large',
  }

  const unselected = {
    color: 'disabled',
    fontSize: 'small',
  }

  return (
    <IconButton edge="end" aria-label="comments" onClick={handleTransportation}>
      <DirectionsWalkIcon {...(byWalk ? selected : unselected)} />
      <DirectionsCarIcon {...(byWalk ? unselected : selected)} />
    </IconButton>
  )
}
TransportationIcon.propTypes = {
  byWalk: PropTypes.bool.isRequired,
  handleTransportation: PropTypes.func.isRequired,
}

function RightDrawer({
  open,
  handleDrawerClose,
  updateRadius,
  openNow,
  openNowChanged,
}) {
  const classes = useStyles()
  const [time, setTime] = React.useState(5)
  const [byWalk, setByWalk] = React.useState(true)

  const handleTransportation = () => {
    setByWalk(!byWalk)
  }

  const searchRangeChanged = (event) => {
    setTime(event.target.value)
  }

  React.useEffect(() => {
    updateRadius(calcMaxDistance(time, byWalk))
  }, [time, byWalk])

  const calcMaxDistance = (maxTime, byWalk) => {
    const meterPerMin = byWalk ? 80 : 400
    return maxTime * meterPerMin
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
              <TransportationIcon
                byWalk={byWalk}
                handleTransportation={handleTransportation}
              />
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem>
            <SearchRangeForm range={time} onChange={searchRangeChanged} />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem>
            <FormControlLabel
              control={<Checkbox checked={openNow} onChange={openNowChanged} />}
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
  handleDrawerClose: PropTypes.func.isRequired,
  updateRadius: PropTypes.func.isRequired,
  openNow: PropTypes.bool.isRequired,
  openNowChanged: PropTypes.func.isRequired,
}

export default RightDrawer
