import type { ReactComponent } from ".";

interface ReactFrameBase<T extends GuiObject> extends ReactComponent<T> {}

export interface ReactFrame extends ReactFrameBase<Frame> {}
