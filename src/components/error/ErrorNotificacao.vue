<template lang="">
  <div>
    <ul class="erro" v-if="erros.length > 0">
      <li v-for="(erro, index) in erros" v-html="erro" :key="index"></li>
    </ul>
  </div>
</template>
<script lang="ts">
export default {
  name: "ErroNotificacao",
  props: {
    erros: Array,
  },
};
</script>
<style scoped>
.erro {
  margin: 20px auto;
  color: #e80;
  text-align: center;
}
</style>
