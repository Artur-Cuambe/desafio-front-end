import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import { useI18n } from "vue-i18n";

export const useValidResetPasswordForm = () => {
  const { t } = useI18n();
  const schema = yup.object({
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

  const formValues = {
    newPassword: "",
    confirmPassword: "",
  };

  const { handleSubmit, resetForm } = useForm({
    validationSchema: schema,
    initialValues: formValues,
  });

  const { value: newPassword, errorMessage: newPasswordError } =
    useField("newPassword");
  const { value: confirmPassword, errorMessage: confirmPasswordError } =
    useField("confirmPassword");

  return {
    newPassword,
    newPasswordError,
    confirmPassword,
    confirmPasswordError,
    handleSubmit,
    resetForm,
  };
};
