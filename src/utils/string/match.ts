// *-------------- MATCH ALL --------------* //

export const matchAllString = (text: string, patterns: string | string[]) => {
	if (typeIs(patterns, "string")) {
		const match = text.gmatch(patterns);
		return cycleStringMatch(match);
	} else {
		const matches: string[] = [];

		patterns.forEach((pattern) => {
			const match = text.gmatch(pattern);
			const got = cycleStringMatch(match);

			got.forEach((result) => {
				matches.push(result);
			});
		});

		return matches;
	}
};

const cycleStringMatch = (match: IterableFunction<LuaTuple<(string | number)[]>>) => {
	const matches: string[] = [];

	let stop = 0;
	while (stop === 0) {
		const value = match()[0];
		if (typeIs(value, "string")) {
			matches.push(value);
		} else {
			stop = 1;
		}
	}

	return matches;
};

// *-------------- MATCH ONE --------------* //

export const matchString = (text: string, patterns: string | string[]) => {
	if (typeIs(patterns, "string")) {
		const match = text.match(patterns)[0];
		if (typeIs(match, "string")) return match;
	} else {
		for (const pattern of patterns) {
			const match = text.match(pattern)[0];
			if (typeIs(match, "string")) return match;
		}
	}
};
