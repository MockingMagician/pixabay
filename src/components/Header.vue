<template>
    <div id="header" v-bind:style="headerStyle">
        <h1>Pix-Galaxy, the infinite image land</h1>
        <div id="search-container">
            <input v-model="searchValue" type="text" placeholder="Search an image in the galaxy">
        </div>
    </div>
</template>

<script>
    export default {
        name: "Header",
        props: {
            background_img: String,
        },
        computed: {
            headerStyle() {
                if (!this.background_img) {
                    return {}
                }
                return {
                    'background-image': `url('${this.background_img}')`,
                    'background-size': 'cover',
                }
            },
            searchValue: {
                set(value) {
                    this.$emit('searchValue', value);
                },
                get() {
                    return '';
                }
            }
        },
    }
</script>

<style scoped>
    #header {
        min-height: 10rem;
        background-color: #0d0d0d;
        color: whitesmoke;
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
    }

    h1 {
        text-transform: uppercase;
    }

    #search-container {
        padding: 0 5rem;
        margin: 2rem 0;
    }

    input {
        border-radius: 0.5rem;
        width: 100%;
        height: 2rem;
        font-size: 1.5rem;
        background-color: lightgray;
        padding: 0 1rem;
    }
</style>
