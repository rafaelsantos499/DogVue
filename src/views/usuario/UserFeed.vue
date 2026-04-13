<template>
  <div>
    <Feed :photos="photos" @selectPhoto="openModal" />
    <Loading v-if="loading" />
    <div v-if="!loading && !hasMore && photos.length" class="no-more">
      <p>Não existem mais fotos.</p>
    </div>
    <div v-if="!loading && !photos.length" class="empty">
      <p>Você ainda não publicou nenhuma foto.</p>
    </div>
    <FeedModal v-model="selectedPhotoUuid" @close="selectedPhotoUuid = null" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { feedService } from '@/service/feedService';
import type { FeedItem } from '@/models/Feed';
import Feed from '@/components/feed/Feed.vue';
import FeedModal from '@/components/feed/FeedModal.vue';
import Loading from '@/components/helper/Loading.vue';

const photos = ref<FeedItem[]>([]);
const loading = ref(false);
const hasMore = ref(true);
const selectedPhotoUuid = ref<string | null>(null);
const cursor = ref<string | null>(null);

function openModal(uuid: string) {
  selectedPhotoUuid.value = uuid;
}

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
    const response = await feedService.getPersonalFeed({ per_page: 15, cursor: cursor.value });
    if (response.data.length === 0) {
      hasMore.value = false;
    } else {
      photos.value = [...photos.value, ...response.data];
      cursor.value = response.meta.next_cursor;
      if (!response.meta.next_cursor) hasMore.value = false;
    }
  } catch (error) {
    console.error('Erro ao carregar feed pessoal:', error);
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  loadFeed();
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
.no-more,
.empty {
  text-align: center;
  padding: 2rem 0;
  color: #999;
  font-size: 0.9rem;
}
</style>

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
</style>
