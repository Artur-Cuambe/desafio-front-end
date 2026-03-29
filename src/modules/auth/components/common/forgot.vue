<template>
  <form @submit.prevent="onSubmit" class="space-y-4">
    <Textinput
      label="Email"
      type="email"
      placeholder="Type your email"
      name="emil"
      v-model="email"
      :error="emailError"
      classInput="h-[48px]"
    />

    <Button
      text="dark"
      :btnClass="`btn-primary ${
        isLoading ? 'inline-block w-full' : 'block-btn'
      } `"
      type="submit"
      :isLoading="isLoading"
      :isDisabled="isLoading"
    >
      Sign in
    </Button>
  </form>
</template>
<script lang="ts">
import Textinput from "@/components/Textinput/index.vue";
import Button from "@/components/Button/index.vue";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import { useRquestPasswordMutate } from "../../composables/useRquestPasswordMutate";
import { RequestPasswordResetDto } from "@/api";
import { useToast } from "vue-toastification";

export default {
  components: {
    Textinput,
    Button,
  },
  data() {
    return {
      checkbox: false,
    };
  },
  setup() {
    const toast = useToast();
    // Define a validation schema
    const schema = yup.object({
      email: yup.string().required("Digite o email").email(),
    });

    const { handleSubmit, resetForm } = useForm({
      validationSchema: schema,
    });
    // No need to define rules for fields

    const { value: email, errorMessage: emailError } = useField("email");

    const { mutate: request, isPending } = useRquestPasswordMutate();

    const onSubmit = handleSubmit(() => {
      const data: RequestPasswordResetDto = {
        email: `${email.value}`,
      };
      // console.warn(values);
      request(data, {
        onSuccess: (data) => {
          console.log(data);

          resetForm();
          toast.success("Email enviado com o link da recuperacao da senha!", {
            timeout: 2000,
          });
        },
        onError: (err) => {
          console.error("Login failed:", err);
          const error = `${err}`.split(":")[`${err}`.split(":").length - 1];
          toast.error(error, {
            timeout: 2000,
          });
          // swal.fire({
          //   title: "Email already exists",
          //   text: "Please try another email",
          //   icon: "error",
          //   confirmButtonText: "Ok",
          // });
        },
      });
    });

    return {
      email,
      emailError,
      isLoading: isPending,
      onSubmit,
    };
  },
};
</script>
<style lang="scss"></style>
