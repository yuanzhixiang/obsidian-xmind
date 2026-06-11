import nativeViewerAppJs from './native-viewer-app.ts?appbundle';

export interface ViewerResourceManifest {
    css: string[];
    scripts: string[];
    manifests: Record<string, string>;
    chunks: Record<string, string>;
}

export const viewerResourceManifest: ViewerResourceManifest = {
    css: [],
    scripts: [nativeViewerAppJs],
    manifests: {},
    chunks: {},
};
