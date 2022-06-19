import { toast } from "react-toastify";

const showToast = (message: string) => {
   if (localStorage.getItem("theme") === "dark") toast.dark(message);
   else toast.success(message);
};

export default showToast;
