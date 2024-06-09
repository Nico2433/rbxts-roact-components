import { ReactTextComponent } from ".";

export interface ReactInput<T extends GuiObject> extends ReactTextComponent<T> {
	placeholder?: string;
	onChange?: (rbx: TextBox) => void;
}
