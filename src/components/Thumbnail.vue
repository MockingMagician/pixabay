<template>
    <div id="container">
        <a v-bind:href="imageInfo.largeImageURL" target="_blank">
            <div v-bind:style="[thumbnailBackground, thumbnailSize]"></div>
        </a>
    </div>
</template>

<script>
    export default {
        name: "Thumbnail",
        props: {
            imageInfo: Object,
        },
        computed: {
            thumbnailBackground() {
                return {
                    'background-image': `url('${this.imageInfo.previewURL}')`,
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
                        width: '10rem',
                        height: height,
                    }
                }
                if (ratio >= 1.1 && ratio < 1.45) {
                    return {
                        width: '13.33rem',
                        height: height,
                    }
                }
                if (ratio >= 1.45) {
                    return {
                        width: '17.8rem',
                        height: height,
                    }
                }
                return {
                    width: '7rem',
                    height: height,
                }
            }
        }
    }
</script>

<style scoped>
    #container {
        display: inline-block;
        margin: 0.5rem 0.25rem;
    }

    #container:hover {
        transform: scale(1.05);
        opacity: 0.9;
    }

    a, a:hover, a:active {
        text-decoration: none;
    }
</style>
