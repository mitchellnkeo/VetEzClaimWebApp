import * as Yup from "yup";

export const initialValues = {
  role: "user",
  firstName: "",
  lastName: "",
  email: "",
  phoneNumberOffice: "",
  providerType:"",
  password: "",
  confirmPassword: "",
};

export const validationSchema = Yup.object().shape({
  role: Yup.string().required("Role type is required"),
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phoneNumberOffice: Yup.string()
    .required("Phone number is required")
    .min(10, "Invalid phone number")
    .max(10, "Invalid phone number")
    .matches(/^[0-9]*$/, "Number format is invalid"),
    // .test(
    //   "phoneNumberOffice",
    //   "Repetition of a single digit isn't allowed",
    //   (value) => {
    //     if (value !== undefined) {
    //       return !value.match(/^([0-9])\1+$/);
    //     }
    //     return true;
    //   }
    // ),

  password: Yup.string()
    .required("Password is required")
    .min(8, "Password length must be at least 8 characters long")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/,
      "Passowrd must contain at least one uppercase, one lowercase, one number and one special character"
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});
