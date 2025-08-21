import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  role: Yup.string(),
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phoneNumberOffice: Yup.string()
    .required("Phone number (office) is required")
    .min(10, "Invalid phone number")
    .max(10, "Invalid phone number")
    .matches(/^[2-9][0-9]*$/, "Number format is invalid")
    .test(
      "phoneNumberOffice",
      "Repetition of a single digit isn't allowed",
      (value) => {
        if (value !== undefined) {
          return !value.match(/^([0-9])\1+$/);
        }
        return true;
      }
    )
});
