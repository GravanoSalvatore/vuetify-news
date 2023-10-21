<template>
  <div>
    <div>
      <v-card v-for="item in articles" :key="item">
        <v-img
          :aspect-ratio="16 / 9"
          dark
          gradient="to top, rgba(25,32,72,.7), rgba(25,32,72,.0)"
          height="500px"
          :src="item.urlToImage"
        >
          <v-card-text class="fill-height d-flex align-end">
            <v-row class="flex-column">
              <!-- <v-col>
                <v-btn color="accent" to="category">Travel</v-btn>
              </v-col> -->
              <v-col cols="12" lg="8" md="10" xl="7">
                <h5 class="text-h5 py-3" style="line-height: 1.2;font-weight:bold">
                  <a style="color: white" :href="item.url" target="_blank">
                    {{ item.title }}</a
                  >
                </h5>
              </v-col>
              <v-col class="d-flex align-center">
                <v-avatar class="elevation-4" color="accent">
                  <v-icon large>mdi-calendar-range</v-icon>
                </v-avatar>

                <div class="text-h6 pl-2">
                  {{ formatDateTime(item.publishedAt) }}
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-img>
      </v-card>
    </div>
    <v-row>
      <v-col cols="12" lg="12" xl="8">
        <div>
          <div class="pt-16">
            <h2 class="text-h4 font-weight-bold pb-4">Main news</h2>
            <card-1 />
          </div>
          <card-2 />
          <card-3 />
        </div>
      </v-col>
      <v-col>
        <div class="pt-16">
          <siderbar />
        </div>
        <card-4 />
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {
    siderbar: () => import("@/components/details/sidebar"),
    card1: () => import("../components/cards/card1.vue"),
    card2: () => import("../components/cards/card2.vue"),
    card3: () => import("../components/cards/card3.vue"),
    card4: () => import("../components/cards/card4.vue"),
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
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      };
      return new Date(dateTime).toLocaleString(undefined, options);
    },
    async getData() {
      const pageSize = 1;

      try {
        const response = await fetch(
          ` https://api-epicnews404.azurewebsites.net/Articles/TopHeadlines?SiteId=1&CategoryId=3&Page=1&PageSize=${pageSize}`
          // `https://newsapi.org/v2/top-headlines?category=entertainment&language=en&apiKey=${apiKey}&pageSize=${pageSize}`
        );
        const data = await response.json();
        return data.items;
      } catch (error) {
        console.error("Error fetching news:", error);
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
a {
  text-decoration: none;
  color: white;
}
/* a:hover{
  text-decoration: underline;
} */
</style>
