import productStore from "./Store";
import axios from "axios";
import { environment } from "../environment";
const PRODUCTS = "PRODUCTS";
const GETCART = "GETCART";
const ADDTOCART = "ADDTOCART";
const DELETE = "DELETE";
const INC = "INC";
const DEC = "DEC";
const CLEARCART = "CLEARCART";
const ADD_PRODUCTS = "ADD_PRODUCTS";
const PRODUCT_IMAGE = "PRODUCT_IMAGE";
const DELETE_PRODUCT = "DELETE_PRODUCT";
const EDIT_PRODUCT = "EDIT_PRODUCT";

const productReducer = (state = productStore, action) => {
  switch (action.type) {
    case PRODUCTS:
      action.payload.forEach((element) => {
        element.imagePath = environment.apiUrl + element.imagePath;
      });
      return { ...state, products: action.payload };
    case GETCART:
      action.payload.forEach((p)=>p.product.imagePath=environment.apiUrl+p.product.imagePath)
      return { ...state, cart: action.payload };
    case ADDTOCART:
      let cart = [...state.cart, action.payload];
      return { ...state, cart };
    case DELETE:
      return {
        ...state,
        cart: state.cart.filter((el) => el.id !== action.payload),
      };
    case INC:
      
      
      let product = state.cart.find((p) => p.id === action.payload);
      product.quantity += 1;

      return { ...state, cart: [...state.cart] };
    case DEC:
      let decProduct = state.cart.find((p) => p.id === action.payload);
      decProduct.quantity -= 1;
      return { ...state, cart: [...state.cart] };
    case CLEARCART:
      return { ...state, cart: [] };
    case ADD_PRODUCTS:
      action.payload.imagePath = environment.apiUrl + action.payload.imagePath;
      let products = [...state.products, action.payload];
      return { ...state, products };
    case PRODUCT_IMAGE:
      return { ...state };
    case DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter((el) => el._id !== action.payload),
      };
    case EDIT_PRODUCT:
        let currentPr = state.products.findIndex((p)=>p._id === action.payload._id);
        if (currentPr==-1) {
          return state;
        }
        state.products[currentPr] = action.payload;
        state.products[currentPr].imagePath = environment.apiUrl+action.payload.imagePath;
        
       return { ...state};
  }
  
  return state;
};

export const getProducts = (products) => ({
  type: PRODUCTS,
  payload: products,
});
export const getCart = (products) => ({ type: GETCART, payload: products });
export const addToCart = (products) => ({ type: ADDTOCART, payload: products });
export const deletePr = (id) => ({ type: DELETE, payload: id });
export const incQuantity = (productId) => ({ type: INC, payload: productId });
export const decQuantity = (id) => ({ type: DEC, payload: id });
export const clearCart = () => ({ type: CLEARCART });
export const addProducts = (product) => ({
  type: ADD_PRODUCTS,
  payload: product,
});
export const addImage = (file) => ({ type: PRODUCT_IMAGE, payload: file });
export const deleteProduct = (id) => ({ type: DELETE_PRODUCT, payload: id });
export const productEditing = (editProduct) => ({
  type: EDIT_PRODUCT,
  payload: editProduct,
});

export const getProductsAction = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        environment.apiUrl + "products/allProducts",
        {
          method: "GET",
        }
      );
      const products = await response.json();
      dispatch(getProducts(products));
    } catch (err) {

    }
  };
};

export const getCartAction = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(environment.apiUrl + "cart", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${environment.accessToken}`,
        },
      });
      const products = await response.json();

      dispatch(getCart(products));
    } catch (err) {

    }
  };
};

export const addToCartAction = (productId) => {
  return async (dispatch) => {

    try {
      const product = await fetch(environment.apiUrl + "cart", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${environment.accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId }),
      });
      dispatch(addToCart(productId));
    } catch (err) {

    }
  };
};

export const deleteAction = (productId) => {
  
  return async (dispatch) => {
    try {
      const response = await fetch(
        environment.apiUrl + "cart" + "/" + productId,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${environment.accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      dispatch(deletePr(productId));
    } catch (err) {

    }
  };
};

export const handleInc = (productId) => {

  return async (dispatch) => {
    try {
      const response = await fetch(
        environment.apiUrl + "cart" + "/" + "inc" + "/" + productId,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${environment.accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        dispatch(incQuantity(productId));
      }
    } catch (err) {

    }
  };
};

export const handleDec = (id) => {
  return async (dispatch) => {
    let response = await fetch(environment.apiUrl + "cart" + "/" + "dec" + id, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${environment.accessToken}`,
        "Content-Type": "application/json",
      },
    });
    dispatch(decQuantity(id));
  };
};

export const addProductsAction = (product) => {
  return async (dispatch) => {
    try {
      const token = `Bearer ${environment.accessToken}`;
      let formData = new FormData();
      formData.append("title", product.title);
      formData.append("description", product.description);
      formData.append("price", product.price);
      formData.append("file", product.file);
      const response = await fetch(
        environment.apiUrl + "products/addProducts",
        {
          method: "POST",
          headers: { Authorization: token },
          body: formData,
        }
      );
      const resProduct = await response.json();
      

      dispatch(addProducts(resProduct));
    } catch (err) {

    }
  };
};

export const handleProductDelete = (id) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        environment.apiUrl + "products/deleteProduct/" + id,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${environment.accessToken}`,
          },
        }
      );
      if (response.ok) {
        dispatch(deleteProduct(id));
      }
    } catch (err) {

    }
  };
};

export const handleProductEditing = (editProduct) => {
  return async (dispatch) => {
    try {
      const token = `Bearer ${environment.accessToken}`;
      let formData = new FormData();
      formData.append("title", editProduct.title);
      formData.append("description", editProduct.description);
      formData.append("price", editProduct.price);
      formData.append("file", editProduct.file);
      const response = await fetch(
        environment.apiUrl + "products/editProduct/" + editProduct._id,
        {
          method: "PUT",
          headers: {
            Authorization: token,
          },
          body: formData,
        }
      );

       const respProduct = await response.json();
      if (response.ok) {
        dispatch(productEditing(respProduct));
      }
    } catch (err) {

    }
  };
};

export default productReducer;
