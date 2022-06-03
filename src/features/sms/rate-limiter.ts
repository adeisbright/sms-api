import tedis from "../../loaders/redis-loader";

/**
 * @description
 * Checks if a request has exceed the maximum
 * allowable request within a certain window(hours)
 * @param {String} from Request maker identifier
 * @param {Number} windowHour  Allowable request window in hours
 * @param {Number} maxRequest Allowable number of request per window
 * @returns {Number}
 * 0 Redis failed
 * 1 Operation completed
 * -1 Request exceeded
 */
const rateLimiter = async (
	from: string,
	windowHour = 24,
	maxRequest = 5
): Promise<number> => {
	const fromRateLimiterHash = await tedis.hget("ratelimiter", from);
	const date = new Date();
	date.setHours(date.getHours() + windowHour);
	const windowElapsedTime = date.getTime();

	if (!fromRateLimiterHash) {
		const rateLimiterObj = {
			endTime: windowElapsedTime,
			requestCount: 1
		};
		return await tedis.hset(
			"ratelimiter",
			from,
			JSON.stringify(rateLimiterObj)
		);
	}

	const { endTime, requestCount } = JSON.parse(fromRateLimiterHash);
	const currentTime = Date.now();

	if (endTime >= currentTime && requestCount < maxRequest) {
		const rateLimiterObj = {
			endTime,
			requestCount: requestCount + 1
		};
		return await tedis.hset(
			"ratelimiter",
			from,
			JSON.stringify(rateLimiterObj)
		);
	}

	if (currentTime > endTime) {
		const date = new Date();
		date.setHours(date.getHours() + windowHour);
		const endTime = date.getTime();

		const rateLimiterObj = {
			endTime,
			requestCount: 1
		};
		return await tedis.hset(
			"ratelimiter",
			from,
			JSON.stringify(rateLimiterObj)
		);
	}

	return -1;
};

export default rateLimiter;
