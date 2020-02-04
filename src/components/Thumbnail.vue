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
        },
        computed: {
            thumbnailBackground() {
                return {
                    'background-image': `url('${this.imageInfo.previewURL}'), url('${defaultImage}')`,
                    'background-size': 'cover',
                    'background-position': 'center',
                }
            },
            thumbnailSize() {
                return this.thumbnailSizeCompute();
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
            thumbnailSizeCompute() {
                //16/9 ou 4/3 ou Carré ou portrait 21/30
                let height = '10rem';
                let ratio = this.imageInfo.imageWidth / this.imageInfo.imageHeight;
                if (ratio < 1.1 && ratio > 0.9) {
                    return {
                        'min-width': '10rem',
                        height: height,
                    }
                }
                if (ratio >= 1.1 && ratio < 1.45) {
                    return {
                        'min-width': '13.33rem',
                        height: height,
                    }
                }
                if (ratio >= 1.45) {
                    return {
                        'min-width': '17.8rem',
                        height: height,
                    }
                }
                return {
                    'min-width': '7rem',
                    height: height,
                }
            }
        }
    }
</script>

<style scoped>
    #container {
        position: relative;
        display: inline-block;
        margin: 0.25rem;
    }

    #container:hover {
        transform: scale(1.025);
        transition-property: all;
        transition-duration: 250ms;
        opacity: 0.9;
    }

    a, a:hover, a:active {
        text-decoration: none;
    }

    #info {
        opacity: 0;
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
        transition: opacity;
        transition-duration: 250ms;
    }

    #info > span {
        margin: 0 1rem 0 0;
    }

    #container:hover #info {
        opacity: 1;
    }
</style>
