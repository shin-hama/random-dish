import PropTypes from 'prop-types'
import axios from 'axios'

import { setAlertMessage } from './AlertDialog'

const BaseApiHost =
  `${process.env.REACT_APP_API_SERVER}/api` || `//${location.host}/api`

export const getMethod = async ({ endpoint, query, callback }) => {
  console.log(location.host)
  console.log(process.env.REACT_APP_API_SERVER)
  console.log(BaseApiHost)
  console.log(endpoint)
  console.log(query)
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
