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
  phone_number: Yup.string()
    .required("Phone number is required")
    .matches(/^(05)[0-9]{8}$/, "Phone number must be 10 digits and start with 05"),
  email: Yup.string().email("Email is invalid").required("Email is required"),
  photo_URL: Yup.mixed().required("Profile picture is required"),
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      "Password must be at least 8 characters, including at least one letter and one number"
    ),
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

