<template>
  <router-view />
</template>

<script>
import { useThemeSettingsStore } from "@/store/themeSettings";
import { configureApi } from "./plugins/apiConfig";

export default {
  mounted() {
    this.$store.themeSettingsStore = useThemeSettingsStore();
    configureApi();
  },
};
</script>

<style></style>
