<template>
    <v-footer app style="background-color:black">
    
      
      <v-btn @click="scrollToTop" color="primary" dark fab small bottom right>
        <v-icon>mdi-arrow-up</v-icon>
      </v-btn>
  
      <v-spacer><div style="font-size:14px">{{ bitcoinPrice }}</div></v-spacer>
  
     
      
      <div>{{ newYorkTime }}</div>
    </v-footer>
  </template>
  
  <script>
  export default {
    data() {
      return {
        newYorkTime: '',
        bitcoinPrice: '',
      };
    },
    methods: {
      scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      fetchNewYorkTime() {
        fetch('http://worldtimeapi.org/api/timezone/America/New_York')
          .then((response) => response.json())
          .then((data) => {
            const newYorkTime = new Date(data.utc_datetime);
            this.newYorkTime = newYorkTime.toLocaleTimeString();
          })
          .catch((error) => {
            console.error('Ошибка при загрузке времени Нью-Йорка:', error);
          });
      },
      fetchBitcoinPrice() {
        fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd')
          .then((response) => response.json())
          .then((data) => {
            this.bitcoinPrice = `Bitcoin Price: $${data.bitcoin.usd}`;
          })
          .catch((error) => {
            console.error('Ошибка при загрузке цены Bitcoin:', error);
          });
      },
    },
    created() {
      this.fetchNewYorkTime();
      this.fetchBitcoinPrice();
      
      setInterval(this.fetchNewYorkTime, 1000);
      
      setInterval(this.fetchBitcoinPrice, 60000);
    },
  };
  </script>
  


   
   