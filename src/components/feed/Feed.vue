<template>
  <ul class="feed animeLeft">
    <li class="photo" v-for="(photo, i) in photos" :key="photo.id + '-' + i">
      <a href="#" @click.prevent="$emit('selectPhoto', photo.id)">
        <img :src="photo.src" :alt="photo.title" />
        <span class="visualizacao">{{ photo.acessos }}</span>
      </a>
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { Photo } from '@/models/Photo';

defineProps<{
  photos: Photo[];
}>();

const emit = defineEmits<{
  selectPhoto: [id: number];
}>();
</script>
