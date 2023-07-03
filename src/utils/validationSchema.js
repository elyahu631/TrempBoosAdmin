import * as Yup from "yup";

export const LoginSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

export const AddAdminSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  first_name: Yup.string().required("First name is required"),
  last_name: Yup.string().required("Last name is required"),
  role: Yup.string().required("Role is required"),
  phone_number: Yup.string().required("Phone number is required"),
  email: Yup.string().email("Email is invalid").required("Email is required"),
  photo_URL: Yup.mixed().required("Profile picture is required"),
});

export const UpdateAdminSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  first_name: Yup.string().required("First name is required"),
  last_name: Yup.string().required("Last name is required"),
  role: Yup.string().required("Role is required"),
  phone_number: Yup.string().required("Phone number is required"),
  email: Yup.string().email("Email is invalid").required("Email is required"),
  photo_URL: Yup.mixed().required("Profile picture is required"),
});

