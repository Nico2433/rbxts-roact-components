import type { ReactComponent } from ".";

export interface ReactButtonComponent<T extends GuiButton> extends ReactComponent<T> {
	onClick?: (rbx: T) => void;
}

export interface ReactTextButton extends ReactButtonComponent<TextButton>, React.InstanceProps<TextButton> {}

export interface ReactImageButton extends ReactButtonComponent<ImageButton>, React.InstanceProps<ImageButton> {}
