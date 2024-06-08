import { matchString } from "../../string";

export const getClassName = (className: string, patterns: string | string[], excludePatterns?: string | string[]) => {
	const parts = className.split(" ");
	const matches: string[] = [];
	const patternString = typeIs(patterns, "string");

	parts.forEach((part) => {
		if (patternString) {
			let match = part.match(patterns)[0] ? part : undefined;

			if (match) {
				if (excludePatterns) {
					const exclude = matchString(match, excludePatterns);
					if (exclude) match = undefined;
				}

				if (match) matches.push(match);
			}
		} else {
			let match: string | undefined = undefined;

			patterns.forEach((pattern) => {
				if (part.match(pattern)[0]) match = part;
				if (match && excludePatterns) {
					const exclude = matchString(match, excludePatterns);
					if (exclude) match = undefined;
				}
			});

			if (match) matches.push(match);
		}
	});

	return matches;
};
