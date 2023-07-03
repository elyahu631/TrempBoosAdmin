// PAddAdmin.jsx
import React, { useContext } from "react";
import { AdminContext } from "../Contexts/AdminContext";
import { AdminValues } from "../utils/initialValues";
import { AddAdminSchema } from "../utils/validationSchema";
import UserForm from "../Components/admin/UserForm";

const PAddAdmin = () => {
  const context = useContext(AdminContext);

  const handleSubmit = (values) => {
    console.log("Form is submitted");
    const data = {
      ...values,
      accountActivated: values.accountActivated ? true : false,
    };

    console.log(data);
    context.addUser(data);
  };

  return (
    <UserForm
      initialValues={AdminValues}
      validationSchema={AddAdminSchema}
      onSubmit={handleSubmit}
      formTitle="Add Admin"
      submitButtonTitle="Add Admin"
    />
  );
};

export default PAddAdmin;
