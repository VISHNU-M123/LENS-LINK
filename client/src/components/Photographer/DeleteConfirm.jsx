import React from 'react'
import Swal from 'sweetalert2'

const DeleteConfirm = async (message = 'Are you sure you want to delete this?') => {

    const result = await Swal.fire({
        title:'Confirm Delete',
        text:message,
        icon:'warning',
        showCancelButton:true,
        confirmButtonColor:'#d33',
        cancelButtonColor:'#3085d6',
        confirmButtonText:'Yes, Delete it',
        cancelButtonText:'Cancel'
    })
  return (
    result.isConfirmed
  )
}

export default DeleteConfirm
