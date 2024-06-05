import { PaddingClassName } from "../../../types/components/classNames";

type Props = Partial<Pick<UIPadding, "PaddingTop" | "PaddingRight" | "PaddingBottom" | "PaddingLeft">>;

interface Params {
	apply: PaddingClassName;
	value: number;
}

export const getPaddingProps = ({ apply, value }: Params, props: Props) => {
	switch (apply) {
		case "p":
			{
				props.PaddingTop = new UDim(0, value);
				props.PaddingRight = new UDim(0, value);
				props.PaddingBottom = new UDim(0, value);
				props.PaddingLeft = new UDim(0, value);
			}
			break;

		case "px":
			{
				props.PaddingLeft = new UDim(0, value);
				props.PaddingRight = new UDim(0, value);
			}
			break;

		case "py":
			{
				props.PaddingTop = new UDim(0, value);
				props.PaddingBottom = new UDim(0, value);
			}
			break;

		case "pt":
			{
				props.PaddingTop = new UDim(0, value);
			}
			break;

		case "pr":
			{
				props.PaddingRight = new UDim(0, value);
			}
			break;

		case "pb":
			{
				props.PaddingBottom = new UDim(0, value);
			}
			break;

		case "pl":
			{
				props.PaddingLeft = new UDim(0, value);
			}
			break;
	}
};
