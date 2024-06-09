import type { ReactComponent, ReactVideoComponent } from ".";

interface ReactFrameBase<T extends GuiObject> extends ReactComponent<T> {}

export interface ReactFrame extends ReactFrameBase<Frame> {}

export interface ReactScrollingFrame extends ReactFrameBase<ScrollingFrame> {}

export interface ReactVideoFrame extends ReactFrameBase<VideoFrame>, ReactVideoComponent<VideoFrame> {}
