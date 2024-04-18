<template>
  <container class="justify-center align-center">
    <v-data-table :headers="headers" :items="dataMockup" items-per-page-text="Resultados por página"
      no-data-text="Nenhum resultado encontrado" loading-text="Buscando dados..." :loading="loading" class="py-5 px-16 w-75">
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-text-field v-model="search" label="Pesquisar" prepend-inner-icon="mdi mdi-magnify" variant="solo-filled" flat
            hide-details single-line></v-text-field>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ props }">
              <v-btn class="mb-2" color="primary" dark v-bind="props" size="large" prepend-icon="mdi mdi-plus">
                Criar Redzone
              </v-btn>
            </template>
            <v-card>
              <v-card-title class="d-flex px-5 pt-5 pb-2">
                <v-icon>mdi mdi mdi-rename-box-outline</v-icon>
                <h1 class="px-4 text-h5 font-weight-medium">Redzone</h1>
                <v-spacer></v-spacer>
                <v-icon @click="dialog = false" class="mt-1" size="x-small">mdi-close</v-icon>
              </v-card-title>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-btn icon flat :loading="loading">
          <v-icon>mdi mdi-dots-horizontal</v-icon>
          <v-menu activator="parent" location="bottom end" transition="fade-transition">
            <v-list density="compact" min-width="250" rounded="lg" slim color="primary">
              <v-list-item prepend-icon="mdi mdi-pencil" class="text-primary" title="Editar Redzone" link
                @click="editItem(item)"></v-list-item>
              <v-divider class="my-2"></v-divider>
              <v-list-item prepend-icon="mdi mdi-delete" class="text-red" title="Excluir Redzone" link
                @click="deleteItem(item)"></v-list-item>
            </v-list>
          </v-menu>
        </v-btn>
      </template>
    </v-data-table>
  </container>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const headers = [
  { title: 'ID', key: 'ID' },
  { title: 'Nome', align: 'center', key: 'Nome' },
  { title: 'Criado em', align: 'center', key: 'Criado em' },
  { title: 'Ativo', align: 'center', key: 'Ativo' },
  { title: 'Editar', align: 'end', sortable: false, key: 'actions' },
]
const search = ref('');
const dialog = ref(false);
const loading = ref(false)

const editItem = (item: any) => {
  console.log(item)
}

const deleteItem = (item: any) => {
  console.log(item)
}

const dataMockup = [
  {
    'ID': 1,
    'Nome': 'Produto A',
    'Criado em': '2024-04-18',
    'Atualizado em': '2024-04-18',
    'Ativo': true,
  },
  {
    'ID': 2,
    'Nome': 'Produto B',
    'Criado em': '2024-04-17',
    'Atualizado em': '2024-04-18',
    'Ativo': false
  },
  {
    'ID': 3,
    'Nome': 'Produto C',
    'Criado em': '2024-04-16',
    'Atualizado em': '2024-04-17',
    'Ativo': true
  },
  {
    'ID': 4,
    'Nome': 'Produto D',
    'Criado em': '2024-04-15',
    'Atualizado em': '2024-04-16',
    'Ativo': false
  },
  {
    'ID': 5,
    'Nome': 'Produto E',
    'Criado em': '2024-04-14',
    'Atualizado em': '2024-04-15',
    'Ativo': true
  }
];


</script>
