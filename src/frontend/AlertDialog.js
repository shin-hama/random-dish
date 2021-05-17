import PropTypes from 'prop-types'
import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'

const AlertDialog = ({ message }) => {
  const [openAlert, setOpenAlert] = React.useState(false)
  const [alertMessage, setAlertMessage] = React.useState('')

  const handleAlertClose = (_event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpenAlert(false)
  }

  React.useEffect(() => {
    if (message !== '') {
      setOpenAlert(true)
      setAlertMessage(message)
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
        {alertMessage}
      </Alert>
    </Snackbar>
  )
}
AlertDialog.propTypes = {
  message: PropTypes.string.isRequired,
}

export default AlertDialog
