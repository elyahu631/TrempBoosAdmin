import * as Yup from "yup";

export const LoginSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

export const AddAdminSchema = Yup.object().shape({
  username: Yup.string().min(3).max(15).required("Username is required"),
  first_name: Yup.string().required("First name is required"),
  last_name: Yup.string().required("Last name is required"),
  role: Yup.string().required("Role is required"),
  phone_number: Yup.string()
    .required("Phone number is required")
    .matches(/^(05)[0-9]{8}$/, "Phone number must be 10 digits and start with 05"),
  email: Yup.string().email("Email is invalid").required("Email is required"),
  image_URL: Yup.mixed().required("Profile picture is required"),
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,18}$/,
      "Password must be at least 8 characters, including at least one letter and one number"
    ),
});

export const UpdateAdminSchema = Yup.object().shape({
  username: Yup.string().min(3).max(15).required("Username is required"),
  first_name: Yup.string().required("First name is required"),
  last_name: Yup.string().required("Last name is required"),
  role: Yup.string().required("Role is required"),
  phone_number: Yup.string().required("Phone number is required"),
  email: Yup.string().email("Email is invalid").required("Email is required"),
  image_URL: Yup.mixed().required("Profile picture is required"),
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
  image_URL: Yup.mixed().optional("Profile picture is required"),
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
  image_URL: Yup.mixed().optional("Profile picture is required"),
  gender: Yup.string()
    .required("Gender is required")
    .oneOf(["M", "F", "O"], "Invalid gender"),
  status: Yup.string()
    .required("Status is required")
    .oneOf(["active", "inactive"], "Invalid status"),
});


export const GiftSchema = Yup.object().shape({
  image_URL: Yup.mixed().optional(),
  gift_name: Yup.string()
  .max(50, 'Gift name must be less than 50 characters')
  .required('Gift name is required'),
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


export const GroupSchema = Yup.object().shape({
  image_URL: Yup.mixed().required("Group image is required"),
  group_name: Yup.string().required('Group name is required'),
  type: Yup.string()
    .required('Type is required')
    .oneOf(['CITIES', 'PRIVATE'], 'Type must be either Cities or Private'),
  location: Yup.array().of(
    Yup.object().shape({
      latitude: Yup.number()
        .required('Latitude is required')
        .typeError('Latitude must be a number')
        .min(-90, 'Latitude must be between -90 and 90 degrees')
        .max(90, 'Latitude must be between -90 and 90 degrees'),
      longitude: Yup.number()
        .required('Longitude is required')
        .typeError('Longitude must be a number')
        .min(-180, 'Longitude must be between -180 and 180 degrees')
        .max(180, 'Longitude must be between -180 and 180 degrees'),
    }),
  ).required('Location is required'),
  active: Yup.string()
    .required('Type is required')
    .oneOf(['active', 'inactive'], 'Type must be either Cities or Private'),
});