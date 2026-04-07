<template>
  <section class="animeLeft" style="background: none; display: flex; gap: 2rem; align-items: flex-start;">
    <form class="w-1/2" @submit.prevent="handleSubmit">
      <label for="name">Nome do pet</label>
      <input type="text" id="name" name="name" v-model="formCreate.name" required />
      <label for="weight">Peso (kg)</label>
      <input type="number" id="weight" name="weight" v-model="formCreate.weight" step="0.1" min="0" />
      <label for="year">Idade (anos)</label>
      <input type="number" id="year" name="year" v-model="formCreate.year" min="0" />
      <input type="file" id="photo" name="photo" accept="image/*" @change="handleFileChange" style="display: none;" required />
      <div style="display: flex; align-items: center; gap: 0.75rem; margin-top: 0.5rem;">
        <label for="photo" class="text-base border-none text-gray-900 rounded bg-amber-400 py-2 px-6" style="min-width: 8rem; display: inline-block; cursor: pointer; text-align: center; margin: 0;">
          Escolher Arquivo
        </label>
        <span v-if="formCreate.photo" style="font-size: 0.875rem; color: #666;">{{ formCreate.photo.name }}</span>
      </div>
      <p v-if="erro" class="text-red-600 mt-2">{{ erro }}</p>
      <p v-if="sucesso" class="text-green-600 mt-2">Post enviado com sucesso!</p>
      <button
        type="submit"
        class="text-base mt-6 border-none text-gray-900 rounded bg-amber-400 py-2 px-6"
        style="min-width: 8rem"
        :disabled="loading"
      >
        {{ loading ? 'Enviando...' : 'Enviar' }}
      </button>
    </form>
    <div v-if="preview" class="w-1/2" style="display: flex; justify-content: center; align-items: flex-start;">
      <img :src="preview" alt="Preview" style="max-width: 100%; border-radius: 4px;" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { postService } from '@/service/postService';

const formCreate = reactive({
  name: '',
  year: '',
  weight: '',
  photo: null as File | null,
});

const preview = ref<string | null>(null);
const loading = ref(false);
const erro = ref('');
const sucesso = ref(false);

function handleFileChange(event: Event) {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (file) {
    formCreate.photo = file;
    preview.value = URL.createObjectURL(file);
  }
}

async function handleSubmit() {
  if (!formCreate.photo || !formCreate.name.trim()) return;
  loading.value = true;
  erro.value = '';
  sucesso.value = false;
  try {
    await postService.uploadPost({
      photo: formCreate.photo,
      title: formCreate.name,
      weight: formCreate.weight ? Number(formCreate.weight) : undefined,
      age: formCreate.year ? Number(formCreate.year) : undefined,
    });
    sucesso.value = true;
    formCreate.name = '';
    formCreate.weight = '';
    formCreate.year = '';
    formCreate.photo = null;
    preview.value = null;
  } catch (err: any) {
    erro.value = err.response?.data?.message ?? 'Erro ao enviar o post.';
  } finally {
    loading.value = false;
  }
}
</script>
