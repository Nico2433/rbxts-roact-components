import type { ReactComponent } from ".";

interface ReactFrameComponent<T extends GuiObject> extends ReactComponent<T> {}

export interface ReactFrame extends ReactFrameComponent<Frame>, React.InstanceProps<Frame> {}

export interface ReactScrollingFrame extends ReactFrameComponent<ScrollingFrame>, React.InstanceProps<ScrollingFrame> {}

export interface ReactVideoFrame extends ReactFrameComponent<VideoFrame>, React.InstanceProps<VideoFrame> {}

export interface ReactViewPortFrame extends ReactFrameComponent<ViewportFrame>, React.InstanceProps<ViewportFrame> {}
