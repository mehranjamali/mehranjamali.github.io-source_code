import { toast } from "react-toastify";

const showToast = (message: string | any, type: string | any = "info", autoClose: number | boolean | any = 1000) => {
   if (localStorage.getItem("theme") === "dark") toast.dark(message, { autoClose, type });
   else toast(message, { autoClose, type });
};

export default showToast;
