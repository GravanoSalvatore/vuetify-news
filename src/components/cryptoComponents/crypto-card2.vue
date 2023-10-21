<template lang="">
    <div>
        <br/><br/>
 <h2 class="text-h4 font-weight-bold pb-4">Blockchain</h2>
 <v-divider class="my-1"></v-divider>
 <v-row>
       
             <v-col v-for="item in articles" :key="items" cols="12" lg="4" md="6">
               <v-hover
                   v-slot:default="{ hover }"
                   close-delay="50"
                   open-delay="50"
               >
                 <div>
                   <v-card
                       :color="hover ? 'white' : 'transparent'"
                       :elevation="hover ? 12 : 0"
                       flat
                       hover
                      
                   >
                     <v-img
                         :aspect-ratio="16 / 9"
                         class="elevation-2"
                         gradient="to top, rgba(25,32,72,.4), rgba(25,32,72,.0)"
                         height="200px"
                         v-if="item.imageurl"
                         :src="item.imageurl"
                         style="border-radius: 16px"
                     >
                      
                     </v-img>
                     <v-img
                         :aspect-ratio="16 / 9"
                         class="elevation-2"
                         gradient="to top, rgba(25,32,72,.4), rgba(25,32,72,.0)"
                         height="200px"
                         v-else
                         src="https://pressclubswfl.org/wp-content/uploads/2023/08/News.jpg"
                         style="border-radius: 16px"
                     >
                       <!-- <v-card-text>
                         <v-btn color="accent" to="category">TIPS</v-btn>
                       </v-card-text> -->
                     </v-img>
                     <v-card-text >
                        <div  class="text">
                       <div class="text-h5 font-weight-bold primary--text">
                         <a style="font-weight:bold" :href="item.url" target="_blank"> {{item.title}}</a>
                       </div>

                       <div class="text-body-1 py-4">
                        {{item.body}}
                       </div>
                    </div>
                       <div class="d-flex align-center" style="padding:5px">
                        <v-avatar  color="accent" size="46">
                      <img :src="item.source_info.img">
                    </v-avatar><br/>
                    <!-- <div class="d-flex align-center" style="font-size:10px;font-weight:bold;">
                    
                    {{item.categories}}
                
              </div> -->
                        
                       </div>
                     </v-card-text>
                   </v-card>
                 </div>
               </v-hover>
             </v-col>
           </v-row>
       
       
        </div>
</template>
<script>
export default {
    data() {
        return {
          articles: [],       
          currentPage: 1,  
          totalPages: 1,     
          rows: 3,          
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
<style lang="scss" scoped>
.text{
    overflow-x:hidden;
              overflow-y:auto;
              height: 210px;
}
   a{
 text-decoration: none;

}
a:hover{
 text-decoration: underline;
}
</style>