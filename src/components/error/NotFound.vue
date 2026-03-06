<template>
  <div class="container d-flex justify-content-center align-items-center animeLeft" style="min-height: 70vh;">
    <div class="text-center" style="max-width: 500px;">
      <h1 class="display-1 fw-bold" style="color: #764701;">
        4<span class="paw">🐾</span>4
      </h1>
      <h2 class="h4 text-dark mb-3">Página não encontrada</h2>
      <p class="text-muted mb-4 lh-lg">
        O caminho que você seguiu não leva a lugar nenhum... talvez um cachorro tenha roubado a página!
      </p>
      <div class="mb-4 opacity-50">
        <svg width="60" height="46" viewBox="0 0 28 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M14 10h1.652c1.708 0 2.63 2.004 1.518 3.302l-1.618 1.887A4.501 4.501 0 0024.5 14.5a1.5 1.5 0 013 0A7.5 7.5 0 0114 19 7.5 7.5 0 01.5 14.5a1.5 1.5 0 013 0 4.5 4.5 0 008.948.689l-1.618-1.887C9.718 12.004 10.64 10 12.35 10H14z" fill="#764701"/>
          <circle cx="21" cy="3" r="3" fill="#764701"/>
          <circle cx="7" cy="3" r="3" fill="#764701"/>
        </svg>
      </div>
      <router-link to="/" class="btn btn-warning fw-bold px-4 py-2" style="color: #764701;">
        Voltar para o início
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.paw {
  font-size: 4.5rem;
  display: inline-block;
  animation: bounce 1s infinite alternate;
}

@keyframes bounce {
  from { transform: translateY(0); }
  to { transform: translateY(-10px); }
}
</style>
