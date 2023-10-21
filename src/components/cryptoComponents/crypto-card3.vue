<template>
    <div>
     
      <v-row>
        <v-col cols="12" lg="12" xl="8">
          <div>
            <div>
             
              <v-row>
                <v-col cols="12" md="6" v-for="item in paginatedArticles" :key="item">
                  <v-hover
                    v-slot:default="{ hover }"
                    open-delay="50"
                    close-delay="50"
                  >
                    <div>
                      <v-card
                        flat
                        :color="hover ? 'white' : 'transparent'"
                        :elevation="hover ? 12 : 0"
                        hover
                      >
                        <v-img
                          :src="item.imageurl"
                          :aspect-ratio="16 / 9"
                          gradient="to top, rgba(25,32,72,.4), rgba(25,32,72,.0)"
                          height="300px"
                          class="elevation-2"
                          style="border-radius: 16px"
                        ></v-img>
  
                        <v-card-text class="text-center text">
                          <!-- <v-avatar color="accent" size="86" class="authors">
                            <v-icon dark size="64">mdi-feather</v-icon>
                          </v-avatar> -->
                          <v-avatar  color="accent" size="76">
                        <img :src="item.source_info.img">
                      </v-avatar><br/>
                      <div class="d-flex align-center" style="font-size:10px;font-weight:bold;">
                      
                      <!-- {{item.categories}} -->
                  
                </div>
  
                          <div
                            class="text-h5 font-weight-bold primary--text pt-4"
                            style="font-weight:bold" > <a style="" :href="item.url" target="_blank">{{item.title}}</a>
                          </div>
  
                          <div class="text-body-1 py-4">
                            {{item.body}}
                          </div>
  
                          <!-- <div>
                            <v-btn icon>
                              <v-icon>mdi-facebook</v-icon>
                            </v-btn>
  
                            <v-btn icon>
                              <v-icon>mdi-twitter</v-icon>
                            </v-btn>
  
                            <v-btn icon>
                              <v-icon>mdi-youtube</v-icon>
                            </v-btn>
  
                            <v-btn icon>
                              <v-icon>mdi-instagram</v-icon>
                            </v-btn>
                          </div> -->
                        </v-card-text>
                      </v-card>
                    </div>
                  </v-hover>
                </v-col>
              </v-row>
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
      
    },
    data() {
          return {
            articles: [],       
            currentPage: 1,  
            totalPages: 1,     
            rows: 8,          
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
          
            const pageSize = 48;
            
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
  .text{
    overflow-x:hidden;
              overflow-y:auto;
              height: 210px;
}
  .authors {
    position: relative;
    top: -50px;
    margin-bottom: -50px;
  }
  </style>
  