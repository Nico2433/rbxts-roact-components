import { ReactInput } from "../../types";

export const getInputProps = <T extends GuiObject>({ placeholder }: ReactInput<T>) => {
	return {
		PlaceholderText: placeholder,
	};
};
