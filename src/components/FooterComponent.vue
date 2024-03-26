<template>
    <v-footer no-flex class="bg-light-blue-darken-4 justify-space-between text-center d-flex flex-row">
        <div class="">
            <v-btn v-for="icon in icons" :key="icon" :icon="icon" variant="text" class="justify-start"></v-btn>
            <div>
                <v-btn v-for="(btn, index) in links" :key="index" variant="text" :to="btn.route" target="_blank">{{ btn.title }}</v-btn>

            </div>
            <div>
                © {{ new Date().getFullYear() }} — <strong>Altave</strong>
            </div>
        </div>

        <div class="pt-0">
            <img src="../assets/logoAltave-removebg-preview.png" alt="logo-altave">
        </div>

    </v-footer>
</template>
<script setup lang="ts">
const icons = [
    'fa-facebook',
    'fa-linkedin',
    'fa-instagram',
    ]
const links = [
    {title: 'Política de Privacidade', route: '/'},
    {title: 'Notícias', route: '/1'},
    {title: 'Recursos', route: '/2'},
    {title: 'Carreira', route: '/3'},
    {title: 'Contato', route: '/4'}
]
</script>