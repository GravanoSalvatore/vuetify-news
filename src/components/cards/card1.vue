<template lang="">
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
                          v-if="item.urlToImage"
                          :src="item.urlToImage"
                          style="border-radius: "
                      >
                       
                      </v-img>
                      <v-img
                          :aspect-ratio="16 / 9"
                          class="elevation-2"
                          gradient="to top, rgba(25,32,72,.4), rgba(25,32,72,.0)"
                          height="200px"
                          v-else
                          src="https://pressclubswfl.org/wp-content/uploads/2023/08/News.jpg"
                          style="border-radius: "
                      >
                        <!-- <v-card-text>
                          <v-btn color="accent" to="category">TIPS</v-btn>
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
        
        
        
</template>
<script>
export default {
    data() {
      return {
        articles: [],       
        currentPage: 1,    
        totalPages: 1,     
        rows: 1, 
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
        const pageSize = 15;
        
        try {
          const response = await fetch(
            ` https://api-epicnews404.azurewebsites.net/Articles/TopHeadlines?SiteId=1&CategoryId=3&Page=1&PageSize=${pageSize}`
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
}
</script>
<style lang="scss" scoped>
    a{
  text-decoration: none;
 
}
a:hover{
  text-decoration: underline;
}
</style>