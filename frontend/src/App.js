import React from 'react'
import axios from 'axios'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'

function App() {
  const [test, setTest] = React.useState({ test: [] })
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
    console.log(test)
  }, [])
  return (
    <div>
      <Grid container spacing={3}>
        {test.test.map((item) => (
          <Grid key={item} item xs={3}>
            <Paper>{item}</Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export default App
