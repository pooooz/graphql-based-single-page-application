import * as yup from "yup";

export const loginValidation = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
  confirmPassword: yup.string().when("isSignUp", {
    is: (v: boolean) => v === true,
    then: () =>
      yup
        .string()
        .min(8)
        .required()
        .oneOf([yup.ref("password")], "Passwords don't match!"),
    otherwise: () => yup.string(),
  }),
});
