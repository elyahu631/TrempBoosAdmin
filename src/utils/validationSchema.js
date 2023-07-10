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

export const UserSchema = Yup.object().shape({
  first_name: Yup.string().optional("First name is required"),
  last_name: Yup.string().optional("Last name is required"),
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      "Password must be at least 8 characters, including at least one letter and one number"
    ),
  phone_number: Yup.string()
    .required("Phone number is required")
    .matches(/^(05)[0-9]{8}$/, "Phone number must be 10 digits and start with 05"),
  user_email: Yup.string().email("Email is invalid").required("Email is required"),
  photo_URL: Yup.mixed().optional("Profile picture is required"),
  gender: Yup.string()
    .required("Gender is required")
    .oneOf(["M", "F", "O"], "Invalid gender"),
  status: Yup.string()
    .required("Status is required")
    .oneOf(["active", "inactive"], "Invalid status"),
});


export const UpdateUserSchema = Yup.object().shape({
  first_name: Yup.string().optional("First name is required"),
  last_name: Yup.string().optional("Last name is required"),
  password: Yup.string()
    .optional("Password is required")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      "Password must be at least 8 characters, including at least one letter and one number"
    ),
  phone_number: Yup.string()
    .optional("Phone number is required")
    .matches(/^(05)[0-9]{8}$/, "Phone number must be 10 digits and start with 05"),
  user_email: Yup.string().email("Email is invalid").required("Email is required"),
  photo_URL: Yup.mixed().optional("Profile picture is required"),
  gender: Yup.string()
    .required("Gender is required")
    .oneOf(["M", "F", "O"], "Invalid gender"),
  status: Yup.string()
    .required("Status is required")
    .oneOf(["active", "inactive"], "Invalid status"),
});


export const GiftSchema = Yup.object().shape({
  gift_image: Yup.mixed().optional("Gift picture is required"),
  gift_name: Yup.string()
    .required("Gift name is required"),
  price: Yup.number()
    .required("Price is required")
    .positive("Price must be a positive number")
    .typeError('Price must be a number'),
  quantity: Yup.number()
    .required("Quantity is required")
    .positive("Quantity must be a positive number")
    .integer("Quantity must be an integer")
    .typeError('Quantity must be a number'),
  collect_place: Yup.string()
    .required("Collection place is required"),
});