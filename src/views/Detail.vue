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
                :src="item.imageurl"
                :aspect-ratio="16 / 9"
                gradient="to top, rgba(25,32,72,.4), rgba(25,32,72,.0)"
                style="border-radius: 16px"
              >
              <div class="mask" style="background-color: rgba(0, 0, 0, 0.3);">
              <div class="text-h4 font-weight-bold primary--text pt-4">
                  <h4 ><a style="color:white;padding:20px;text-decoration:none;" :href="item.url" target="_blank">{{item.title}}</a></h4>
                </div>
              </div>
            </v-img>

              <v-card-text >
                
              

                <div class="text-body-1 py-4 text" >
                 <p><strong style="font-size:20px"><a style="" :href="item.url" target="_blank">{{item.body}}</a></strong></p>
                </div>
                <v-avatar  color="accent" size="46">
                      <img :src="item.source_info.img">
                    </v-avatar>
                <span class="text-success"> {{ item.source_info.name }}</span>
                <div class="d-flex align-center justify-space-between">
                  <div class="d-flex align-center">
                    
                        <!-- {{item.categories}} -->
                    
                  </div>


                  <div class="pagination">
                <button class="prev-bt" @click="prevPage" :disabled="currentPage === 1">Previous</button>
                <span class="page-numbers">{{ currentPage }} / {{ totalPages }}</span>
                <button class="next-bt" @click="nextPage" :disabled="currentPage === totalPages">Next</button>
              </div>



                  <div class="d-flex align-center">
                    <div>
                      
                    </div>
                  </div>
                </div>

                <v-divider class="my-4"></v-divider>

                <div>
                 
                   
                   
                </div>

               
                <crypto-card-1/>
                
                <div class="my-2">
                <h2 class="text-h4 font-weight-bold">Altcoin news</h2>
              </div>
                <crypto-card-3/>

<crypto-card-2/>



                <v-divider class="my-8"></v-divider>

                

              </v-card-text>
            </v-card>
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
.text{
    // overflow-x:hidden;
    //           overflow-y:auto;
    //           height: 70px;
}
</style>
