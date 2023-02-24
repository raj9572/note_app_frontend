import React from 'react'

const Alert = (props) => {
  const {alert} = props
  function capitalizeFirstLetter(string) {
    if(string ==='danger'){
      string="Error"
    }
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  return (
    <div style={{ height: '50px' }}>
      {alert && <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
        <strong>{capitalizeFirstLetter(alert.type)} </strong>: {alert.msg}
      </div>}
    </div>
  )
}

export default Alert
