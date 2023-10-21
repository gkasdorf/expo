import React from 'react';
import { StyleSheet } from 'react-native';

import ExpoImage, { ExpoImageModule } from './ExpoImage';
import { ImageProps } from './Image.types';
import { resolveContentFit, resolveContentPosition, resolveTransition } from './utils';
import { resolveSources } from './utils/resolveSources';

let loggedDefaultSourceDeprecationWarning = false;

export class Image extends React.PureComponent<ImageProps> {
  /**
   * Preloads images at the given urls that can be later used in the image view.
   * Preloaded images are always cached on the disk, so make sure to use
   * `disk` (default) or `memory-disk` cache policy.
   */
  static prefetch(urls: string | string[]): void {
    return ExpoImageModule.prefetch(Array.isArray(urls) ? urls : [urls]);
  }

  /**
   * Asynchronously clears all images stored in memory.
   * @platform android
   * @platform ios
   * @return A promise resolving to `true` when the operation succeeds.
   * It may resolve to `false` on Android when the activity is no longer available.
   * Resolves to `false` on Web.
   */
  static async clearMemoryCache(): Promise<boolean> {
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
  static async clearDiskCache(): Promise<boolean> {
    return await ExpoImageModule.clearDiskCache();
  }

  /**
   * Asynchronously checks if an image exists in the disk cache and resolves to
   * the path of the cached image if it does.
   * @platform ios
   * @return A promise resolving to the path of the cached image. It will resolve
   * to `false` if the image does not exist in the cache. Resolves to `false` on
   * Web.
   */
  static async getCachePath(url: string): Promise<string | false> {
    return await ExpoImageModule.getCachePath(url);
  }

  render() {
    const {
      style,
      source,
      placeholder,
      contentFit,
      contentPosition,
      transition,
      fadeDuration,
      resizeMode: resizeModeProp,
      defaultSource,
      loadingIndicatorSource,
      ...restProps
    } = this.props;

    const { resizeMode: resizeModeStyle, ...restStyle } = StyleSheet.flatten(style) || {};
    const resizeMode = resizeModeProp ?? resizeModeStyle;

    if ((defaultSource || loadingIndicatorSource) && !loggedDefaultSourceDeprecationWarning) {
      console.warn(
        '[expo-image]: `defaultSource` and `loadingIndicatorSource` props are deprecated, use `placeholder` instead'
      );
      loggedDefaultSourceDeprecationWarning = true;
    }

    return (
      <ExpoImage
        {...restProps}
        style={restStyle}
        source={resolveSources(source)}
        placeholder={resolveSources(placeholder ?? defaultSource ?? loadingIndicatorSource)}
        contentFit={resolveContentFit(contentFit, resizeMode)}
        contentPosition={resolveContentPosition(contentPosition)}
        transition={resolveTransition(transition, fadeDuration)}
      />
    );
  }
}
