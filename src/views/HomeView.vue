<template>
  <main class="container">
    <Feed :photos="photos" @selectPhoto="openModal" />
    <div v-if="loading" class="loadingWrapper">
      <p>Carregando...</p>
    </div>
    <div v-if="!hasMore && photos.length" class="loadingWrapper">
      <p>Não existem mais fotos.</p>
    </div>
    <FeedModal v-model="selectedPhotoId" @close="closeModal" />
  </main>
</template>
<script setup lang="ts">
import { apiService } from '@/service/apiService';
import { onMounted, onUnmounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type { Photo } from '@/models/Photo';
import Feed from '@/components/feed/Feed.vue';
import FeedModal from '@/components/feed/FeedModal.vue';

const route = useRoute();
const router = useRouter();

const photos = ref<Photo[]>([]);
const page = ref(1);
const loading = ref(false);
const hasMore = ref(true);
const selectedPhotoId = ref<number | null>(null);

if (route.params.id) {
  selectedPhotoId.value = Number(route.params.id);
}

function openModal(id: number) {
  selectedPhotoId.value = id;
  router.push(`/feed/photo/${id}`);
}

function closeModal() {
  selectedPhotoId.value = null;
  router.push('/');
}

onMounted(() => {
  feed();
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

function handleScroll() {
  const { scrollTop, scrollHeight } = document.documentElement;
  const windowHeight = window.innerHeight;
  if (scrollTop + windowHeight >= scrollHeight - 10 && !loading.value && hasMore.value) {
    feed();
  }
}

const feed = () => {
  loading.value = true;
  apiService.get(`api/photo/?_page=${page.value}&_total=6&_user=0`)
    .then((response) => {
      if (response.data.length === 0) {
        hasMore.value = false;
      } else {
        photos.value = [...photos.value, ...response.data];
        page.value++;
      }
    })
    .catch((error) => {
      console.error("Error fetching feed:", error);
    })
    .finally(() => {
      loading.value = false;
    });
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
