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
    <Textinput
      label="Password"
      type="password"
      placeholder="8+ characters, 1 capitat letter "
      name="password"
      v-model="password"
      :error="passwordError"
      hasicon
      classInput="h-[48px]"
    />

    <div class="flex justify-between">
      <!-- <label class="cursor-pointer flex items-start">
        <input
          type="checkbox"
          class="hidden"
          @change="() => (checkbox = !checkbox)"
        />
        <span
          class="h-4 w-4 border rounded flex-none inline-flex mr-3 relative top-1 transition-all duration-150"
          :class="
            checkbox
              ? 'ring-2 ring-black-500 dark:ring-offset-slate-600 dark:ring-slate-900  dark:bg-slate-900 ring-offset-2 bg-slate-900'
              : 'bg-slate-100 dark:bg-slate-600 border-slate-100 dark:border-slate-600 '
          "
        >
          <img
            src="@/assets/images/icon/ck-white.svg"
            alt=""
            class="h-[10px] w-[10px] block m-auto"
            v-if="checkbox"
          />
        </span>
        <span class="text-slate-500 dark:text-slate-400 text-sm leading-6"
          >Keep me signed in</span
        >
      </label> -->
      <router-link
        to="/forgot-password"
        class="text-sm text-slate-800 dark:text-slate-400 leading-6 font-medium"
        >Forgot Password?</router-link
      >
    </div>

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
  <div
    class="md:max-w-[345px] mx-auto font-normal text-slate-500 dark:text-slate-400 mt-12 uppercase text-sm"
  >
    Don’t have an account? Sign up
    <router-link
      to="/register"
      class="text-slate-900 dark:text-white font-medium hover:underline"
    >
      Sign up
    </router-link>
  </div>
</template>
<script lang="ts">
import Textinput from "@/components/Textinput/index.vue";
import Button from "@/components/Button/index.vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { useValidLoginForm } from "../../composables/useValidLoginForm";
import { useLoginMutate } from "../../composables/useLoginMutate";
import { ACCESS_TOKEN } from "@/constant";
import { LoginDto, OpenAPI } from "@/api";
import { ref } from "vue";
import { configureApi } from "./../../../../plugins/apiConfig";

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
    const { ...fields } = useValidLoginForm();
    // const { isLoading, mutateAsync } = useLoginMutate();
    const { mutate: login, isPending, isError, error } = useLoginMutate();

    const toast = useToast();
    const router = useRouter();

    const formData = ref({
      ...fields,
    });

    const handleSubmit = () => {
      const loginData: LoginDto = {
        email: `${formData.value.email}`,
        password: `${formData.value.password}`,
      };
      login(loginData, {
        onSuccess: (data) => {
          if (data.requiresTwoFactor) {
            // Redirecionar para 2FA
            console.log("2FA required, redirecting...");
            OpenAPI.TOKEN = data.tempToken;
            OpenAPI.USERNAME = data.user.username;
            localStorage.setItem(ACCESS_TOKEN, data.tempToken);
            configureApi();
            router.push("/verify-code");
            // router.push('/verify-2fa');
          } else if (data.accessToken) {
            // Login completo
            OpenAPI.TOKEN = data.tempToken;
            OpenAPI.USERNAME = data.user.username;
            localStorage.setItem(ACCESS_TOKEN, data.accessToken);
            configureApi();
            router.push("/app/read-app");
            toast.success("Login successfully", {
              timeout: 2000,
            });
          }
        },
        onError: (err) => {
          console.error("Login failed:", err);
          const error = `${err}`.split(":")[`${err}`.split(":").length - 1];
          toast.error(
            error.replace('"', "").replace('"', "").replace("}", ""),
            {
              timeout: 2000,
            }
          );
        },
      });
    };

    return {
      ...fields,
      onSubmit: handleSubmit,
      isLoading: isPending,
    };
  },
};
</script>
<style lang="scss"></style>
