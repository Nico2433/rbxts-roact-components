import { ReactVideoComponent } from "../../types";

export const getVideoProps = <T extends GuiObject>({ src, volume }: ReactVideoComponent<T>) => {
	return {
		Video: src,
		Volume: volume,
	};
};
