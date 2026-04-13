<template>
  <Transition name="modal">
    <div v-if="postUuid" class="modal-overlay" @click="handleOutsideClick">
      <button class="modal-close" @click.stop="closeModal" aria-label="Fechar">✕</button>
      <div v-if="photoData" class="modal-content">
        <PhotoContent :data="photoData" :single="false" />
      </div>
      <div v-else-if="error" class="modal-error">
        <p>Erro ao carregar a publicação.</p>
        <button class="modal-error-btn" @click.stop="closeModal">Fechar</button>
      </div>
      <Loading v-else :modal="true" />
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue';
import { postService } from '@/service/postService';
import { commentService } from '@/service/commentService';
import type { PhotoData } from '@/models/Photo';
import PhotoContent from '@/components/photo/PhotoContent.vue';
import Loading from '@/components/helper/Loading.vue';

const postUuid = defineModel<string | null>({ default: null });
const photoData = ref<PhotoData | null>(null);
const error = ref(false);

const emit = defineEmits<{
  close: [];
}>();

watch(postUuid, async (uuid) => {
  if (uuid) {
    photoData.value = null;
    error.value = false;
    document.body.style.overflow = 'hidden';
    try {
      const [post, comments] = await Promise.all([
        postService.getPost(uuid),
        commentService.getComments(uuid),
      ]);
      photoData.value = { post, comments: comments.data, nextCursor: comments.next_cursor };
    } catch (err) {
      console.error('Erro ao carregar post:', err);
      error.value = true;
    }
  } else {
    photoData.value = null;
    error.value = false;
    document.body.style.overflow = '';
  }
}, { immediate: true });

function closeModal() {
  postUuid.value = null;
  emit('close');
}

function handleOutsideClick(event: MouseEvent) {
  if (event.target === event.currentTarget) closeModal();
}

function handleKeyDown(event: KeyboardEvent) {
  if (event.key === 'Escape') closeModal();
}

onMounted(() => window.addEventListener('keydown', handleKeyDown));
onUnmounted(() => window.removeEventListener('keydown', handleKeyDown));
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

.modal-close {
  position: fixed;
  top: 1rem;
  right: 1rem;
  background: rgba(255, 255, 255, 0.15);
  border: none;
  color: white;
  font-size: 1.5rem;
  line-height: 1;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
  z-index: 10;
}

.modal-close:hover {
  background: rgba(255, 255, 255, 0.3);
  box-shadow: none;
}

.modal-error {
  background: white;
  border-radius: 0.4rem;
  padding: 2rem 3rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.modal-error p {
  color: #555;
  font-size: 1rem;
}

.modal-error-btn {
  padding: 0.5rem 1.5rem;
  background: #fb1;
  border: none;
  border-radius: 0.2rem;
  cursor: pointer;
  font-weight: bold;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.25s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

@media (max-width: 40rem) {
  .modal-overlay {
    padding: 1rem;
  }
}
</style>
