<template>
  <v-container>
    <v-row>
      <v-col>
        <v-select v-model="redzoneSelected" :items="redzones" item-title="nome_redzone"
          item-value="id_redzone"></v-select>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { RedzoneStore } from '../../stores';
import { Redzone } from '../../types/IRedzone';
import useNotification from '../../stores/notification';


const redzoneService = RedzoneStore();
const loading = ref(false);
const redzones = ref<Redzone[]>([]);
const searchTerm = ref('')
const notificator = useNotification();
const redzoneSelected = ref()

const getAll = async () => {
  loading.value = true;
  try {
    const response = await redzoneService.getAll();
    console.log(response.data)
    redzones.value = response.data
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
}

onMounted(async () => {
  await getAll();
});

</script>
