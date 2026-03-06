<template>
  <main class="container" style="margin-top: 2rem;">
    <PhotoContent v-if="photoData" :data="photoData" :single="true" />
    <div v-else class="loadingWrapper">
      <p>Carregando...</p>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { apiService } from '@/service/apiService';
import type { PhotoData } from '@/models/Photo';
import PhotoContent from '@/components/photo/PhotoContent.vue';

const route = useRoute();
const photoData = ref<PhotoData | null>(null);

onMounted(async () => {
  try {
    const { data } = await apiService.get(`api/photo/${route.params.id}`);
    photoData.value = data;
  } catch (error) {
    console.error('Erro ao carregar foto:', error);
  }
});
</script>
