import { Dispatch } from "react";
import { store } from "store";

export const dispatchStore = store.dispatch as
  | typeof store.dispatch
  | Dispatch<any>;

export const copyText = (text: string) => {
  navigator.clipboard.writeText(text);
};


export const getToken = () => {
  const token = localStorage.getItem('token')
  return token || ""
}

export const setToken = (token: string) => {
  localStorage.setItem('token', token)
}