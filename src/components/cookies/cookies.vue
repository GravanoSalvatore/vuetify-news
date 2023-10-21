<template>
    <div v-if="showCookieWarning" class="cookie-warning" :style="{ backgroundColor: backgroundColor }">
      <p>{{ message }}</p>
      <button class=" rounded-3 p-3" @click="hideCookieWarning"><span>ACCEPT</span></button>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      message: {
        type: String,
        default: "This site uses cookies. By continuing to use the site, you agree to our cookie policy.",
      },
      backgroundColor: {
        type: String,
        default: "rgb( 92,187,246)",
      },
    },
    data() {
      return {
        showCookieWarning: false,
      };
    },
    methods: {
      hideCookieWarning() {
        this.showCookieWarning = false;
        localStorage.setItem("cookieWarningShown", "true");
      },
    },
    created() {
      if (localStorage.getItem("cookieWarningShown") !== "true") {
        this.showCookieWarning = true;
      }
    },
  };
  </script>
  
  <style scoped>
  span{
    color: white;
  }
  button{
    border:3px solid white;
    padding: 15px;
    
  }
  button:hover{
    background-color: rgb(59, 115, 149);
  }
  p{
    color:white
  }
  .cookie-warning {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 10px;
    text-align: center;
    border-top: 1px solid white;
    z-index: 10000;
  }
  </style>
  
  <!-- <template>
    <v-sheet
      border="md"
      class="pa-6 text-white mx-auto"
      color="#141518"
      max-width="400"
    >
      <h4 class="text-h5 font-weight-bold mb-4">Your Privacy</h4>
  
      <p class="mb-8">
        This business determines the use of personal data collectied on our media properties and across the internet. We may collect data that you submit to us directly or data that we collect automatically including from cookies (such as device information or IP address).
  
        <br>
        <br>
  
        Please read our <a href="#" class="text-red-accent-2">Privacy Policy</a> to learn about our privacy practices or click "Your Preferences" to exercise control over your data.
      </p>
  
      <v-btn
        block
        class="text-none text-black mb-4"
        color="red-accent-2"
        size="x-large"
        variant="flat"
      >
        Accept
      </v-btn>
  
      <v-btn
        block
        class="text-none text-black"
        color="red-accent-2"
        size="x-large"
        variant="outlined"
      >
        Your Preferences
      </v-btn>
    </v-sheet>
  </template> -->