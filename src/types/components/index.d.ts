import type React from "@rbxts/react";

export type ComponentType = keyof JSX.IntrinsicElements;
export type ComponentProps<T extends ComponentType> = JSX.IntrinsicElements[T];

export interface ReactComponent<T extends GuiObject | Instance = GuiObject> {
	children?: React.ReactNode;
	forwardRef?: React.RefObject<T>;
	className?: string;
	onHover?: (isHovering: boolean, rbx: T, x: number, y: number) => void;
}

export interface ReactTextComponent<T extends GuiObject = GuiObject> extends ReactComponent<T> {
	text?: string;
}

export * from "./className";
export * from "./frame";
export * from "./labels";
