<template>
  <div id="app">
    <Header ref="header" id="header" v-bind:background_img="headerBackground" v-on:searchValue="searchValueDebounced"/>
    <div ref="subHeader" id="subHeader">
      <thumbnail v-bind:key="result.id" v-for="result in currentResult"
                 v-bind:image-info="result"
                 v-bind:thumbnail-height="thumbnailHeight"
                 v-bind:thumbnail-height-unity="thumbnailHeightUnity"
      />
    </div>
  </div>
</template>

<script>
  import Header from "./components/Header";
  import HeaderBackground from './assets/galaxy-header.jpg'
  import Api from "./pixabay/api";
  import Thumbnail from "./components/Thumbnail";
  import _ from 'lodash';

  let api = new Api(process.env.VUE_APP_PIXABAY_API_KEY);

  export default {
    name: 'app',
    components: {
      Thumbnail,
      Header
    },
    data() {
      return {
        headerBackground: HeaderBackground,
        currentResult: [],
        subHeaderMarginTop: 0,
        thumbnailHeightUnity: 'rem',
        thumbnailHeight: 10,
      }
    },
    methods: {
      searchValue(value) {
        if (value === '') {
          this.currentResult = [];
          return;
        }
        api.searchImages(value).then(() => {
          this.currentResult = api.currentResult;
        })
      },
      adjustSubHeader() {
        this.$refs.subHeader.style.marginTop = this.$refs.header.$el.clientHeight + 'px';
      },
      loadNewImageAtScrollEnd() {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
          api.getNextPage().then(() => {
            this.currentResult = api.currentResult;
          }).catch((response) => {
            window.console.log(response);
          })
        }
      },
    },
    created() {
      this.searchValueDebounced = _.debounce(this.searchValue, 300)
    },
    mounted() {
      this.adjustSubHeader();
      window.addEventListener('resize', this.adjustSubHeader);
      window.addEventListener('scroll', this.loadNewImageAtScrollEnd);
    },
    destroyed() {
      window.removeEventListener('resize', this.adjustSubHeader);
      window.removeEventListener('scroll', this.loadNewImageAtScrollEnd);
    }
  }
</script>

<style>
  body {
    background-color: lightgray;
  }
  #app {
    font-family: 'Roboto', 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin: 0;
    padding: 0;
  }
  #subHeader {
    padding: 0.5rem;
    text-align: justify;
    text-justify: inter-word;
  }
  #subHeader {
    display: flex;
    flex-wrap: wrap;
  }
  #subHeader::after {
    content: "";
    flex: auto;
    flex-grow: 99;
  }

  #subHeader > div {
    flex-grow: 1;
  }
</style>
