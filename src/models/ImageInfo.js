import check from 'check-types';

class ImageDataError extends Error {
}

class ImageInfo {

    #id;
    #previewURL;
    #largeImageURL;
    #imageWidth;
    #imageHeight;
    #likes = 0;
    #views = 0;
    #tags = '';

    get id() {
        return this.#id;
    }
    get previewURL() {
        return this.#previewURL;
    }
    get largeImageURL() {
        return this.#largeImageURL;
    }
    get imageWidth() {
        return this.#imageWidth;
    }
    get imageHeight() {
        return this.#imageHeight;
    }
    get likes() {
        return this.#likes;
    }
    get views() {
        return this.#views;
    }
    get tags() {
        return this.#tags;
    }

    /**
     * @param imageData {Object}
     */
    constructor(imageData) {
        if (!check.object(imageData)) {
            throw new ImageDataError('imageData should be an object');
        }
        if (!check.nonEmptyString(imageData.previewURL)) {
            throw new ImageDataError(`imageData.previewURL should be a valid url string, given: ${imageData.previewURL}`);
        }
        if (!check.nonEmptyString(imageData.largeImageURL)) {
            throw new ImageDataError(`imageData.largeImageURL should be a valid url string, given: ${imageData.largeImageURL}`);
        }
        if (!(check.positive(imageData.imageWidth) && check.integer(imageData.imageWidth))) {
            throw new ImageDataError(`imageData.imageWidth should be a positive integer, given: ${imageData.imageWidth}`);
        }
        if (!(check.positive(imageData.imageHeight) && check.integer(imageData.imageHeight))) {
            throw new ImageDataError(`imageData.imageHeight should be a positive integer, given: ${imageData.imageHeight}`);
        }
        if (!check.integer(imageData.likes)) {
            imageData.likes = parseInt(imageData.likes, 10) || 0;
        }
        if (!check.integer(imageData.views)) {
            imageData.views = parseInt(imageData.views, 10) || 0;
        }
        if (!check.string(imageData.tags)) {
            imageData.tags = ''
        }

        this.#id = imageData.id;
        this.#previewURL = imageData.previewURL;
        this.#largeImageURL = imageData.largeImageURL;
        this.#imageWidth = imageData.imageWidth;
        this.#imageHeight = imageData.imageHeight;
        this.#likes = imageData.likes;
        this.#views = imageData.views;
        this.#tags = imageData.tags;
    }

}

class ImageInfoCollection {

    /**
     * @type {ImageInfo[]}
     */
    #collection = [];
    #i = 0;

    /**
     * @return {{next: next}}
     */
    [Symbol.iterator]() {
        return {
            next: () => {
                if (this.#collection.length >= this.#i) {
                    this.#i = 0;
                    return {done: true};
                }
                return {
                    done: false,
                    value: this.#collection[this.#i],
                };
            }
        };
    }

    get length() {
        return this.#i;
    }

    /**
     * @param imageInfo {ImageInfo}
     * @param checkDuplicate {boolean}
     */
    add(imageInfo, checkDuplicate = true) {
        if (checkDuplicate) {
            for (let current of this.#collection) {
                if (imageInfo.id === current.id) {
                    return;
                }
            }
        }
        this.#collection.push(imageInfo);
    }

    clear() {
        this.#collection = [];
    }

    /**
     * @param handler {function(ImageInfo)}
     */
    forEach(handler) {
        this.#collection.forEach(handler);
    }
}

export {
    ImageInfo,
    ImageInfoCollection,
};
