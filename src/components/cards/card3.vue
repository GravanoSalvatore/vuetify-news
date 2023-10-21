<template lang="">
      <div class="pt-16">
            <h2 class="text-h4 font-weight-bold">Latest Posts</h2>

            <div>
              <v-row v-for="item in articles" :key="item" class="py-4">
                <v-col cols="12" md="4">
                  <v-card flat height="100%">
                    <v-img
                        :aspect-ratio="16 / 9"
                        height="100%"
                        v-if="item.urlToImage"
                        :src="item.urlToImage"
                    ></v-img>

                    <v-img
                        :aspect-ratio="16 / 9"
                        height="100%"
                        v-else
                        src="https://pressclubswfl.org/wp-content/uploads/2023/08/News.jpg"
                    ></v-img>
                  </v-card>
                </v-col>

                <v-col>
                  <div>
                    <v-btn color="red" style="border-radius:20px;font-size:12px;height:20px;color:white" depressed>Last news</v-btn>

                    <h3 class="text-h6 font-weight-bold pt-3">
                      <a :href="item.url" target="_blank"> {{item.title}}</a>
                    </h3>

                    <p class="text-h6 font-weight-regular pt-3 text--secondary">
                     {{item.content}}
                    </p>

                    <div class="d-flex align-center">
                      <v-avatar class="elevation-4" color="white">
                  <v-icon large>mdi-calendar-range</v-icon>
                </v-avatar>

                      <div class="pl-2">{{ formatDateTime(item.publishedAt) }}</div>
                    </div>
                  </div>
                </v-col>
              </v-row>
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