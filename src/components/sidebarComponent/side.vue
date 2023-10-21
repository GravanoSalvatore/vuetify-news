<template lang="">
     <div class="pt-4 text" >
     

      <v-card color="dark" dark flat v-for="item in articles" :key="item" class="my-4">
        <v-card-text
          class="d-flex justify-space-between align-center white--text"
        >
          <span class=""><a style="" :href="item.url" target="_blank"> {{item.title}}</a></span>

          <div class="pl-2">{{ formatDateTime(item.publishedAt) }}</div>
        </v-card-text>
      </v-card>
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
        const pageSize = 100;
        
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
   h6, a{
  text-decoration: none;
  color:white;}
 

h6,a:hover{
  text-decoration: underline;
}
.text{
    overflow-x:hidden;
              overflow-y:auto;
              height: 510px;
}
</style>