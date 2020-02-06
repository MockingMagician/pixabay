class ScrollBarHelper {

    static hasVerticalScrollbar() {
        if (typeof window.innerWidth === 'number') {
            return window.innerWidth > document.documentElement.clientWidth;
        }

        let rootElem = document.documentElement || document.body;
        let overflowStyle;

        if (typeof rootElem.currentStyle !== 'undefined') {
            overflowStyle = rootElem.currentStyle.overflow;
        }

        overflowStyle = overflowStyle || window.getComputedStyle(rootElem, '').overflow;

        let overflowYStyle;

        if (typeof rootElem.currentStyle !== 'undefined') {
            overflowYStyle = rootElem.currentStyle.overflowY;
        }

        overflowYStyle = overflowYStyle || window.getComputedStyle(rootElem, '').overflowY;

        let contentOverflows = rootElem.scrollHeight > rootElem.clientHeight;
        let overflowShown    = /^(visible|auto)$/.test(overflowStyle) || /^(visible|auto)$/.test(overflowYStyle);
        let alwaysShowScroll = overflowStyle === 'scroll' || overflowYStyle === 'scroll';

        return (contentOverflows && overflowShown) || (alwaysShowScroll);
    }

}

export default ScrollBarHelper;
