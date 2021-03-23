import React from 'react'
import axios from 'axios'

function App() {
  const [test, setTest] = React.useState({ test: '' })
  const getTest = () => {
    axios
      .get('http://127.0.0.1:8000')
      .then((response) => {
        console.log(response)
        setTest(response.data)
      })
      .catch(() => {
        console.log('error')
      })
  }
  React.useEffect(() => {
    getTest()
  }, [])
  return <div>{test.test}</div>
}

export default App
