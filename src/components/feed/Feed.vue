<template>
  <ul class="feed animeLeft">
    <li class="photo" v-for="photo in photos" :key="photo.uuid">
      <a href="#" @click.prevent="emit('selectPhoto', photo.uuid)">
        <img :src="photo.feed_url ?? ''" alt="Publicação" loading="lazy" />
        <div class="visualizacao"></div>
      </a>
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { FeedItem } from '@/models/Feed';

defineProps<{
  photos: FeedItem[];
}>();

const emit = defineEmits<{
  selectPhoto: [uuid: string];
}>();
</script>
