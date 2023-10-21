<template>
    <div>
      <v-row>
        <v-col cols="12" lg="12" xl="8">
          <div>
            <div>
              <div>
                <h2 class="text-h4 font-weight-bold">ENTERTAINMENT</h2>
  
                <!-- <h4 class="text-h6">Some category description goes here</h4> -->
              </div>
  
              <v-divider class="my-4"></v-divider>
  
              <v-row>
                <v-col cols="12" md="6" lg="4" v-for="item in articles" :key="item">
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
                          v-if="item.urlToImage"
                          :src="item.urlToImage"
                          :aspect-ratio="16 / 9"
                          gradient="to top, rgba(25,32,72,.4), rgba(25,32,72,.0)"
                          height="200px"
                          class="elevation-2"
                          style="border-radius: 16px"
                        >
                          <!-- <v-card-text>
                            <v-btn color="accent">ENTERTAINMENT</v-btn>
                          </v-card-text> -->
                        </v-img>
                        <v-img
                          v-else
                          src="https://www.famestreet.com/Pictures/explore/latest-news.jpg"
                          :aspect-ratio="16 / 9"
                          gradient="to top, rgba(25,32,72,.4), rgba(25,32,72,.0)"
                          height="200px"
                          class="elevation-2"
                          style="border-radius: 16px"
                        >
                          <!-- <v-card-text>
                            <v-btn color="accent">ENTERTAINMENT</v-btn>
                          </v-card-text> -->
                        </v-img>
                        
                        <v-card-text>
                          <div class="text-h5 font-weight-bold primary--text">
                            <a :href="item.url" target="_blank"> {{item.title}}</a>
                          </div>
  
                          <div class="text-body-1 py-4">
                           {{item.content}}
                          </div>
  
                          <div class="d-flex align-center">
                            <v-avatar class="elevation-4" color="white">
                  <v-icon large>mdi-calendar-range</v-icon>
                </v-avatar>
  
                            <div class="pl-2">{{ formatDateTime(item.publishedAt) }}</div>
                          </div>
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
      siderbar: () => import("@/components/details/sidebar"),
    },
    data() {
        return {
          articles: [],       
          currentPage: 1,    
          totalPages: 1,     
          rows: 100, 
          img:'https://www.shaikhandcoaccountants.com/wp-content/uploads/2021/11/business-news-2-shaikh.jpg'         
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
         
          //const apiKey = 'd205e0353aed4e42b97d11c1a88207f0'
        // const apiKey = '1fb27fc9978d48ecadb4bdc77705325e';
          const pageSize = 100;
          
          try {
            const response = await fetch(
              ` https://api-epicnews404.azurewebsites.net/Articles/TopHeadlines?SiteId=1&CategoryId=6&Page=1&PageSize=${pageSize}`
             // `https://newsapi.org/v2/top-headlines?category=entertainment&language=en&apiKey=${apiKey}&pageSize=${pageSize}`
            );
            const data = await response.json();
            return data.items;
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
  