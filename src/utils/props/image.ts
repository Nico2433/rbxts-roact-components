import { ReactImageComponent } from "../../types";

export const getImageProps = <T extends GuiObject>({ src }: ReactImageComponent<T>) => {
	return {
		Image: src,
	};
};
