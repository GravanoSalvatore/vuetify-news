<template>
  <div>
    <div>
      <!-- <h3 class="text-h5 font-weight-medium pb-4">Popular Posts</h3> -->

     

      <div>
        <v-row v-for="item in articles" :key="item" class="py-2">
          <v-col cols="12" md="6" lg="5">
            <v-card height="100%" flat>
              <v-img
              v-if="item.urlToImage"
                :src="item.urlToImage"
                :aspect-ratio="16 / 9"
                height="100%"
              ></v-img>
              <v-img
              v-else
                src="ttps://pressclubswfl.org/wp-content/uploads/2023/08/News.jpg"
                :aspect-ratio="16 / 9"
                height="100%"
              ></v-img>
            </v-card>
          </v-col>

          <v-col>
            <div>
              <v-btn depressed color="accent" small>SPORT</v-btn>

              <h3 class="text-h6 font-weight-bold primary--text py-3">
               {{item.title}}
              </h3>
<p>{{ite.content}}</p>
              <div class="d-flex align-center">
                <v-avatar color="accent" size="24">
                  <v-icon dark small>mdi-feather</v-icon>
                </v-avatar>

                <div class="pl-2">{{ formatDateTime(item.publishedAt) }}</div>
              </div>
            </div>
          </v-col>
        </v-row>
      </div>
    </div>

   <side/>






    
  
  </div>
</template>
<script>

export default {
  components:{
    side: () => import("@/components/sidebarComponent/side.vue")
   
  },
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
        const pageSize = 5;
        
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
