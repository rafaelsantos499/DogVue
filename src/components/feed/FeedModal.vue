<template>
  <div v-if="photoId" class="modal-overlay" @click="handleOutsideClick">
    <div class="modal-content animeLeft">
      <PhotoContent v-if="photoData" :data="photoData" :single="false" />
      <p v-else class="text-center text-muted p-4">Carregando...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { apiService } from '@/service/apiService';
import type { PhotoData } from '@/models/Photo';
import PhotoContent from '@/components/photo/PhotoContent.vue';

const photoId = defineModel<number | null>({ default: null });
const photoData = ref<PhotoData | null>(null);

const emit = defineEmits<{
  close: [];
}>();

watch(photoId, async (id) => {
  if (id) {
    document.body.style.overflow = 'hidden';
    try {
      const { data } = await apiService.get(`api/photo/${id}`);
      photoData.value = data;
    } catch (error) {
      console.error('Erro ao carregar foto:', error);
    }
  } else {
    photoData.value = null;
    document.body.style.overflow = '';
  }
}, { immediate: true });

function handleOutsideClick(event: MouseEvent) {
  if (event.target === event.currentTarget) {
    photoId.value = null;
    emit('close');
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
}

.modal-content {
  max-width: 60rem;
  width: 100%;
  max-height: 90vh;
  border-radius: 0.4rem;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

@media (max-width: 40rem) {
  .modal-overlay {
    padding: 1rem;
  }
}
</style>
