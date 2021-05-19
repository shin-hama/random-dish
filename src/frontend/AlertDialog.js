import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'

let message
let setMessage

export const useAlertDialog = () => {
  ;[message, setMessage] = React.useState('')
}

export const setAlertMessage = (alertMessage) => {
  setMessage(alertMessage)
}

export const AlertDialog = () => {
  const [openAlert, setOpenAlert] = React.useState(false)

  useAlertDialog()

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
