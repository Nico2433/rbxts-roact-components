import { ReactComponent } from ".";

export interface ReactInputComponent<T extends GuiObject = GuiObject> extends ReactComponent<T> {
	onChange?: (rbx: T) => void;
}

export interface ReactTextBox extends ReactInputComponent<TextBox>, React.InstanceProps<TextBox> {}
