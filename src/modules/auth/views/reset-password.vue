<template>
  <Layout>
    <ResetPassword />
  </Layout>
</template>
<script>
import ResetPassword from "../components/common/resetPassword.vue";
import Layout from "../components/layout";

export default {
  components: {
    ResetPassword,
    Layout,
  },
};
</script>
<style lang="scss" scoped>
.left-column {
  background-color: #0c1139;
}

.hero {
  background-repeat: no-repeat;
  background-position: bottom left;
  background-size: 25%;
}
</style>
