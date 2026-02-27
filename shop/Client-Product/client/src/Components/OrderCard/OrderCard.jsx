import React from 'react'

function OrderCard(props) {
   

  return (
    <div className='row mb-3 m-2'>
        <div className='col'>
            <p>Order Id: {props.order._doc._id} </p>
            <p>Address: {props.order._doc.address}</p>
            <p>Email: {props.order._doc.email} </p>
            <p>Status: {props.order._doc.status}</p>
        </div>
    </div>
  )
}

export default OrderCard