import { useField, useForm } from "vee-validate";
import * as yup from "yup";

export const UseForm = () => {
  const schema = yup.object({
    firstName: yup.string().required("name is required"),
    lastName: yup.string().nullable(true),
    gender: yup.string().nullable(true),
    phoneNumber: yup.string().required("phoneNumber is required"),
    entityId: yup.string().required("Entity is required"),
  });

  const formValues = {
    firstName: "",
    lastName: "",
    gender: "MALE",
    phoneNumber: "",
    entityId: "1",
  };

  const { handleSubmit, resetForm } = useForm({
    validationSchema: schema,
    initialValues: formValues,
  });

  const { value: firstName, errorMessage: firstNameError } =
    useField("firstName");
  const { value: lastName, errorMessage: lastNameError } = useField("lastName");
  const { value: gender, errorMessage: genderError } = useField("gender");
  const { value: phoneNumber, errorMessage: phoneNumberError } =
    useField("phoneNumber");
  const { value: entityId, errorMessage: entityIdError } = useField("entityId");

  return {
    entityId,
    entityIdError,
    firstName,
    firstNameError,
    lastName,
    lastNameError,
    gender,
    genderError,
    phoneNumber,
    phoneNumberError,
    handleSubmit,
    resetForm,
  };
};
