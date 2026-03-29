<template>
  <form @submit.prevent="onSubmit" class="space-y-4">
    <Textinput
      label="Full name"
      type="text"
      placeholder="Full Name"
      v-model="username"
      :error="usernameError"
      classInput="h-[48px]"
    />
    <Textinput
      label="Email"
      type="email"
      placeholder="Type your email"
      v-model="email"
      :error="emailError"
      classInput="h-[48px]"
    />
    <Textinput
      label="Password"
      type="password"
      placeholder="8+ characters, 1 capitat letter "
      v-model="newPassword"
      :error="newPasswordError"
      hasicon
      classInput="h-[48px]"
    />
    <Textinput
      label="Confirm password"
      type="password"
      placeholder="8+ characters, 1 capitat letter "
      v-model="confirmPassword"
      :error="confirmPasswordError"
      hasicon
      classInput="h-[48px]"
    />

    <!-- {{ termesConditions }} -->
    <label class="cursor-pointer flex items-start">
      <Checkbox
        v-model="termesConditions"
        :error="termesConditionsError"
        :disabled="isLoading"
      />

      <span class="text-slate-500 dark:text-slate-400 text-sm leading-6 -mt-1"
        >You accept our Terms and Conditions and Privacy Policy</span
      >
    </label>

    <Button
      text="dark"
      :btnClass="`btn btn-dark block w-full text-center ${
        isLoading ? 'inline-block w-full' : 'block-btn'
      } `"
      type="submit"
      :isLoading="isLoading"
      :isDisabled="isLoading || !termesConditions"
    >
      Create an account
    </Button>
  </form>
</template>
<script lang="ts">
import Textinput from "@/components/Textinput/index.vue";
import Button from "@/components/Button/index.vue";
import Checkbox from "@/components/Checkbox/index.vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { useValidRegistForm } from "../../composables/useValidRegistForm";
import { ref } from "vue";
import { RegisterDto } from "@/api";
import { useRegistMutate } from "../../composables/useRegistMutate";

export default {
  components: {
    Textinput,
    Button,
    Checkbox,
  },
  data() {
    return {
      checkbox: false,
    };
  },
  setup() {
    const { handleSubmit, ...fields } = useValidRegistForm();
    const { mutate: register, isPending } = useRegistMutate();

    const formData = ref({
      ...fields,
    });

    const toast = useToast();
    const router = useRouter();

    // No need to define rules for fields

    const onSubmit = handleSubmit((values) => {
      if (!formData.value.termesConditions) return;
      const data: RegisterDto = {
        email: `${formData.value.email}`,
        username: `${formData.value.username}`,
        password: `${formData.value.confirmPassword}`,
      };
      register(data, {
        onSuccess: (data) => {
          if (data) {
            toast.success("Utilizador registado com sucesso!", {
              timeout: 2000,
            });
            router.push("/");
          }
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
      ...fields,
      onSubmit,
      isLoading: isPending,
    };
  },
};
</script>
<style lang="scss"></style>
