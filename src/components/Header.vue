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
            background: String,
        },
        computed: {
            headerStyle() {
                if (!this.background) {
                    return {}
                }
                return {
                    'background-image': `url('${this.background}')`,
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
        created() {
            if (this.background ===  undefined) {
                throw  new Error('You should define background image')
            }
        }
    }
</script>

<style scoped>
    #header {
        min-height: 10rem;
        background-color: #0d0d0d;
        background-size: cover;
        background-position: center;
        color: whitesmoke;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 100;
    }

    #header::after {
        content: "";
        display: block;
        background-color: lightgray;
        height: 0.5rem;
    }

    h1 {
        text-transform: uppercase;
    }

    #search-container {
        padding: 0 2rem;
        margin: 2rem 4rem;
        background-color: whitesmoke;
        border-radius: 0.5rem;
    }

    input, input:focus {
        background-color: transparent;
        outline: none;
        border: none;
        width: 100%;
        height: 2rem;
        font-size: 1.5rem;
        /*padding: 0 1rem;*/
    }
</style>
