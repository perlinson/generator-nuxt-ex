<template>
  <v-app dark>
    <v-app-bar
      id="core-app-bar"
      absolute
      app
      height="55"
      dense
      dark
    >
      <v-toolbar-items
        v-for="item in items"
        :key="item.text"
        class="hidden-sm-and-down"
      >
        <v-col>
          <v-btn
            :to="item.to"
            class="white--text"
            :class="{ 'active': item.active }"
          >
            {{ item.text }}
          </v-btn>
        </v-col>
      </v-toolbar-items>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  transition: 'bounce',
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          text: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-apps',
          text: 'card',
          to: '/card'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  }
}
</script>
