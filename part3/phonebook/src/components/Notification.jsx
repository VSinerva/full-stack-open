const Notification = ({ message, isError }) => {
  if (message === null) {
    return null
  }

  const notificationStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  const errorStyle = {...notificationStyle, color: 'red'}

  return <div style={isError ? errorStyle : notificationStyle}> {message} </div>
}

export default Notification
