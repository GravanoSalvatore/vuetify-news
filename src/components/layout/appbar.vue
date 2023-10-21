<template>
  <div>
    <v-navigation-drawer
        v-if="!$vuetify.breakpoint.smAndUp"
        v-model="drawer"
        :clipped="$vuetify.breakpoint.lgAndUp"
        app
        color="white"
        dark
    >
      <v-list color="primary" nav>
        <v-list-item
            v-for="(item, i) in btnItems"
            :key="i"
            :href="item.href"
            :target="item.target"
            :to="item.to"
            link
        >
          <v-list-item-content>
            <v-avatar class="elevation-4" color="">
                  <v-icon large>mdi mdi-login</v-icon>
                </v-avatar>
            <!-- <v-list-item-title>{{ item.text }}</v-list-item-title> -->
          </v-list-item-content>
        </v-list-item>
        <v-list-item
            v-for="(item, i) in barItems"
            :key="i"
            :href="item.href"
            :target="item.target"
            :to="item.to"
            link
        >
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
            
  

          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
        :clipped-left="$vuetify.breakpoint.lgAndUp"
        app
        color="black"
        elevate-on-scroll
        flat
    >
    
      <v-container :class="{ 'px-0': !$vuetify.breakpoint.smAndUp }">
        <v-row
            :no-gutters="!$vuetify.breakpoint.smAndUp"
            align="center"
            justify="space-between"
        >
          <v-col class="d-flex align-center">
            <v-app-bar-nav-icon
            style="color:white"
                v-if="!$vuetify.breakpoint.mdAndUp"
                @click.stop="drawer = !drawer"
            />
            <img class="" style="width:100px" src="https://png.pngtree.com/png-clipart/20230507/original/pngtree-good-news-speech-bubble-banner-illustration-png-image_9147234.png">
            <v-toolbar-title
                class="font-weight-bold text-h5 primary--text"
                style="cursor: pointer"
                @click="$router.push('/')"
            >
              <!-- <v-icon color="primary" large></v-icon> -->
              
            <!-- <span class="" style="color:red"> GOOD NEWS</span> -->
              <span class="accent--text"></span>
            </v-toolbar-title>
          </v-col>

          <v-col v-if="$vuetify.breakpoint.mdAndUp" cols="6">
           
            
            <v-btn
                v-for="(item, i) in barItems"
                :key="i"
                :to="item.to"
                class="text-capitalize"
                style="color:white"
                exact
                exact-active-class="accent--text"
                text
            >{{ item.title }}
            </v-btn
            >
            
          </v-col>




          
  



          <v-col v-if="$vuetify.breakpoint.mdAndUp" class="text-right">
            <v-btn
                v-for="(item, i) in btnItems"
                :key="i"
                :color="item.color"
                :href="item.href"
                :outlined="item.outlined"
                :target="item.target"
                :to="item.to"
                class="ml-3 text-capitalize"
            >
            <v-avatar class="elevation-4" color="">
              <v-icon large> mdi-login</v-icon>
                </v-avatar>
             
              <!-- {{ item.text }} -->
            </v-btn>
          </v-col>
        </v-row>




        
      </v-container>
    </v-app-bar>




    
  </div>
</template>

<script>
export default {
  data: () => ({
   
    
    drawer: null,
    btnItems: [
      {
        text: "DONATE",
        href: "",
        target: "_blank",
        color: "primary",
      
      },
    ],
    barItems: [
      {
        title: "Home",
        to: "/",
      },
      {
        title: "News",
        to: "/category",
      },
      {
        title: "Business",
        to: "/business",
      },
      {
        title: "Crypto",
        to: "/detail",
      },
      // {
      //   title: "Technology",
      //   to: "/authors",
      // },
     
      {
        title: "Sport",
        to: "/sport",
      },
      {
        title: "Science",
        to: "/science",
      },
      // {
      //   title: "Health",
      //   to: "/login",
      // },
      
    ],

    


    
  }),
};
</script>
<style lang="css" scoped>
.v-app-bar__nav-icon{
  color:white
}



</style>
