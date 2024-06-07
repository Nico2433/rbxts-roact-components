export const getPercentageNumber = (text: string) => {
	return tonumber(text.gsub("%%", "")[0]);
};

export const getPercentageFromFraction = (text: string) => {
	const [a, b] = text.split("/");
	const numberA = tonumber(a);
	const numberB = tonumber(b);
	if (!numberA || !numberB) throw error(`Cannot convert to number: ${text}`);

	return numberA / numberB;
};
