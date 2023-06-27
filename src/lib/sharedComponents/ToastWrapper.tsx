"use client";

import { ToastContainer } from "react-toastify";

export default function ToastWrapper() {
  return (
    <ToastContainer
      position="bottom-center"
      autoClose={1250}
      hideProgressBar={false}
      newestOnTop={true}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
  );
}
