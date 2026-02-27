import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getOrdersAction } from '../../Store/OrderReducer';
import OrderCard from '../OrderCard/OrderCard';
function Orders() {
  const orders =  useSelector(state=>state.order.orders);
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getOrdersAction());
  },[]);

  return (
    <div>
        {orders?.map((order)=>(
        <OrderCard order={order}></OrderCard>
        ))}
    </div>
  )
}

export default Orders