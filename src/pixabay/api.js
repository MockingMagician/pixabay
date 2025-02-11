import $ from 'jquery'
import {ImageInfo, ImageInfoCollection} from '../models/ImageInfo'

window.imageInfoCollection = new ImageInfoCollection();

$.ajaxPrefilter(function(options) {
    if (options.crossDomain && $.support.cors) {
        // If you have a cors-anywhere server replace by your url
        // options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
    }
});

class OutOfRangeError extends Error {
}

class CorruptedDataError extends Error {
}

class UnknownError extends Error {
}

class Api {

    #apiKey;
    #currentResult = [];
    #currentSearch = null;
    #currentPage = 1;
    #searchIsRunning = false;
    #getNextPageIsRunning = false;
    #hasNextPage = true;

    get currentResult() {
        return this.#currentResult;
    }

    get hasNextPage() {
        return this.#hasNextPage;
    }

    /**
     * @param apiKey {string}
     */
    constructor(apiKey) {
        this.#apiKey = apiKey;
    }

    /**
     * @param urlEncodedString {string}
     * @return {Promise<Api>}
     * @throws OutOfRangeError|CorruptedDataError|Error
     */
    async searchImages(urlEncodedString) {
        if (this.#searchIsRunning) {
            return this;
        }
        this.#searchIsRunning = true;
        this.#hasNextPage = true;
        this.#currentPage = 1;
        this.#currentResult = [];
        this.#currentSearch = `https://pixabay.com/api/?key=${this.#apiKey}&q=${urlEncodedString}&image_type=photo`;
        let data = {};
        try {
            data = await $.get(this.#currentSearch);
        } catch (response) {
            this.#searchIsRunning = false;
            // Should not happen here, but who know ?
            if (response.responseText === '[ERROR 400] "page" is out of valid range.') {
                throw new OutOfRangeError();
            }
            //TODO Log all kinds and deal with it if new found
            throw new UnknownError(response.responseText);
        }
        if (!data.hits) {
            this.#searchIsRunning = false;
            throw new CorruptedDataError('hits key should exist on data');
        }
        data.hits.forEach((value) => {
           window.imageInfoCollection.add(new ImageInfo(value));
        });
        this.#currentResult = data.hits;
        this.#searchIsRunning = false;

        return this;
    }

    /**
     * @return {Promise<Api>}
     */
    async getNextPage() {
        if (this.#getNextPageIsRunning || !this.#hasNextPage) {
            return this;
        }
        if (!this.#currentSearch) {
            this.#getNextPageIsRunning = false;
            throw new Error('Can not get the next page of nothing!');
        }
        this.#getNextPageIsRunning = true;
        let data = {};
        try {
            data = await $.get(this.#currentSearch + '&page=' + (++this.#currentPage));
        } catch (response) {
            if (response.responseText === '[ERROR 400] "page" is out of valid range.') {
                this.#hasNextPage = false;
                throw new OutOfRangeError();
            }
            //TODO Log all kinds and deal with it if new found
            throw new UnknownError(response.responseText);
        }
        if (!data.hits) {
            this.#currentPage--;
            this.#getNextPageIsRunning = false;
            throw new CorruptedDataError('hits key should exist on data');
        }
        this.#currentResult = this.#currentResult.concat(data.hits.filter((hit) => {
            for (let current of this.#currentResult) {
                if (hit.id === current.id) {
                    return false;
                }
            }

            return true;
        }));

        this.#getNextPageIsRunning = false;

        return this;
    }
}

export {
    Api,
    CorruptedDataError,
    OutOfRangeError,
    UnknownError,
};
