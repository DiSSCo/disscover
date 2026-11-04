type OsdOptions = {
    tileSources?: {
        type: string
        url: string
    },
    prefixUrl?: string
    showNavigationControl?: boolean,
    defaultZoomLevel?: number,
    minZoomLevel?: number,
    maxZoomLevel?: number,
    visibilityRatio?: number,
    constrainDuringPan?: boolean,
    homeFillsViewer?: boolean,
    gestureSettingsMouse?: {
        clickToZoom: boolean,
        dblClickToZoom: boolean,
    },
    gestureSettingsPen?: {
        clickToZoom: boolean,
        dblClickToZoom: boolean,
    },
    gestureSettingsTouch?: {
        clickToZoom: boolean,
        pinchToZoom: boolean,
    }
}

export type { OsdOptions };