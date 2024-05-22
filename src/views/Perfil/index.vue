<template>
  <v-container v-if="loginService.usuarioLogado">
      <v-row justify="center" align="center">
          <v-col cols="10">
              <v-row justify="center" align="center">
                  <v-icon size="40" class="px-5 mb-4" color="blue">mdi-account</v-icon>
                  <h1 class="text-h4 pb-3 text-blue">Perfil</h1>
              </v-row>
          </v-col>
      </v-row>
      <v-row>
          <v-col>
              <v-divider color="blue" :thickness="4"></v-divider>
              <span class="text-h6 px-4 py-2 bg-blue white--text">Informações do usuário</span>
          </v-col>
      </v-row>
      <v-row>
          <v-col cols="12" md="6">
              <v-text-field v-model="name" label="Nome*" required></v-text-field>
          </v-col>
      </v-row>
      <v-row class="pb-3">
          <v-col>
              <v-divider color="blue" :thickness="4"></v-divider>
              <span class="text-h6 px-4 py-2 bg-blue white--text">Informações de cadastro</span>
          </v-col>
      </v-row>
      <v-row>
          <v-col cols="12" md="6">
              <v-text-field v-model="email" label="E-mail*" required></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
              <v-text-field
                  v-model="password"
                  label="Nova Senha*"
                  :type="passwordFieldType"
                  required
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="togglePasswordVisibility"
              ></v-text-field>
          </v-col>
      </v-row>
      <v-row>
          <v-col cols="12" justify="end" align="end">
              <v-btn color="primary" @click="updateProfile" :disabled="loadingUpdate">
                  <template v-if="loadingUpdate">
                      <v-progress-circular indeterminate color="white"></v-progress-circular>
                  </template>
                  <template v-else> Salvar </template>
              </v-btn>
          </v-col>
      </v-row>
      <v-container fluid fill-height>
          <v-row justify="center" align="center" class="fill-height">
          </v-row>
      </v-container>
  </v-container>
</template>

<script setup lang="ts">
import validator from 'validator'
import { computed, onMounted, ref } from 'vue'
import UsuarioStore from '../../stores/Usuario';
import useNotification from '../../stores/notification';
import { LoginStore } from '../../stores';

const userService = UsuarioStore()
const loginService = LoginStore()
// const service = useService()
const password = ref('')
const email = ref('')
const name = ref('')
const showPassword = ref(false)
const loading = ref(false)
const loadingUpdate = ref(false)
const modal = ref(false)
const notification = useNotification()
const passwordFieldType = computed(() => (showPassword.value ? 'text' : 'password'))
const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

console.log(loginService.usuarioLogado)


// const updateProfile = async () => {
//   if (validator.isEmpty(name.value) || validator.isEmpty(email.value)) {
//       return notification.notifyWarning('Todos os campos são obrigatórios')
//   }
//   if (!validator.isEmail(email.value)) {
//       return notification.notifyWarning('Insira um email válido')
//   }
//   if (password.value) {
//       if (!validator.isStrongPassword(password.value)) {
//           return notification.notifyWarning(
//               'A senha deve ter no mínimo 8 caracteres, 1 minúscula, 1 maiúscula, 1 número e 1 símbolo'
//           )
//       }
//   }
//   try {
//       if (user.userInfo?.id !== undefined) {
//           loadingUpdate.value = true
//           const userToUpdate = {
//               id: user.userInfo?.id,
//               name: name.value,
//               lastName: lastName.value,
//               superAdmin: user.userInfo?.superAdmin,
//               email: email.value,
//               password: password.value,
//               municipality: { id: city.value!.cityId }
//           }
//           await service.private.user.updateUser(user.userInfo?.id, userToUpdate)
//           notification.notifySuccess('Sucesso ao atualizar o perfil')
//       }
//   } catch (error) {
//       notification.notifyError('Ocorreu um erro ao atualizar o perfil')
//   } finally {
//       loadingUpdate.value = false
//   }
// }

// onMounted(async () => {
//   try {
//       loading.value = true
//       if (user.userInfo && user.userInfo?.id !== null) {
//           const response = await service.private.user.getUserById(user.userInfo.id)
//           name.value = response.data.name
//           email.value = response.data.email
//         }
//   } catch (error) {
//       if (error instanceof Error && error.message) {
//           notification.notifyError(error.message)
//       }
//       console.log(error)
//   } finally {
//       loading.value = false
//   }
// })
</script>
