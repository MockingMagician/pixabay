import axios from 'axios';

class Api {

    #apiKey;
    #currentResult = [];
    #currentSearch = null;
    #currentPage = 1;

    get currentResult() {
        return this.#currentResult;
    }

    /**
     * @param apiKey {string}
     */
    constructor(apiKey) {
        this.#apiKey = apiKey;
    }

    /**
     * @param urlEncodedString {string}
     * @return {Promise<Api>|Promise<string>}
     */
    async searchImages(urlEncodedString) {
        this.#currentResult = [];
        this.#currentPage = 1;
        this.#currentSearch = `https://pixabay.com/api/?key=${this.#apiKey}&q=${urlEncodedString}&image_type=photo`;
        await axios.get(this.#currentSearch).then((response) => {
            if (!response.data.hits) {
                throw 'hits key should exist on response.data';
            }

            this.#currentResult = response.data.hits;
        }).catch((response) => {
            return Promise.reject(response.statusText ? response.statusText : response);
        });

        return Promise.resolve(this);
    }

    /**
     * @return {Promise<Api>|Promise<string>}
     */
    async getNextPage() {
        if (!this.#currentSearch) {
            return Promise.reject('Can not get the next page of nothing!');
        }
        await axios.get(this.#currentSearch + '&page=' + (++this.#currentPage)).then((response) => {
            if (!response.data.hits) {
                throw 'hits key should exist on response.data';
            }

            this.#currentResult = this.#currentResult.concat(response.data.hits);
        }).catch((response) => {
            this.#currentPage--;
            return Promise.reject(response.statusText ? response.statusText : response);
        });

        return Promise.resolve(this);
    }
}

export default Api;
