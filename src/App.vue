<template>
  <v-app>
    <AppBar></AppBar>

   



<cookies></cookies>
    <v-container class="mt-16">
      <router-view></router-view>
    </v-container>

    <Footer></Footer>
  </v-app>
</template>

<script>

export default {
 
  name: "App",

  components: {
    AppBar: () => import("@/components/layout/appbar.vue"),
    Footer: () => import("@/components/layout/footer.vue"),
    Cookies: () => import("@/components/cookies/cookies.vue")
    
  },
  data: () => ({}),
};
</script>
