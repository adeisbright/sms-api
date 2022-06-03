import tedis from "../../loaders/redis-loader";

/**
 *
 * @description
 * Checks if a given text is one of the cacheable text.
 * If it is, it uses the from and to field to create a redis key.
 * The key is set to expire after 4 hours
 * @param text
 * @param from
 * @param to
 * @returns
 */
const stopTextChecker = async (
	text: string,
	from: string,
	to: string,
	ttL = 14400
) => {
	const cacheableText = ["STOP", "STOP\n", "STOP\r", "STOP\r\n"];
	if (cacheableText.indexOf(text) !== -1) {
		const key = `${from}:${to}`;
		await tedis.set(key, text);
		await tedis.expire(key, ttL);
		return;
	}
	return;
};

export default stopTextChecker;
