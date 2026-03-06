<template>
  <ul class="feed animeLeft">
    <li class="photo" v-for="(photo, i) in photos" :key="photo.id + '-' + i">
      <router-link :to="`/foto/${photo.id}`">
        <img :src="photo.src" :alt="photo.title" />
        <span class="visualizacao">{{ photo.acessos }}</span>
      </router-link>
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { Photo } from '@/models/Photo';

defineProps<{
  photos: Photo[];
}>();
</script>
