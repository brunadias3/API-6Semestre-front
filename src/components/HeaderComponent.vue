<template>
    <v-div bg-color="#015280">
        <v-breadcrumbs class="justify-space-between bg-light-blue-darken-4" >
            <img src="../assets/logoAltave-removebg-preview.png" alt="logo-altave">
            <div class="text-center">
                <v-menu v-model="menu" :close-on-content-click="false" location="end">
                    <template v-slot:activator="{ props }">
                        <v-btn color="light-blue-darken-1" v-bind="props">
                            Nome usuário
                        </v-btn>
                    </template>

                    <v-card min-width="300">
                        <v-list >
                            <v-list-item @click="logzada"
                                subtitle="Founder of Vuetify" title="John Leider">
                            </v-list-item>
                        </v-list>

                        <v-divider></v-divider>

                        <v-list>
                            <v-list-item @click="logzada">
                                <div class="d-flex ga-3">
                                    <v-icon icon="fa-users" color="#015280" />
                                    <div class="text-overline">Meus usuários</div>
                                </div>
                            </v-list-item>
                            <v-divider></v-divider>
                            <v-list-item @click="logzada">
                                <div class="d-flex ga-3">
                                    <v-icon icon="fa-book" color="#015280" />
                                    <div class="text-overline">Departamentos</div>
                                </div>
                            </v-list-item>
                            
                            <v-divider></v-divider>

                            <v-list-item @click="logzada">
                                <div class="d-flex ga-3">
                                    <v-icon icon="mdi mdi-circle-off-outline" color="#015280" />
                                    <div class="text-overline">Redzone</div>
                                </div>
                            </v-list-item>
                        </v-list>

                        <v-card-actions>
                            <v-spacer></v-spacer>

                            <v-btn variant="text" @click="menu = false">
                                Logout
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-menu>
            </div>
        </v-breadcrumbs>
    </v-div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const fav = ref(true)
const menu = ref(false);
const message = ref(true);
const hints = ref(true)
const logzada = () => {
    console.log('LOGZADAA!!!');

}
</script>