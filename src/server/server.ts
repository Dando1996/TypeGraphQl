import App from './App'

const port = process.env.PORT || 3001

App.listen(port, (err) => {
  if (err) {
    return console.log(err)
  }

  return console.log(`server is listening on ${port}`)
})
