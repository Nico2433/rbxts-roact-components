import { ReactButtonComponent, ReactComponent, ReactInputComponent } from "../../types";

type CustomProps = ReactComponent & ReactButtonComponent & ReactInputComponent;
type DeleteProps = keyof CustomProps;

export const deleteDefaultProps = (props: { [key: string]: any }) => {
	const deleteProps: DeleteProps[] = ["className", "forwardRef", "onClick", "onHover", "onChange"];

	deleteProps.forEach((prop) => {
		if (props[prop]) delete props[prop];
	});
};
