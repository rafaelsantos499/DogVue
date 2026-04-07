<template>
  <main class="container">
    <Feed :photos="photos" @selectPhoto="openModal" />
    <Loading v-if="loading" />
    <div v-if="!hasMore && photos.length" class="loadingWrapper">
      <p>Não existem mais fotos.</p>
    </div>
    <FeedModal v-model="selectedPhotoUuid" @close="closeModal" />
  </main>
</template>
<script setup lang="ts">
import { feedService } from '@/service/feedService';
import { onMounted, onUnmounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type { FeedItem } from '@/models/Feed';
import Feed from '@/components/feed/Feed.vue';
import FeedModal from '@/components/feed/FeedModal.vue';
import Loading from '@/components/helper/Loading.vue';

const route = useRoute();
const router = useRouter();

const photos = ref<FeedItem[]>([]);
const loading = ref(false);
const hasMore = ref(true);
const selectedPhotoUuid = ref<string | null>(null);
const cursor = ref<string | null>(null);

if (route.params.id) {
  selectedPhotoUuid.value = String(route.params.id);
}

function openModal(uuid: string) {
  selectedPhotoUuid.value = uuid;
  router.push(`/feed/photo/${uuid}`);
}

function closeModal() {
  selectedPhotoUuid.value = null;
  router.push('/');
}

onMounted(() => {
  loadFeed();
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

function handleScroll() {
  const { scrollTop, scrollHeight } = document.documentElement;
  const windowHeight = window.innerHeight;
  if (scrollTop + windowHeight >= scrollHeight - 10 && !loading.value && hasMore.value) {
    loadFeed();
  }
}

async function loadFeed() {
  loading.value = true;
  try {
    const response = await feedService.getFeed({ per_page: 15, cursor: cursor.value });
    if (response.data.length === 0) {
      hasMore.value = false;
    } else {
      photos.value = [...photos.value, ...response.data];
      cursor.value = response.meta.next_cursor;
      if (!response.meta.next_cursor) hasMore.value = false;
    }
  } catch (error) {
    console.error('Erro ao carregar feed:', error);
  } finally {
    loading.value = false;
  }
}
</script>
<style>
.feed {
  margin-top: 2rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 1rem;
  justify-items: center;
}

@media (max-width: 40rem) {
  .feed {
    grid-template-columns: repeat(2, 1fr);
  }
}

.photo:nth-child(6n+2) {
  grid-column: 2 / 4;
  grid-row: span 2;
}

@media (max-width: 40rem) {
  .photo:nth-child(6n+2) {
    grid-column: initial;
    grid-row: initial;
  }
}

.photo a {
  display: grid;
  border-radius: 0.2rem;
  overflow: hidden;
  cursor: pointer;
}

.photo img {
  grid-area: 1/1;
}

.visualizacao {
  background: rgba(0, 0, 0, 0.3);
  color: white;
  font-size: 1rem;
  text-align: center;
  align-items: center;
  justify-content: center;
  grid-area: 1/1;
  display: none;
}

.visualizacao::before {
  width: 16px;
  height: 10px;
  content: '';
  display: inline-block;
  margin-right: 0.25rem;
  background: url('/assets/visualizacao.svg') no-repeat;
}

.photo:hover .visualizacao {
  display: flex;
}

.loadingWrapper {
  display: flex;
  height: 100px;
  margin: 1rem auto;
}

.loadingWrapper p {
  text-align: center;
  margin: auto;
  color: #888;
}
</style>
