<template>
  <div class="photo-content" :class="{ single }">
    <div class="photo-img">
      <img :src="data.post.feed_url ?? data.post.original_url" :alt="data.post.title" />
    </div>
    <div class="photo-details">
      <div>
        <h1 class="photo-title">
          {{ data.post.title }}
        </h1>
        <ul class="photo-attributes">
          <li v-if="data.post.weight">{{ data.post.weight }} kg</li>
          <li v-if="data.post.age">{{ data.post.age }} anos</li>
        </ul>
        <p v-if="data.post.description" class="photo-description">{{ data.post.description }}</p>
      </div>
      <PhotoComments
        :post-uuid="data.post.uuid"
        :comments="data.comments"
        @new-comment="handleNewComment"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PhotoData } from '@/models/Photo';
import type { Comment } from '@/models/Comment';
import PhotoComments from './PhotoComments.vue';

const props = defineProps<{
  data: PhotoData;
  single?: boolean;
}>();

function handleNewComment(comment: Comment) {
  props.data.comments.push(comment);
}
</script>

<style scoped>
.photo-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-radius: 0.4rem;
  overflow: hidden;
  background: white;
  max-height: 80vh;
}

.photo-content.single {
  grid-template-columns: 1fr;
  max-width: 50rem;
  margin: 0 auto;
}

.photo-img {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #111;
  overflow: hidden;
  min-height: 24rem;
}

.photo-img img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
}

.photo-details {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1.5rem;
  overflow-y: auto;
}

.photo-author a {
  color: #333;
  font-weight: bold;
  text-decoration: none;
}

.photo-author a:hover {
  text-decoration: underline;
}

.photo-visualizacoes {
  margin-left: 0.5rem;
  color: #888;
  font-size: 0.875rem;
}

.photo-visualizacoes::before {
  content: '';
  display: inline-block;
  width: 16px;
  height: 10px;
  margin-right: 0.25rem;
  background: url('/assets/visualizacao-black.svg') no-repeat;
}

.photo-title {
  font-family: var(--type-second);
  font-size: 2rem;
  margin: 0.5rem 0 1rem;
  line-height: 1.2;
}

.photo-description {
  font-size: 0.9rem;
  color: #666;
  line-height: 1.5;
  margin-top: 0.5rem;
}

.photo-title a {
  color: #333;
  text-decoration: none;
}

.photo-attributes {
  display: flex;
  gap: 2rem;
  list-style: none;
  padding: 0;
  margin: 0 0 1.5rem;
  font-size: 1rem;
  color: #333;
}

.photo-attributes li::before {
  content: '';
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #fb1;
  margin-right: 0.5rem;
  vertical-align: middle;
}

@media (max-width: 40rem) {
  .photo-content {
    grid-template-columns: 1fr;
    max-height: none;
  }
}
</style>
