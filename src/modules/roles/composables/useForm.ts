import { useField, useForm } from "vee-validate";
import * as yup from "yup";

export const UseForm = () => {
  const schema = yup.object({
    name: yup.string().required("name is required"),
    departmentId: yup.string().required("Department is required"),
    description: yup.string().nullable(true),
  });

  const formValues = {
    name: "",
    departmentId: "",
    description: "",
  };

  const { handleSubmit, resetForm } = useForm({
    validationSchema: schema,
    initialValues: formValues,
  });

  const { value: name, errorMessage: nameError } = useField("name");
  const { value: departmentId, errorMessage: departmentIdError } = useField("departmentId");
  const { value: entityId, errorMessage: entityIdError } = useField("entityId");

  const { value: description, errorMessage: descriptionError } =
    useField("description");

  return {
    entityId,
    entityIdError,
    name,
    nameError,
    departmentId,
    departmentIdError,
    description,
    descriptionError,
    handleSubmit,
    resetForm,
  };
};
