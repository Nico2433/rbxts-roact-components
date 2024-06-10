import { ReactComponent } from ".";

export interface ReactTextBox<T extends GuiObject> extends ReactComponent<T>, React.InstanceProps<TextBox> {
	onChange?: (rbx: TextBox) => void;
}
