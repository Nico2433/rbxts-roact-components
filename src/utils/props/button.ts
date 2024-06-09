import { ReactButtonComponent } from "../../types";

export const getButtonProps = <T extends GuiButton>({ onClick }: ReactButtonComponent<T>) => {
	return {
		Event: {
			...(onClick && { MouseButton1Click: onClick }),
		},
	};
};
