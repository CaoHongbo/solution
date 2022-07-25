import { mockFetch } from "./module/util";
/**
 * runInParallel
 * @param urls
 * @param concurrency
 * @returns Promise<String[]>
 */
async function runInParallel(
  urls: string[],
  concurrency: number
): Promise<string[]> {
  let results: string[] = [],
    promises = [],
    len = urls.length,
    isErrored = false,
    next = concurrency;

  async function each(i: number) {
    try {
      results[i] = await mockFetch(urls[i]);
    } catch (e) {
      isErrored = true; // global error, to terminate other async operation
      results[i] = "";
    } finally {
      if (!isErrored && next < len) {
        await each(next++);
      }
    }
  }

  // set concurrency
  for (let i = 0; i + 1 <= (concurrency < len ? concurrency : len); i++) {
    promises.push(each(i));
  }
  // run in parallel
  await Promise.all(promises);
  // return
  return Promise.resolve(results);
}

export { runInParallel };
