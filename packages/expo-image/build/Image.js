import React from 'react';
import { StyleSheet } from 'react-native';
import ExpoImage, { ExpoImageModule } from './ExpoImage';
import { resolveContentFit, resolveContentPosition, resolveTransition } from './utils';
import { resolveSources } from './utils/resolveSources';
let loggedDefaultSourceDeprecationWarning = false;
export class Image extends React.PureComponent {
    nativeViewRef;
    constructor(props) {
        super(props);
        this.nativeViewRef = React.createRef();
    }
    /**
     * Preloads images at the given urls that can be later used in the image view.
     * Preloaded images are always cached to the disk with the option of also
     * caching to memory.
     * @param urls - A url string or an array of urls of images to prefetch.
     * @param cachePolicy - The cache policy for pre-fetched images. Defaults to
     * disk
     * @return A promise resolving to `true` when the images have been prefetched.
     * If any of the images fail to be prefetched, the promise will resolve to
     * `false`.
     */
    static async prefetch(urls, cachePolicy) {
        return ExpoImageModule.prefetch(Array.isArray(urls) ? urls : [urls], cachePolicy);
    }
    /**
     * Cancels in progress prefetch requests.
     */
    static cancelPrefetch() {
        return ExpoImageModule.cancelPrefetch();
    }
    /**
     * Asynchronously clears all images stored in memory.
     * @platform android
     * @platform ios
     * @return A promise resolving to `true` when the operation succeeds.
     * It may resolve to `false` on Android when the activity is no longer available.
     * Resolves to `false` on Web.
     */
    static async clearMemoryCache() {
        return await ExpoImageModule.clearMemoryCache();
    }
    /**
     * Asynchronously clears all images from the disk cache.
     * @platform android
     * @platform ios
     * @return A promise resolving to `true` when the operation succeeds.
     * It may resolve to `false` on Android when the activity is no longer available.
     * Resolves to `false` on Web.
     */
    static async clearDiskCache() {
        return await ExpoImageModule.clearDiskCache();
    }
    /**
     * Asynchronously checks if an image exists in the disk cache and resolves to
     * the path of the cached image if it does.
     * @param cacheKey - The cache key for the requested image. Unless you have set
     * a custom cache key, this will be the source URL of the image.
     * @platform android
     * @platform ios
     * @return A promise resolving to the path of the cached image. It will resolve
     * to `null` if the image does not exist in the cache.
     */
    static async getCachePathAsync(cacheKey) {
        return await ExpoImageModule.getCachePathAsync(cacheKey);
    }
    /**
     * Asynchronously starts playback of the view's image if it is animated.
     * @platform android
     * @platform ios
     */
    async startAnimating() {
        await this.nativeViewRef.current.startAnimating();
    }
    /**
     * Asynchronously stops the playback of the view's image if it is animated.
     * @platform android
     * @platform ios
     */
    async stopAnimating() {
        await this.nativeViewRef.current.stopAnimating();
    }
    render() {
        const { style, source, placeholder, contentFit, contentPosition, transition, fadeDuration, resizeMode: resizeModeProp, defaultSource, loadingIndicatorSource, ...restProps } = this.props;
        const { resizeMode: resizeModeStyle, ...restStyle } = StyleSheet.flatten(style) || {};
        const resizeMode = resizeModeProp ?? resizeModeStyle;
        if ((defaultSource || loadingIndicatorSource) && !loggedDefaultSourceDeprecationWarning) {
            console.warn('[expo-image]: `defaultSource` and `loadingIndicatorSource` props are deprecated, use `placeholder` instead');
            loggedDefaultSourceDeprecationWarning = true;
        }
        return (<ExpoImage {...restProps} style={restStyle} source={resolveSources(source)} placeholder={resolveSources(placeholder ?? defaultSource ?? loadingIndicatorSource)} contentFit={resolveContentFit(contentFit, resizeMode)} contentPosition={resolveContentPosition(contentPosition)} transition={resolveTransition(transition, fadeDuration)} nativeViewRef={this.nativeViewRef}/>);
    }
}
//# sourceMappingURL=Image.js.map