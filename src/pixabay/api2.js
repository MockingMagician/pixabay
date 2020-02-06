import $ from 'jquery'
import {ImageInfo} from '../models/ImageInfo'

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
    #currentSearch;
    #currentPage;
    #searchIsRunning;
    #getNextPageIsRunning;
    #hasNextPage;

    get hasNextPage() {
        return this.#hasNextPage;
    }

    #init = () => {
        this.#currentSearch = null;
        this.#currentPage = 1;
        this.#searchIsRunning = false;
        this.#getNextPageIsRunning = false;
        this.#hasNextPage = true;
    };

    /**
     * @param apiKey {string}
     */
    constructor(apiKey) {
        this.#apiKey = apiKey;
        this.#init();
    }

    /**
     * @param urlEncodedString {string}
     * @param imageInfoCollection {ImageInfoCollection}
     * @return {Promise<Api>}
     * @throws OutOfRangeError|CorruptedDataError|Error
     */
    async searchImages(urlEncodedString, imageInfoCollection) {
        if (this.#searchIsRunning) {
            return this;
        }
        this.#init();
        imageInfoCollection.clear();
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
           imageInfoCollection.add(new ImageInfo(value));
        });
        this.#searchIsRunning = false;

        return this;
    }

    /**
     * @param imageInfoCollection {ImageInfoCollection}
     * @return {Promise<Api>}
     */
    async getNextPage(imageInfoCollection) {
        if (this.#getNextPageIsRunning || !this.#hasNextPage) {
            return this;
        }
        this.#getNextPageIsRunning = true;
        if (!this.#currentSearch) {
            this.#getNextPageIsRunning = false;
            return this;
        }
        let data = {};
        try {
            data = await $.get(this.#currentSearch + '&page=' + (++this.#currentPage));
        } catch (response) {
            if (response.responseText === '[ERROR 400] "page" is out of valid range.') {
                this.#currentPage--;
                this.#hasNextPage = false;
                this.#getNextPageIsRunning = false;
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
        data.hits.forEach((value) => {
            imageInfoCollection.add(new ImageInfo(value));
        });

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
