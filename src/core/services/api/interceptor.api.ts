import axios from "axios";
import { getItem } from "../storage/storage";
import toast from "react-hot-toast";

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (expectedError) {
    //   redirect to error page
  } else {
    toast.error("خطا! لطفا دوباره تلاش کنید.");
    // redirect to error page with unknown error
  }

  return Promise.reject(error);
});

setJwt(getJwt());

export function getJwt() {
  return getItem("token");
}

function setJwt(jwt: string | boolean | null) {
  axios.defaults.headers.common["Autorization"] = "Bearer " + jwt;
}

export default {
  get: axios.get,
  put: axios.put,
  post: axios.post,
  delete: axios.delete,
};
