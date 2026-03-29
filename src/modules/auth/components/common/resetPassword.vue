<template>
  <div>
    <form @submit.prevent="onSubmit" class="space-y-4">
      <InputGroup
        name="hi_password"
        type="password"
        :placeholder="$t('New password')"
        prependIcon="heroicons:lock-closed"
        merged
        v-model="newPassword"
        :error="newPasswordError"
        hasicon
      />
      <InputGroup
        name="hi_password_confirmation"
        type="password"
        :placeholder="$t('Confirm password')"
        prependIcon="heroicons:lock-closed"
        merged
        v-model="confirmPassword"
        :error="confirmPasswordError"
        hasicon
      />

      <Button
        text="dark"
        :btnClass="`btn btn-dark block w-full text-center ${
          isLoading ? 'inline-block w-full' : 'block-btn'
        }`"
        type="submit"
        :isLoading="isLoading"
      >
        {{ $t("Submit") }}
      </Button>
    </form>
    <div
      class="md:max-w-[345px] mx-auto font-normal text-slate-500 dark:text-slate-400 2xl:mt-12 mt-8 uppercase text-sm"
    >
      Forget It,
      <router-link
        to="/"
        class="text-slate-900 dark:text-white font-medium hover:underline"
      >
        Send me Back
      </router-link>
      to The Sign In
    </div>
  </div>
</template>
<script lang="ts">
import InputGroup from "@/components/InputGroup/index.vue";
import Button from "@/components/Button/index.vue";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import { useI18n } from "vue-i18n";
import { useToast } from "vue-toastification";
import { useRoute, useRouter } from "vue-router";
import { ACCESS_TOKEN } from "@/constant";
import { useValidResetPasswordForm } from "../../composables/useValidResetPasswordForm";
import { useResetPasswordMutate } from "../../composables/useResetPasswordMutate";
import { ChangePasswordDto, LoginDto, ResetPasswordDto } from "@/api";
import { ref } from "vue";
import { useLoginMutate } from "../../composables/useLoginMutate";

export default {
  components: {
    InputGroup,
    Button,
  },
  data() {
    return {
      checkbox: false,
    };
  },
  setup() {
    // Define a validation schema
    const { t } = useI18n();
    const toast = useToast();
    const router = useRouter();
    const route = useRoute();
    const { handleSubmit, resetForm, ...fields } = useValidResetPasswordForm();
    const { isPending, mutate: reset } = useResetPasswordMutate();
    const { mutate: login } = useLoginMutate();

    const formData = ref({
      ...fields,
    });

    const sendLogin = async (email, password) => {
      const loginData: LoginDto = {
        email: email,
        password: password,
      };
      login(loginData, {
        onSuccess: (data) => {
          if (data.requiresTwoFactor) {
            // Redirecionar para 2FA
            console.log("2FA required, redirecting...");
            router.push("/verify-code");
            // router.push('/verify-2fa');
          } else if (data.accessToken) {
            // Login completo
            localStorage.setItem("accessToken", data.accessToken);
            router.push("/app/read-app");
            toast.success("Senha alterada com sucesso", {
              timeout: 2000,
            });
            console.log("Login successful");
            // router.push('/dashboard');
          }
        },
        onError: (err) => {
          console.error("Login failed:", err);
          const error = `${err}`.split(":")[`${err}`.split(":").length - 1];
          toast.error(error, {
            timeout: 2000,
          });
        },
      });
    };
    const onSubmit = handleSubmit(async (values) => {
      const data: ResetPasswordDto = {
        token: `${route.params.token}`,
        password: `${formData.value.confirmPassword}`,
      };

      reset(data, {
        onSuccess: () => {
          resetForm();
          router.push("/");
          toast.success("Senha recuperada com sucesso!", {
            timeout: 2000,
          });
        },
        onError: (err) => {
          console.error("Login failed:", err);
          const error = `${err}`.split(":")[`${err}`.split(":").length - 1];
          toast.error(error, {
            timeout: 2000,
          });
        },
      });

      // } catch (error) {
      //   console.log("====================================");
      //   console.log(error);
      //   console.log("====================================");
      //   toast.error(`${error}`, {
      //     timeout: 2000,
      //   });
      // }
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
