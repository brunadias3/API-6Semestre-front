<template>
  <v-card class="mx-auto" max-width="368">
    <v-card-item :title="title">
      <template v-slot:subtitle>
        <v-icon
          class="me-1 pb-1"
          color="warning"
          icon="mdi mdi-information"
          size="18"
        ></v-icon>
        {{ description }}
      </template>
    </v-card-item>

    <v-card-text class="py-3">
      <v-row align="center" no-gutters>
        <v-col :class="sizeResult ? sizeResult : 'text-h2'" cols="6">
          {{ result }}
        </v-col>
        <v-col class="text-right" cols="6">
          <v-icon color="error" :icon="icon" size="65"></v-icon>
        </v-col>
      </v-row>
    </v-card-text>
    <v-divider></v-divider>
    <div class="d-flex py-3">
      <v-list-item density="compact" prepend-icon="mdi mdi-alarm">
        <v-list-item-subtitle>Atualizado em {{ date }}</v-list-item-subtitle>
      </v-list-item>
    </div>
  </v-card>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  description: string;
  icon: string;
  result: string;
  date: string;
  sizeResult?: string;
}>();
</script>
