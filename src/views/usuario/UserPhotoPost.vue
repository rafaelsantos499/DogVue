<template>
  <section class="animeLeft" style="background: none; display: flex; gap: 2rem; align-items: flex-start;">    
    <form class="w-50">
      <label for="username">Nome</label>
      <input type="text" id="name" name="name" v-model="formCreate.name" />
      <label for="weight">Peso</label>
      <input type="number" id="weight" name="weight" v-model="formCreate.weight" />
      <label for="year">Idade</label>
      <input type="number" id="year" name="year" v-model="formCreate.year" />
      <input type="file" id="photo" name="photo" accept="image/*" @change="handleFileChange" style="display: none;" />
      <div style="display: flex; align-items: center; gap: 0.75rem; margin-top: 0.5rem;">
        <label for="photo" class="h6 border-0 text-dark rounded-1 bg-warning text-primary py-2 px-4" style="min-width: 8rem; display: inline-block; cursor: pointer; text-align: center; margin: 0;">
          Escolher Arquivo
        </label>
        <span v-if="formCreate.photo" style="font-size: 0.875rem; color: #666;">{{ formCreate.photo.name }}</span>
      </div>
      <!-- <p class="text-danger">{{ erros }}</p> -->
      <!-- <p v-if="createrUserSuccess" class="text-success">
        Sua conta foi Criada com sucesso
      </p> -->
      <button class="h6 mt-4 border-0 text-dark rounded-1 bg-warning text-primary py-2 px-4" style="min-width: 8rem">
        Enviar
      </button>
      <!-- <button v-else class="h6 mt-4 border-0 text-dark rounded-1 bg-warning text-primary py-2 px-4"
        style="min-width: 8rem" @click.prevent="handleSubmit" disabled>
        Cadastrando...
      </button> -->
    </form>
    <div v-if="preview" class="w-50" style="display: flex; justify-content: center; align-items: flex-start;">
      <img :src="preview" alt="Preview" style="max-width: 100%; border-radius: 4px;" />
    </div>
  </section>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue';

const formCreate = reactive({
  name: "",
  year: "",
  weight: "",
  photo: null as File | null,
});

const preview = ref<string | null>(null);

function handleFileChange(event: Event) {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (file) {
    formCreate.photo = file;
    preview.value = URL.createObjectURL(file);
  }
}
</script>
