<template>
  <main class="container" style="margin-top: 2rem;">
    <PhotoContent v-if="photoData" :data="photoData" :single="true" />
    <Loading v-else />
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { postService } from '@/service/postService';
import { commentService } from '@/service/commentService';
import type { PhotoData } from '@/models/Photo';
import PhotoContent from '@/components/photo/PhotoContent.vue';
import Loading from '@/components/helper/Loading.vue';

const route = useRoute();
const photoData = ref<PhotoData | null>(null);

onMounted(async () => {
  const id = String(route.params.id);
  try {
    const [post, comments] = await Promise.all([
      postService.getPost(id),
      commentService.getComments(id),
    ]);
    photoData.value = { post, comments: comments.data };
  } catch (error) {
    console.error('Erro ao carregar post:', error);
  }
});
</script>
