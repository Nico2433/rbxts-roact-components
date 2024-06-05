import type React from "@rbxts/react";

export type ComponentType = keyof JSX.IntrinsicElements;
export type ComponentProps<T extends ComponentType> = JSX.IntrinsicElements[T];

export interface Position {
	x: number;
	y: number;
}

export interface ReactComponent<T extends GuiObject | Instance = GuiObject> {
	children?: React.ReactNode;
	visible?: boolean;
	forwardRef?: React.RefObject<T>;
	autoSize?: "X" | "Y" | "XY";
	anchorPoint?: Partial<Position>;
	className?: string;
	onHover?: (isHovering: boolean, rbx: T, x: number, y: number) => void;
}

export * from "./classNames";
export * from "./frame";
