<template>
  <v-container>
    <v-app-bar color="primary" prominent>
      <v-row bg-color="#015280" class="d-flex justify-space-between align-center">
        <v-col cols="9">
          <v-img :width="95" src="../assets/logoAltave-removebg-preview.png" alt="logo-altave" />
        </v-col>
        <v-col cols="2">
          <div>
            <v-menu v-model="menu" :close-on-content-click="false" >
              <template v-slot:activator="{ props }">
                <v-btn v-bind="props" variant="plain">
                  Olá, {{ loginService.usuarioLogado?.nomeUsuario }}
                </v-btn>
              </template>
              <v-card min-width="300">
                <v-divider v-if="!loginService.usuarioLogado?.autorizacoes.includes('ROLE_GUARD')"></v-divider>

                <v-list>
                  <v-list-item @click="menuActive('perfil')">
                    <div class="d-flex ga-3">
                      <v-icon icon="mdi mdi-account" color="#015280" />
                      <div class="text-overline">Meu Perfil</div>
                    </div>
                  </v-list-item>
                  <v-divider></v-divider>
                  <v-list-item @click="menuActive('dashboard')">
                    <div class="d-flex ga-3">
                      <v-icon icon="mdi mdi-view-dashboard" color="#015280" />
                      <div class="text-overline">Dashboard</div>
                    </div>
                  </v-list-item>
                  <v-divider></v-divider>
                  <v-list-item v-if="!loginService.usuarioLogado?.autorizacoes.includes('ROLE_GUARD')" @click="menuActive('usuarios')">
                    <div class="d-flex ga-3">
                      <v-icon icon="fa-users" color="#015280" />
                      <div class="text-overline">Meus usuários</div>
                    </div>
                  </v-list-item>
                  <v-divider v-if="!loginService.usuarioLogado?.autorizacoes.includes('ROLE_GUARD')"></v-divider>
                  <v-list-item v-if="!loginService.usuarioLogado?.autorizacoes.includes('ROLE_GUARD')" @click="menuActive('departamentos')">
                    <div class="d-flex ga-3">
                      <v-icon icon="fa-book" color="#015280" />
                      <div class="text-overline">Departamentos</div>
                    </div>
                  </v-list-item>

                  <v-divider></v-divider>

                  <v-list-item @click="menuActive('redzone')">
                    <div class="d-flex ga-3">
                      <v-icon icon="mdi mdi-circle-off-outline" color="#015280" />
                      <div class="text-overline">Redzones</div>
                    </div>
                  </v-list-item>
                  <v-divider></v-divider>
                  <v-list-item @click="menuActive('redzone/filtragem')">
                    <div class="d-flex ga-3">
                      <v-icon icon="mdi mdi-filter" color="#015280" />
                      <div class="text-overline">Filtragem Redzones</div>
                    </div>
                  </v-list-item>
                  <v-divider></v-divider>
                  <v-list-item @click="logout">
                    <div class="d-flex ga-3">
                      <v-icon icon="mdi mdi-logout" color="#015280" />
                      <div class="text-overline">Logout</div>
                    </div>
                  </v-list-item>
                </v-list>

                <!-- <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn variant="text" @click="menu = false">
                    Logout
                  </v-btn>
                </v-card-actions> -->
              </v-card>
            </v-menu>
          </div>
        </v-col>
      </v-row>
    </v-app-bar>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { LoginStore } from '../stores';
import handleLocalStorage from '../utils/handleLocalStorage';

const router = useRouter();
const menu = ref(false);
const loginService = LoginStore();


const menuActive = (rota: string) => {
  router.push(`/${rota}`);
}

const logout = () => {
  handleLocalStorage.remove('usuarioLogado');
  return router.push({ name: 'login' });
};
</script>
