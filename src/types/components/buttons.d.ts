import type { ReactComponent, ReactImageComponent, ReactTextComponent } from ".";

export interface ReactButtonComponent<T extends GuiButton> extends ReactComponent<T> {
	onClick?: (rbx: T) => void;
}

export interface ReactTextButton extends ReactButtonComponent<TextButton>, ReactTextComponent<TextButton> {}

export interface ReactImageButton extends ReactButtonComponent<ImageButton>, ReactImageComponent<ImageButton> {}
