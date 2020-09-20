import { toast } from "react-toastify";
import "./Toast.css";

const Toast = {
  success(msg: string, options = {}) {
    return toast.success(msg, {
      ...options,
      position: "bottom-center",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
    });
  },
  error(msg: string, options = {}) {
    return toast.error(msg, {
      ...options,
      position: "bottom-center",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
    });
  },
  info(msg: string, options = {}) {
    return toast.error(msg, {
      ...options,
      position: "bottom-center",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
    });
  },
};

export default Toast;
