import React from 'react'
import { toast } from 'react-toastify'
function AlertMsg({ message, typeMsg }) {
  return typeMsg == 'error' ? (toast.error(message)) : (toast.success(message))
}

export default AlertMsg