<template>
    <div>
      <v-row>
        <v-col cols="12" lg="12" xl="8"
        v-for="item in paginatedArticles"
        :key="item"
        >
          <div>
            <div>
              <v-card flat color="transparent">
              
                <v-img
                class="elevation-2 fill-height"
                  src="https://www.gawieleroux.co.za/sites/default/files/2023-03/Blog%20photos_5%20enterprises.jpg"
                  :aspect-ratio="16 / 9"
                  gradient="to top, rgba(25,32,72,.4), rgba(25,32,72,.0)"
                  style="border-radius: 16px"
                >
                
                <div class="text-h4 font-weight-bold primary--text pt-4">
                    <div class="mask" style="background-color: rgba(0, 0, 0, 0.1);">
                    <div class="modal-body " style="color:white">
goodnews@gmail.com<br/>
New York, NY 10012, US<br/>



</div>
                  </div>
                </div>
              </v-img>
           
                <v-card-text >
                  
                
                  
                 
  
                  <div>
                   
                     
                     
                  </div>
  
                 
             
  
  
  
                 
  
                  
  
                </v-card-text>
              </v-card>

              <v-hover
                    v-slot:default="{ hover }"
                    close-delay="50"
                    open-delay="50"
                >


              <v-card
                        :color="hover ? 'white' : 'transparent'"
                        :elevation="hover ? 12 : 0"
                        flat
                        hover
                        rounded
                       
                    >
                
                
                
                
                    <div class="modal-body "  style="border-radius: 16px">
   <p><strong style="font-size:30px">Good News</strong>   are your trusted source for up-to-the-minute news covering the world of cryptocurrencies and the dynamic realm of business. Our mission is to provide our readers with the freshest and most reliable information needed to make informed decisions in the fields of investment, finance, and technology.</p>
  <p><strong>Good News</strong> monitor the latest developments in the cryptocurrency world, analyze the market, and provide reviews of leading digital assets. Whether you're an experienced trader or a newcomer to the crypto space, our content will help you stay informed about crucial events.</p>
  <p><strong>Good News</strong> keep tabs on business news and trends that can impact the global economy. Our articles offer analytical insights into significant happenings in the business world, corporate innovations, and global trends.
</p>
  <p><strong>Good News</strong> adhere to the highest standards of journalism and strive to deliver trustworthy information. Our team of professional journalists and experts ensures that you receive only high-quality content.
</p>
  <p><strong>Good News</strong> update our website as soon as important information surfaces, ensuring you're always in the know.
</p>
  <p><strong>Good News</strong> cover a wide range of subjects, from cryptocurrencies and finance to technology and business, catering to the interests of all our readers.</p>
  <p><strong>Good News</strong> provide an analytical perspective on events, along with expert commentary to help you understand their implications.</p>
  <p>With us, you gain access to a world of news and information that can empower you to make informed decisions. Welcome to our website, where information becomes knowledge, and knowledge is power.</p>
  </div>
                
                
                </v-card>
              </v-hover>
            </div>
          </div>
        </v-col>
  
        <v-col>
          <!-- <div>
            <siderbar />
          </div> -->
        </v-col>
      </v-row>
    </div>
  </template>
  
  <script>
  
  export default {
    name: "Category",
    components: {
      siderbar: () => import("@/components/details/sidebar"),
      cryptoCard1: () => import("@/components/cryptoComponents/crypto-card1.vue"),
      cryptoCard2: () => import("@/components/cryptoComponents/crypto-card2.vue"),
      cryptoCard3: () => import("@/components/cryptoComponents/crypto-card3.vue"),
    },
  
  
    data() {
          return {
            articles: [],       
            currentPage: 1,  
            totalPages: 1,     
            rows: 1,          
          };
        },
        computed: {
          paginatedArticles() {
            
            const start = (this.currentPage - 1) * this.rows;
            const end = start + this.rows;
            return this.articles.slice(start, end);
          },
        },
        methods: {
          formatDateTime(dateTime) {
      const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }
      return new Date(dateTime).toLocaleString(undefined, options); 
    },
          async getData() {
            
            // const apiKey = 'd205e0353aed4e42b97d11c1a88207f0'
          
            const pageSize = 1;
            
            try {
              const response = await fetch(
               // 'https://min-api.cryptocompare.com/data/v2/news/?categories=BTC,ETH&excludeCategories=Sponsored'
               'https://min-api.cryptocompare.com/data/v2/news/?categories=Technology,Blockchain&excludeCategories=Defi,Nft'
              );
              const data = await response.json();
              return data.Data;
            } catch (error) {
              console.error('Error fetching news:', error);
              return [];
            }
          },
          async fetchNews() {
           
            const articles = await this.getData();
            this.articles = articles;
            this.totalPages = Math.ceil(articles.length / this.rows);
          },
          nextPage() {
  
            if (this.currentPage < this.totalPages) {
              this.currentPage++;
            }
          },
          prevPage() {
            
            if (this.currentPage > 1) {
              this.currentPage--;
            }
          },
        },
        mounted() {
          
          this.fetchNews();
        },
  
  };
  </script>
  <style lang="scss" scoped>
  .modal-body{
      padding-top: 30px;
      padding: 20px;
      
  }
  </style>
  