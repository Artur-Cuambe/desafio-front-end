import { useField, useForm } from "vee-validate";
import { useI18n } from "vue-i18n";
import * as yup from "yup";

export const UseForm = () => {
  const { t } = useI18n();
  const schema = yup.object({
    email: yup.string().required("email is required").email(),
    username: yup.string().required("username is required"),
    entityId: yup.string().required("name is required"),
    roleId: yup.string().required("Department is required"),
  });

  const formValues = {
    email: "",
    username: "",
    entityId: "",
    roleId: "",
  };

  const { handleSubmit, resetForm } = useForm({
    validationSchema: schema,
    initialValues: formValues,
  });

  const { value: email, errorMessage: emailError } = useField("email");
  const { value: username, errorMessage: usernameError } = useField("username");
  const { value: entityId, errorMessage: entityIdError } = useField("entityId");
  const { value: roleId, errorMessage: roleIdError } = useField("roleId");

  return {
    entityId,
    entityIdError,
    email,
    emailError,
    username,
    usernameError,
    roleId,
    roleIdError,
    handleSubmit,
    resetForm,
  };
};
