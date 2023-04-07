import { loginFailure, loginStart, loginSuccess } from "./userRedux";
import { publicRequest } from "../requestMethods";
import {
    getProductFailure,
    getProductStart,
    getProductSuccess,
    deleteProductStart,
    deleteProductFailure,
    deleteProductSuccess,
    updateProductStart,
    updateProductSuccess,
    updateProductFailure,
    addProductStart,
    addProductSuccess,
    addProductFailure
} from "./productRedux";

export const login = async (dispatch, user) => {
    dispatch(loginStart());
    try {
        const res = await publicRequest.post("/auth/login", user)
        dispatch(loginSuccess(res.data));
    } catch (error) {
        dispatch(loginFailure(error));
    }
}


export const getProducts = async (dispatch) => {
    dispatch(getProductStart());
    try {
        const res = await publicRequest.get("/products")
        dispatch(getProductSuccess(res.data));
    } catch (error) {
        dispatch(getProductFailure(error));
    }
}

export const deleteProducts = async (id, dispatch) => {
    dispatch(deleteProductStart());
    try {
        // const res = await publicRequest.delete(`/products/${id}`); // to activate delete should send this id to db to delete product
        dispatch(deleteProductSuccess(id));
    } catch (error) {
        dispatch(deleteProductFailure(error));
    }
}

export const updateProducts = async (id, product, dispatch) => {
    dispatch(updateProductStart());
    try {
        // update axios
        dispatch(updateProductSuccess({ id: id, product: product }));
    } catch (error) {
        dispatch(updateProductFailure(error));
    }
}

export const addProducts = async (product, dispatch) => {
    dispatch(addProductStart());
    try {
        const res = await publicRequest.post(`/products`, { product }); // to activate delete should send this id to db to delete product
        dispatch(addProductSuccess(res.date));
    } catch (error) {
        dispatch(addProductFailure(error));
    }
}