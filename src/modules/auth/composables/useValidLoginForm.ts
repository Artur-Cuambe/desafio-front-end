import { useField, useForm } from "vee-validate";
import * as yup from "yup";

export const useValidLoginForm = () => {
  const schema = yup.object({
    email: yup.string().required("Email is required").email(),
    password: yup.string().required("Password is required"),
  });

  const formValues = {
    email: "",
    password: "",
  };

  const { handleSubmit } = useForm({
    validationSchema: schema,
    initialValues: formValues,
  });

  const { value: email, errorMessage: emailError } = useField("email");
  const { value: password, errorMessage: passwordError } = useField("password");

  return {
    email,
    emailError,
    password,
    passwordError,
    handleSubmit,
  };
};
