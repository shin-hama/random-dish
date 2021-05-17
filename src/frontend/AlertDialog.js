import PropTypes from 'prop-types'
import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'

const AlertDialog = ({ message, setMessage }) => {
  const [openAlert, setOpenAlert] = React.useState(false)

  const handleAlertClose = (_event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpenAlert(false)
    setMessage('')
  }

  React.useEffect(() => {
    if (message !== '') {
      setOpenAlert(true)
      setMessage(message)
    }
  }, [message])

  return (
    <Snackbar
      open={openAlert}
      autoHideDuration={4000}
      onClose={handleAlertClose}>
      <Alert
        elevation={6}
        variant="filled"
        onClose={handleAlertClose}
        severity="error">
        {message}
      </Alert>
    </Snackbar>
  )
}
AlertDialog.propTypes = {
  message: PropTypes.string.isRequired,
  setMessage: PropTypes.func.isRequired,
}

export default AlertDialog
