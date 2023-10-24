import React from 'react';
import { ImageProps } from './Image.types';
export declare class Image extends React.PureComponent<ImageProps> {
    nativeViewRef: any;
    constructor(props: any);
    /**
     * Preloads images at the given urls that can be later used in the image view.
     * Preloaded images are always cached on the disk, so make sure to use
     * `disk` (default) or `memory-disk` cache policy.
     */
    static prefetch(urls: string | string[]): void;
    /**
     * Asynchronously clears all images stored in memory.
     * @platform android
     * @platform ios
     * @return A promise resolving to `true` when the operation succeeds.
     * It may resolve to `false` on Android when the activity is no longer available.
     * Resolves to `false` on Web.
     */
    static clearMemoryCache(): Promise<boolean>;
    /**
     * Asynchronously clears all images from the disk cache.
     * @platform android
     * @platform ios
     * @return A promise resolving to `true` when the operation succeeds.
     * It may resolve to `false` on Android when the activity is no longer available.
     * Resolves to `false` on Web.
     */
    static clearDiskCache(): Promise<boolean>;
    /**
     * Asynchronously starts playback of the view's image if it is animated.
     * @platform ios
     */
    startAnimating(): Promise<void>;
    /**
     * Asynchronously stops the playback of the view's image if it is animated.
     * @platform ios
     */
    stopAnimating(): Promise<void>;
    render(): JSX.Element;
}
//# sourceMappingURL=Image.d.ts.map