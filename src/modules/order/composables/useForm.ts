import { useField, useForm } from "vee-validate";
import * as yup from "yup";

export const UseForm = () => {
  const schema = yup.object({
    customerId: yup.number().required("Custumer is required"),
    status: yup.string().required("Status is required"),
    deliveryAddress: yup.string().required("Address is required"),
    deliveryNotes: yup.string().required("Description is required"),
    entityId: yup.number().required("Entity is required"),
  });

  const formValues = {
    customerId: "",
    status: "PENDING",
    deliveryAddress: "",
    deliveryNotes: "",
    entityId: 1,
  };

  const { handleSubmit, resetForm } = useForm({
    validationSchema: schema,
    initialValues: formValues,
  });

  const { value: customerId, errorMessage: customerIdError } =
    useField("customerId");
  const { value: status, errorMessage: statusError } = useField("status");
  const { value: deliveryAddress, errorMessage: deliveryAddressError } =
    useField("deliveryAddress");
  const { value: deliveryNotes, errorMessage: deliveryNotesError } =
    useField("deliveryNotes");
  const { value: entityId, errorMessage: entityIdError } = useField("entityId");

  return {
    customerId,
    customerIdError,
    status,
    statusError,
    deliveryAddress,
    deliveryAddressError,
    deliveryNotes,
    deliveryNotesError,
    entityId,
    entityIdError,
    handleSubmit,
    resetForm,
  };
};
