import {
    viewerResourceManifest,
    ViewerResourceManifest,
} from './resource-manifest';

export interface ViewerAssetUrls {
    css: string[];
    scripts: string[];
    manifests: Record<string, string>;
    chunks: Record<string, string>;
}

export function createTextAssetUrl(content: string, type: string): string {
    return URL.createObjectURL(new Blob([content], { type }));
}

export function createViewerAssetUrls(
    resources: ViewerResourceManifest = viewerResourceManifest
): ViewerAssetUrls {
    const chunks: Record<string, string> = {};
    for (const chunkPath of Object.keys(resources.chunks)) {
        chunks[chunkPath] = createTextAssetUrl(
            resources.chunks[chunkPath],
            'text/javascript'
        );
    }

    return {
        css: resources.css.map((css) => createTextAssetUrl(css, 'text/css')),
        scripts: resources.scripts.map((script) =>
            createTextAssetUrl(script, 'text/javascript')
        ),
        manifests: { ...resources.manifests },
        chunks,
    };
}

export function revokeViewerAssetUrls(assetUrls: ViewerAssetUrls): void {
    const chunkUrls = Object.keys(assetUrls.chunks).map(
        (key) => assetUrls.chunks[key]
    );

    for (const url of [
        ...assetUrls.css,
        ...assetUrls.scripts,
        ...chunkUrls,
        ...Object.values(assetUrls.manifests),
    ]) {
        if (url.startsWith('blob:')) {
            URL.revokeObjectURL(url);
        }
    }
}
