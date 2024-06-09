import type React from "@rbxts/react";

export type ComponentType = keyof JSX.IntrinsicElements;
export type ComponentProps<T extends ComponentType> = JSX.IntrinsicElements[T];

export interface ReactComponent<T extends GuiObject | Instance = GuiObject> {
	children?: React.ReactNode;
	forwardRef?: React.RefObject<T>;
	name?: string;
	className?: string;
	onHover?: (isHovering: boolean, rbx: T, x: number, y: number) => void;
}

export interface ReactTextComponent<T extends GuiObject | Instance = GuiObject> extends ReactComponent<T> {
	text?: string;
}

export interface ReactImageComponent<T extends GuiObject | Instance = GuiObject> extends ReactComponent<T> {
	src: string;
}

export interface ReactVideoComponent<T extends GuiObject | Instance = GuiObject> extends ReactComponent<T> {
	src: VideoFrame["Video"];
	volume: VideoFrame["Volume"];
}

export * from "./buttons";
export * from "./className";
export * from "./frame";
export * from "./inputs";
export * from "./labels";
