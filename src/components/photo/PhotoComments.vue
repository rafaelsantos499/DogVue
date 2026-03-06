<template>
  <div class="comments">
    <ul class="comments-list">
      <li v-for="comment in comments" :key="comment.comment_ID">
        <strong>{{ comment.comment_author }}: </strong>
        <span>{{ comment.comment_content }}</span>
      </li>
    </ul>
    <form v-if="loggedIn" class="comments-form" @submit.prevent="handleSubmit">
      <input
        type="text"
        v-model="newComment"
        placeholder="Comente..."
        class="form-control"
      />
      <button type="submit" class="btn btn-warning fw-bold" style="color: #764701;">
        Enviar
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { apiService } from '@/service/apiService';
import { useUserStore } from '@/store';
import type { Comment } from '@/models/Photo';

const props = defineProps<{
  id: number;
  comments: Comment[];
}>();

const emit = defineEmits<{
  (e: 'newComment', comment: Comment): void;
}>();

const store = useUserStore();
const loggedIn = computed(() => store.login);
const newComment = ref('');

async function handleSubmit() {
  if (!newComment.value.trim()) return;
  try {
    const { data } = await apiService.post(`api/comment/${props.id}`, {
      comment: newComment.value,
    });
    emit('newComment', data);
    newComment.value = '';
  } catch (error) {
    console.error('Erro ao comentar:', error);
  }
}
</script>

<style scoped>
.comments {
  overflow-y: auto;
  padding: 1rem;
}

.comments-list {
  list-style: none;
  padding: 0;
  margin: 0 0 1rem 0;
}

.comments-list li {
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  line-height: 1.4;
}

.comments-form {
  display: flex;
  gap: 0.5rem;
}

.comments-form input {
  flex: 1;
}
</style>
