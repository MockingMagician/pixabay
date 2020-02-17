<template>
    <div id="container">
        <a v-bind:href="imageInfo.largeImageURL" target="_blank">
            <div v-bind:style="[thumbnailBackground, thumbnailSize]">
                <div id="info">
                    <span><fa icon="eye"/> {{imageInfo.views}}</span>
                    <span><fa icon="heart"/> {{imageInfo.likes}}</span>
                    <span><fa icon="tags"/> {{imageInfo.tags}}</span>
                </div>
            </div>
        </a>
    </div>
</template>

<script>
    import defaultImage from '../assets/images-loading.png'
    export default {
        name: "Thumbnail",
        props: {
            imageInfo: Object,
            thumbnailHeight: Number,
            thumbnailHeightUnity: String,
        },
        computed: {
            thumbnailBackground() {
                return {
                    'background-image': `url('${this.imageInfo.previewURL}'), url('${defaultImage}')`,
                }
            },
            thumbnailSize() {
                let height = this.thumbnailHeight + this.thumbnailHeightUnity;
                let width = (this.imageInfo.imageWidth * this.thumbnailHeight / this.imageInfo.imageHeight) + this.thumbnailHeightUnity;

                return {
                    'min-width': width,
                    height: height,
                }
            },
            // largeImageURL: this.imageInfo.largeImageURL,
            // webformatHeight: this.imageInfo.webformatHeight,
            // webformatWidth: this.imageInfo.webformatWidth,
            // likes: this.imageInfo.likes,
            // imageWidth: this.imageInfo.imageWidth,
            // id: this.imageInfo.id,
            // user_id: this.imageInfo.user_id,
            // views: this.imageInfo.views,
            // comments: this.imageInfo.comments,
            // pageURL: this.imageInfo.pageURL,
            // imageHeight: this.imageInfo.imageHeight,
            // webformatURL: this.imageInfo.webformatURL,
            // type: this.imageInfo.type,
            // previewHeight: this.imageInfo.previewHeight,
            // tags: this.imageInfo.tags,
            // downloads: this.imageInfo.downloads,
            // user: this.imageInfo.user,
            // favorites: this.imageInfo.favorites,
            // imageSize: this.imageInfo.imageSize,
            // previewWidth: this.imageInfo.previewWidth,
            // userImageURL: this.imageInfo.userImageURL,
            // previewURL: this.imageInfo.previewURL,
        },
        methods: {
        },
        created() {
            if (!this.imageInfo || !this.thumbnailHeight || !this.thumbnailHeightUnity) {
                throw new Error('All thumbnail props must be defined');
            }
        }
    }
</script>

<style scoped>
    #container {
        position: relative;
        display: inline-block;
        margin: 0.25rem;
        transform: scale(1);
        opacity: 1;
        transition-property: transform, opacity;
        transition-duration: 450ms;
        transition-timing-function: ease-in-out;
    }

    #container:hover {
        transform: scale(1.025);
        opacity: 0.9;
        transition-property: transform, opacity;
        transition-duration: 450ms;
        transition-timing-function: ease-in-out;
    }

    a, a:hover, a:active {
        text-decoration: none;
    }

    #container > a > div {
        background-size: cover;
        background-position: center;
    }

    #info {
        width: 100%;
        box-sizing: border-box;
        position: absolute;
        bottom: 0;
        left: 0;
        padding: 0.5rem;
        background-color: rgba(0,0,0,0.7);
        color: white;
        font-size: 0.75rem;
        z-index: 10;
        opacity: 0;
        transition-property: opacity;
        transition-duration: 250ms;
        transition-timing-function: ease-in-out;
    }

    #info > span {
        margin: 0 1rem 0 0;
    }

    #container:hover #info {
        opacity: 1;
        transition-property: opacity;
        transition-duration: 250ms;
        transition-timing-function: ease-in-out;
    }
</style>
