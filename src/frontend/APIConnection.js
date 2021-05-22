import PropTypes from 'prop-types'
import axios from 'axios'

import { setAlertMessage } from './AlertDialog'

const host = process.env.REACT_APP_API_SERVER ?? `//${location.host}`
const BaseApiHost = `${host}/api`

export const getMethod = async ({ endpoint, query, callback }) => {
  const uri = query
    ? `${BaseApiHost}/${endpoint}?${query}`
    : `${BaseApiHost}/${endpoint}`
  axios
    .get(uri)
    .then((response) => {
      callback?.(response.data)
    })
    .catch(() => {
      setAlertMessage('fail to communicate with api')
    })
}
getMethod.propTypes = {
  endpoint: PropTypes.string.isRequired,
  query: PropTypes.string,
  callback: PropTypes.func,
}
