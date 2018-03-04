import React from 'react'

const Notification = ({error, success}) => {
  if (error === null && success === null) {
    return null
  }
  if (error === null) {
    return (
      <div className="success">
        {success}
      </div>
    )
  } else {
    return (
      <div className="error">
        {error}
      </div>
    )
  }

}

export default Notification
