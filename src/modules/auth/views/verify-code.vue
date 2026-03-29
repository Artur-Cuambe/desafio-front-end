<template>
  <Layout>
    <VerifyCode />
  </Layout>
</template>
<script>
import Layout from "../components/layout";
import VerifyCode from "../components/common/verifyCode";

export default {
  components: {
    VerifyCode,
    Layout,
  },
 
};
</script>
<style lang="scss"></style>
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
