export function rateLimit(options) {
  const tokenCache = new Map();

  return {
    check: (limit, token) => {
      const now = Date.now();
      const tokenCount = tokenCache.get(token) || [0];
      if (tokenCount[0] === 0) {
        tokenCache.set(token, [1, now]);
      } else {
        const timePassed = now - tokenCount[1];
        if (timePassed > options.interval) {
          tokenCache.set(token, [1, now]);
        } else {
          tokenCache.set(token, [tokenCount[0] + 1, tokenCount[1]]);
        }
      }

      const currentUsage = tokenCache.get(token)[0];
      const isRateLimited = currentUsage > limit;

      return new Promise((resolve, reject) => {
        if (isRateLimited) {
          reject('Rate limit exceeded');
        } else {
          resolve();
        }
      });
    },
  };
}
