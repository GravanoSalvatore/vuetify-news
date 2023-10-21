<template lang="">
    <div class="my-4">
      
  
                  <v-row>
                    
                    <v-col v-for="item in paginatedArticles"
                    cols="12" lg="4" md="6"
                    :keys="item" 
                   
                     >
                      <v-card>
                        <v-img
                          :src="item.imageurl"
                          :aspect-ratio="16 / 9"
                          gradient="to top, rgba(25,32,72,.4), rgba(25,32,72,.0)"
                        >
                        <div class="mask" style="background-color: rgba(0, 0, 0, 0.5);">
                      
                        <div
                        class="d-flex flex-column justify-space-between fill-height"
                    >
                      <!-- <v-card-text>
                        <v-btn color="accent">CRYPTO</v-btn>
                      </v-card-text> -->
                      <v-avatar  color="accent" size="46">
                      <img :src="item.source_info.img">
                    </v-avatar>
                    <span style="color:white;font-weight:bold"> {{ item.source_info.name }}</span>
                      <v-card-text>
                        <div
                            class="text-h5 py-3 font-weight-bold"
                            style="line-height: 1.2"
                        >
                        <a style="color:white;text-decoration:none" :href="item.url" target="_blank">{{item.title}}</a>
                        </div>

                        
                      </v-card-text>
                    </div>
                      
                      
                      
                      
                </div>
                      </v-img>
                      </v-card>
                    </v-col>

                    
               
                  </v-row>
                   <div class="pagination">
                <button class="prev-bt" @click="prevPage" :disabled="currentPage === 1">Previous</button>
                <span class="page-numbers">{{ currentPage }} / {{ totalPages }}</span>
                <button class="next-bt" @click="nextPage" :disabled="currentPage === totalPages">Next</button>
              </div>
                </div>

               
               






</template>
<script>
export default {
    data() {
        return {
          articles: [],       
          currentPage: 1,  
          totalPages: 1,     
          rows: 12,          
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
    
}
</script>
<style lang="">
    
</style>