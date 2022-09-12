<template>
  <section class="login">
    <div class="form p-3">
      <router-view></router-view>
    </div>
  </section>
</template>
<script lang="ts">
export default {};
</script>
<style scoped>
.login {
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 100vh;
  gap: 2rem;
}
.login::before {
  content: "";
  display: block;
  background: url("../../assets/login.jpg") no-repeat center center;
  background-size: cover;
}
.form {
  max-width: 30rem;
  margin-top: 10rem;
}
</style>
