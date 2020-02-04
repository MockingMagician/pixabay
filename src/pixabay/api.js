import axios from 'axios';

class Api {

    #apiKey;
    #currentResult = [];
    #currentSearch = null;
    #currentPage = 1;
    #getNextPageIsRunning = false;

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
        if (this.#getNextPageIsRunning) {
            return;
        }
        if (!this.#currentSearch) {
            this.#getNextPageIsRunning = false;
            return Promise.reject('Can not get the next page of nothing!');
        }
        this.#getNextPageIsRunning = true;
        await axios.get(this.#currentSearch + '&page=' + (++this.#currentPage)).then((response) => {
            if (!response.data.hits) {
                this.#currentPage--;
                this.#getNextPageIsRunning = false;
                throw 'hits key should exist on response.data';
            }

            this.#currentResult = this.#currentResult.concat(response.data.hits.filter((hit) => {
                for (let current of this.#currentResult) {
                    if (hit.id === current.id) {
                        return false;
                    }
                }

                return true;
            }))
        }).catch((response) => {
            this.#getNextPageIsRunning = false;
            this.#currentPage--;
            return Promise.reject(response);
        });

        this.#getNextPageIsRunning = false;
        return Promise.resolve(this);
    }
}

export default Api;
