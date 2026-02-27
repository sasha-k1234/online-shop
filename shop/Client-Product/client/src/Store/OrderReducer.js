import orderStore from "./orderStore";
import { environment } from "../environment";
import { toast } from "react-toastify";

const GET_ORDERS = "GET_ORDERS";
const POST_ORDER = "POST_ORDER";

export const orderReducer = (state = orderStore, action) => {
  switch (action.type) {
    case GET_ORDERS:
      return { ...state, orders: action.payload };
    case POST_ORDER:
      return {...state}
  }

  return state;
};

export const getOrders = (orders) => ({ type: GET_ORDERS, payload: orders });
export const postOrder = () => ({type:POST_ORDER});

export const getOrdersAction = () => {
  return async (dispatch) => {
    try {
      const token = `Bearer ${environment.accessToken}`;
      const response = await fetch(environment.apiUrl + "orders/", {
        method: "GET",
        headers: {
          Authorization: token,
        },
      });
      const data = await response.json();

      dispatch(getOrders(data));
    } catch (err) {

    }
  };
};

export const postOrderAction = (order) => {
    return async(dispatch) => {
        try {
            const token = `Bearer ${environment.accessToken}`;
            const response = await fetch(environment.apiUrl+'orders/',{
                method:"POST",
                headers: {
                    Authorization: token,
                    "Content-Type":"application/json",
                  },
                body:JSON.stringify(
                    order
                ),
            });
            if (response.ok) {
              return dispatch(postOrder());
            } else {
                toast.error('Error occured while sending order');
            }
        } catch (error) {

        }
    }
}
