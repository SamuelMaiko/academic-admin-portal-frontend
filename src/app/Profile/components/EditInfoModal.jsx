import React from "react";
import { useStateShareContext } from "../../../Context/StateContext";
import EditInfoForm from "./EditInfoForm";

const EditInfoModal = () => {
  return (
    <div
      className={` bg-[rgba(0,0,0,0.3)] dark:bg-[rgba(0,0,0,0.6)] fixed z-50 inset-0`}
    >
      <EditInfoForm />
    </div>
  );
};

export default EditInfoModal;
