import bootstrapCss from '../xmind-viewer-assets/mirror/assets.xmind.net/www/assets/vendor/css/bootstrap-customized-f152a280ef.min.css?raw';
import webUiKitIconsCss from '../xmind-viewer-assets/mirror/assets.xmind.net/web-ui-kit/icons/1.22.2/style.css?raw';
import indexCss from '../xmind-viewer-assets/mirror/assets.xmind.net/www/styles/index-141fccded4.css?raw';
import shareEmbedCss from '../xmind-viewer-assets/mirror/assets.xmind.net/www/styles/pages/share-embed-c84652b8d1.css?raw';

import viewerRuntimeJs from './runtime.cjs?bundle';
import shareEmbedJs from '../xmind-viewer-assets/mirror/assets.xmind.net/www/javascripts/share-embed.2d8410315a.js?raw';

import snowbrushChunkJs from '../xmind-viewer-assets/mirror/assets.xmind.net/www/javascripts/73350.03dd088904.parts?xmindchunk';
import enCommonChunkJs from '../xmind-viewer-assets/mirror/assets.xmind.net/www/javascripts/en.common.368d04a5fc.js?raw';
import enShareChunkJs from '../xmind-viewer-assets/mirror/assets.xmind.net/www/javascripts/en.share.8c70790f45.js?raw';
import enFormChunkJs from '../xmind-viewer-assets/mirror/assets.xmind.net/www/javascripts/en.form.44061827e8.js?raw';
import enErrorChunkJs from '../xmind-viewer-assets/mirror/assets.xmind.net/www/javascripts/en.error.511dc1c429.js?raw';

import snowbrushJs from '../xmind-viewer-assets/mirror/assets.xmind.net/www/assets/vendor/js/snowbrush.js?raw';
import structureAnimationGif from '../xmind-viewer-assets/mirror/assets.xmind.net/www/assets/videos/animate/structure-loading-animate-08d3b453a2.gif?dataurl';
import structureAnimationVideo from '../xmind-viewer-assets/mirror/assets.xmind.net/www/assets/videos/animate/structure-loading-animate-ec6aa8c56e.mp4?dataurl';
import facebookIcon from '../xmind-viewer-assets/mirror/assets.xmind.net/www/assets/images/share/facebook-icon-7018f49319.svg?dataurl';
import linkedinIcon from '../xmind-viewer-assets/mirror/assets.xmind.net/www/assets/images/share/linkedin-icon-b71dc66ddd.svg?dataurl';
import twitterIcon from '../xmind-viewer-assets/mirror/assets.xmind.net/www/assets/images/share/twitter-icon-11380ffc4e.svg?dataurl';
import xmindLogo from '../xmind-viewer-assets/mirror/assets.xmind.net/www/assets/images/share/xmind-b6f6b3ca68.svg?dataurl';

export interface ViewerResourceManifest {
    css: string[];
    scripts: string[];
    manifests: Record<string, string>;
    chunks: Record<string, string>;
}

export const viewerResourceManifest: ViewerResourceManifest = {
    css: [bootstrapCss, webUiKitIconsCss, indexCss, shareEmbedCss],
    scripts: [viewerRuntimeJs, shareEmbedJs],
    manifests: {
        snowbrush: snowbrushJs,
        structureAnimationGIF: structureAnimationGif,
        structureAnimationVideo,
        facebookIcon,
        linkedinIcon,
        twitterIcon,
        xmindLogo,
    },
    chunks: {
        'javascripts/73350.03dd088904.js': snowbrushChunkJs,
        'javascripts/en.common.368d04a5fc.js': enCommonChunkJs,
        'javascripts/en.share.8c70790f45.js': enShareChunkJs,
        'javascripts/en.form.44061827e8.js': enFormChunkJs,
        'javascripts/en.error.511dc1c429.js': enErrorChunkJs,
    },
};
