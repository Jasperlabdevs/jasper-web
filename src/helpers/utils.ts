import { Dispatch } from "react";
import { store } from "store";

export const dispatchStore = store.dispatch as
  | typeof store.dispatch
  | Dispatch<any>;

export const copyText = (text: string) => {
  navigator.clipboard.writeText(text);
};

export const getToken = () => {
  const token = localStorage.getItem("token");
  return token || "";
};

export const setToken = (token: string) => {
  localStorage.setItem("token", token);
};

export const formatDate = (date: string, separator: string = "/") => {
  const d = new Date(date);
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();

  return yyyy + separator + mm + separator + dd;
};
export const formatDateTime = (date: string, separator: string = "/") => {
  const d = new Date(date);
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  const HH = d.getHours();
  const MM = d.getMinutes();

  return yyyy + separator + mm + separator + dd + " " + HH + ":" + MM;
};


export function debounce(func:any, timeout = 300){
  let timer:any;
  return (...args:any) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func(args) }, timeout);
  };
}