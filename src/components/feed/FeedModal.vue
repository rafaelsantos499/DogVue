<template>
  <div v-if="postUuid" class="modal-overlay" @click="handleOutsideClick">
    <div v-if="photoData" class="modal-content animeLeft">
      <PhotoContent :data="photoData" :single="false" />
    </div>
    <Loading v-else :modal="true" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { postService } from '@/service/postService';
import { commentService } from '@/service/commentService';
import type { PhotoData } from '@/models/Photo';
import PhotoContent from '@/components/photo/PhotoContent.vue';
import Loading from '@/components/helper/Loading.vue';

const postUuid = defineModel<string | null>({ default: null });
const photoData = ref<PhotoData | null>(null);

const emit = defineEmits<{
  close: [];
}>();

watch(postUuid, async (uuid) => {
  if (uuid) {
    document.body.style.overflow = 'hidden';
    try {
      const [post, comments] = await Promise.all([
        postService.getPost(uuid),
        commentService.getComments(uuid),
      ]);
      photoData.value = { post, comments: comments.data };
    } catch (error) {
      console.error('Erro ao carregar post:', error);
    }
  } else {
    photoData.value = null;
    document.body.style.overflow = '';
  }
}, { immediate: true });

function handleOutsideClick(event: MouseEvent) {
  if (event.target === event.currentTarget) {
    postUuid.value = null;
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
