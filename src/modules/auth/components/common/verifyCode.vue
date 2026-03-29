<template>
  <div>
    <div class="text-center 2xl:mb-0">
      <h4 class="font-medium">Verificação do código</h4>
      <!-- <div class="text-slate-500 dark:text-slate-400 text-base">
        {{ $t("We sent the account recovery code to the email") }}:
        <strong>{{ "teste@gmail.com" }}</strong>
      </div> -->
    </div>
    <form @submit.prevent="onSubmit" class="space-y-4">
      <!-- <div class="text-center 2xl:mb-10 mb-2">
        <div class="text-slate-500 dark:text-slate-400 text-base">
          <b> NB:</b> {{ $t("Check your primary inbox or Spam") }}
        </div>
      </div> -->
      <div
        class="text-center md:max-w-[345px] mx-auto font-normal text-slate-500 dark:text-slate-400 2xl:mt-6 mt-4 text-sm"
      >
        <span
          @click="resendEmailCode()"
          v-if="!isGenerating"
          class="text-base cursor-pointer text-w_primary-900 dark:text-white hover:underline"
        >
          {{ $t("Click here") }}
        </span>
        <span v-else>
          {{ $t("Loading") }}
        </span>
        para pedir código de verificação
      </div>
      <!-- {{ isSent }} -->
      <div
        v-if="isSent"
        class="text-center md:max-w-[400px] mx-auto font-normal text-slate-500 dark:text-slate-400 2xl:mt-12 mt-8 text-sm"
      >
        <span
          class="font-medium cursor-pointer text-success-500 dark:text-white"
        >
          {{ $t("We sent the account recovery code to the email") }}
          {{ $t("Check your primary inbox or Spam") }}
        </span>
      </div>
      <InputGroup
        v-model="token"
        :error="tokenError"
        type="text"
        :placeholder="$t('Enter the code in this area')"
        prependIcon="heroicons-outline:key"
        merged
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

    <div
      class="md:max-w-[345px] mx-auto font-normal text-slate-500 dark:text-slate-400 2xl:mt-12 mt-8 uppercase text-sm"
    >
      {{ $t("Forget") }},
      <router-link
        to="/"
        class="font-medium text-slate-900 dark:text-white hover:underline"
      >
        {{ $t("Send me back") }}
      </router-link>
      {{ $t("to Login") }}
    </div>
  </div>
</template>
<script lang="ts">
import InputGroup from "@/components/InputGroup/index.vue";
import Button from "@/components/Button/index.vue";
import * as yup from "yup";
import { useToast } from "vue-toastification";
import { useI18n } from "vue-i18n";
import { useGenerateCodeMutate } from "../../composables/useGenerateCodeMutate";
import { ref } from "vue";
import { useVerifyCodeMutate } from "../../composables/useVerifyCodeMutate";
import { useField, useForm } from "vee-validate";
import { OpenAPI, Verify2faDto } from "@/api";
import { useRouter } from "vue-router";
import { ACCESS_TOKEN } from "@/constant";

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
    const toast = useToast();
    const isSent = ref(false);
    const { locale, t } = useI18n();
    const router = useRouter();

    const { mutateAsync, isPending: isGenerating } = useGenerateCodeMutate();
    const { mutate: verify2fa, isPending } = useVerifyCodeMutate();

    const schema = yup.object({
      token: yup.string().required("Digite o codigo"),
    });

    const { handleSubmit, resetForm } = useForm({
      validationSchema: schema,
    });
    // No need to define rules for fields

    const { value: token, errorMessage: tokenError } = useField("token");

    const onSubmit = handleSubmit((values) => {
      const data: Verify2faDto = {
        token: `${token.value}`,
      };
      verify2fa(data, {
        onSuccess: (data) => {
          if (data.accessToken) {
            // Login completo
            OpenAPI.TOKEN = data.accessToken;
            OpenAPI.USERNAME = data.user.username;
            localStorage.setItem(ACCESS_TOKEN, data.accessToken);
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
      // try {
      //   // const data = await verifyCodeMutateAsync({
      //   //   code: values.code,
      //   //   account: phone ? "258" + phone : email,
      //   // });
      //   // localStorage.removeItem("user-recover");
      //   // router.push({
      //   //   name: "reset-password",
      //   //   params: { id: data },
      //   // });
      // } catch (error) {
      //   console.log("====================================");
      //   console.log(error);
      //   console.log("====================================");
      //   toast.error(t("Invalid code"), {
      //     timeout: 2000,
      //   });
      // }
    });

    // const { isPending, mutateAsync } = useForgotPasswordMutate();

    const resendEmailCode = async () => {
      try {
        await mutateAsync();
        isSent.value = true;
        console.log(isSent);
        toast.success("Email enviado com o codigo de verificacao!", {
          timeout: 2000,
        });
      } catch (error) {
        const message = `${error}`.split(":")[`${error}`.split(":").length - 1];
        router.push("/");
        toast.error(message, {
          timeout: 2000,
        });
      }
      // generateCode({
      //   onSuccess: (data) => {
      //     isSent.value = true;
      //     console.log(isSent);
      //     toast.success("Email enviado com o codigo de verificacao!", {
      //       timeout: 2000,
      //     });
      //   },
      //   onError: (err) => {
      //     isSent.value = false;
      //     const error = `${err}`.split(":")[`${err}`.split(":").length - 1];
      //     toast.error(error, {
      //       timeout: 2000,
      //     });
      //     // swal.fire({
      //     //   title: "Email already exists",
      //     //   text: "Please try another email",
      //     //   icon: "error",
      //     //   confirmButtonText: "Ok",
      //     // });
      //   },
      // });
    };
    return {
      token,
      tokenError,
      onSubmit,
      resendEmailCode,
      isGenerating,
      isSent,
      isLoading: isPending,
    };
  },
};
</script>
<style lang="scss"></style>
