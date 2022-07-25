import url from "url";
import qs from "querystring";

// mock fetch
export async function mockFetch(url: string): Promise<string> {
  // const r = random(100, 500);
  const urlObj = new URL(url);
  const no = urlObj.searchParams.get("no");
  const error = urlObj.searchParams.get("error");
  const time = parseInt(urlObj.searchParams.get("time"), 10);
  // console.log(time);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (error === "1") {
        // mock fetch err
        // logger error
        reject("error");
      } else {
        // mock fetch success
        const ts = new Date().getTime();
        // const res = `URL:${url} ---> at ${ts}ms fetched`;
        // const res = new Date().getTime();
        // console.log(res);
        resolve(String(ts));
      }
    }, time);
  });
}

// calc random in [min, max]  min & max is integer
const random = (min: number, max: number) => {
  return Math.round(Math.random() * (max - min + 1) + min);
};
