import PropTypes from 'prop-types'
import axios from 'axios'

const BaseApiHost =
  `${process.env.REACT_APP_API_SERVER}/api` || `//${location.host}/api`

export const getMethod = ({ endpoint, query, callback, errorCallback }) => {
  const uri = query
    ? `${BaseApiHost}/${endpoint}?${query}`
    : `${BaseApiHost}/${endpoint}`
  console.log(uri)
  axios
    .get(uri)
    .then((response) => {
      console.log(response.data)
      callback?.(response.data)
    })
    .catch(() => {
      console.log('fail to use google map api')
      errorCallback?.('fail to communicate with api')
    })
}
getMethod.propTypes = {
  endpoint: PropTypes.string.isRequired,
  query: PropTypes.string,
  callback: PropTypes.func,
  errorCallback: PropTypes.func,
}
