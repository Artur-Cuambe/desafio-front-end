import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import { useI18n } from "vue-i18n";

export const useValidRegistForm = () => {
  const { t } = useI18n();
  const schema = yup.object({
    termesConditions: yup
      .boolean()
      .required("Por favor aceite os termos e condicoes e prossiga!"),
    email: yup.string().required(" Email is required").email(),
    username: yup.string().required("Full name is required"),
    newPassword: yup
      .string()
      .required(t("The password is mandatory"))
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-@$!%*?&])[A-Za-z\d-@$!%*?&!]+$/,
        t(
          "The password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
        )
      )
      .min(8, t("Password must be at least 8 characters long")),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("newPassword"), null], t("The passwords must match."))
      .required(t("Password confirmation is required"))
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-@$!%*?&])[A-Za-z\d-@$!%*?&!]+$/,
        t(
          "The password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
        )
      )
      .min(8, t("Password must be at least 8 characters long")),
  });

  const formValues = {};

  const { handleSubmit } = useForm({
    validationSchema: schema,
    // initialValues: formValues,
  });

  const { value: termesConditions, errorMessage: termesConditionsError } =
    useField("termesConditions");
  const { value: email, errorMessage: emailError } = useField("email");
  const { value: username, errorMessage: usernameError } = useField("username");
  const { value: newPassword, errorMessage: newPasswordError } =
    useField("newPassword");
  const { value: confirmPassword, errorMessage: confirmPasswordError } =
    useField("confirmPassword");

  return {
    termesConditions,
    termesConditionsError,
    email,
    emailError,
    username,
    usernameError,
    newPassword,
    newPasswordError,
    confirmPassword,
    confirmPasswordError,
    handleSubmit,
  };
};
