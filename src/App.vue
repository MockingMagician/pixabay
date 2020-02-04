<template>
  <div id="app">
    <Header ref="header" id="header" v-bind:background_img="headerBackground" v-on:searchValue="searchValue"/>
    <div ref="subHeader" id="subHeader">
      <p v-bind:key="result.id" v-for="result in currentResult">{{ result.previewURL }}</p>
    </div>
  </div>
</template>

<script>
  import Header from "./components/Header";
  import HeaderBackground from './assets/galaxy-header.jpg'
  import Api from "./pixabay/api";

  let api = new Api('15114273-9d732c50c2776ed9da41549b4');

  export default {
    name: 'app',
    components: {
      Header
    },
    data() {
      return {
        headerBackground: HeaderBackground,
        currentResult: [],
        subHeaderMarginTop: 0,
      }
    },
    methods: {
      searchValue(value) {
        api.searchImages(value).then(() => {
          this.currentResult = api.currentResult;
          window.console.log(api.currentResult);
        })
      },
      adjustSubHeader() {
        this.$refs.subHeader.style.marginTop = this.$refs.header.$el.clientHeight + 'px';
      }
    },
    mounted() {
      this.adjustSubHeader();
      window.addEventListener('resize', this.adjustSubHeader);
    },
    destroyed() {
      window.removeEventListener('resize', this.adjustSubHeader);
    }
  }
</script>

<style>
  #app {
    font-family: 'Roboto', 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin: 0;
    padding: 0;
  }
</style>
