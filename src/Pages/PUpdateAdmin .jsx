import React, { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { AdminContext } from "../Contexts/AdminContext";
import { UpdateAdminSchema } from "../utils/validationSchema";
import UserForm from "../Components/admin/UserForm";
import { decode } from 'base-64';




const PUpdateAdmin = () => {
  const { id } = useParams();
  const decodedUserId = decode(id);
  const { adminUsers } = useContext(AdminContext);
  const user = adminUsers.find((user) => user.id === decodedUserId);

  const [initialValues, setInitialValues] = useState(user || {});
  const context = useContext(AdminContext);

  const handleSubmit = (values) => {
  console.log("Form is submitted");

  // Only keep the fields that have changed
  const changes = Object.keys(values)
    .filter(key => initialValues[key] !== values[key])
    .reduce((obj, key) => {
      obj[key] = values[key];
      return obj;
    }, {});

  // Include id in changes but don't allow it to be modified
  changes.id = decodedUserId;

  console.log(changes);
  context.updateUser(changes);
};


  useEffect(() => {
    setInitialValues(user || {});
  }, [user]);
  

  if (!user) return 'Loading...';

  return (
    <UserForm
      initialValues={user}
      validationSchema={UpdateAdminSchema}
      onSubmit={handleSubmit}
      formTitle="Edit Admin"
      submitButtonTitle="update"
    />
  );
  
};

export default PUpdateAdmin;
