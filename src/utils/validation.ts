import * as yup from "yup";

export const loginValidation = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
});
