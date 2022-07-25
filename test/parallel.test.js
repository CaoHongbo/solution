const { runInParallel } = require("../index");

// const urls = [
//   "http://www.google.com?no=1&time=200",
//   "http://www.google.com?no=2&time=200",
//   "http://www.google.com?no=3&time=200",
//   "http://www.google.com?no=4&time=200",
//   "http://www.google.com?no=5&time=200",
//   "http://www.google.com?no=6&time=200",
//   "http://www.google.com?no=7&time=200",
//   "http://www.google.com?no=8&time=200",
//   "http://www.google.com?no=9&time=200",
//   "http://www.google.com?no=10&time=200",
//   "http://www.google.com?no=11&time=200",
// ];

it("runInParallel empty urls", async () => {
  expect.assertions(1);
  const data = await runInParallel([], 5);
  expect(data.length).toBe(0);
});

it("runInParallel urls < concurrency OR urls >= concurrency", async () => {
  expect.assertions(2);
  const urls = [
    "http://www.google.com?no=1&time=200",
    "http://www.google.com?no=2&time=200",
    "http://www.google.com?no=3&time=200",
  ];
  const data = await runInParallel(urls, 5);
  expect(data.length).toBe(urls.length);

  const urls1 = [
    "http://www.google.com?no=1&time=200",
    "http://www.google.com?no=2&time=200",
    "http://www.google.com?no=3&time=200",
    "http://www.google.com?no=4&time=200",
    "http://www.google.com?no=5&time=200",
    "http://www.google.com?no=6&time=200",
  ];
  const data1 = await runInParallel(urls1, 4);
  expect(data1.length).toBe(urls1.length);
});

it("runInParallel 1->3->4->5->2->6", async () => {
  expect.assertions(2);
  const urls = [
    "http://www.google.com?no=1&time=100",
    "http://www.google.com?no=2&time=500",
    "http://www.google.com?no=3&time=150",
    "http://www.google.com?no=4&time=100",
    "http://www.google.com?no=5&time=200",
    "http://www.google.com?no=6&time=600",
  ];
  const data = await runInParallel(urls, 3);
  // console.dir(data);
  expect(data.length).toBe(urls.length);
  expect(
    parseInt(data[0]) < parseInt(data[2]) &&
      parseInt(data[2]) < parseInt(data[3]) &&
      parseInt(data[3]) < parseInt(data[4]) &&
      parseInt(data[4]) < parseInt(data[1]) &&
      parseInt(data[1]) < parseInt(data[5])
  ).toBe(true);
});

it("runInParallel fetched error", async () => {
  expect.assertions(2);
  const urls = [
    "http://www.google.com?no=1&time=100&error=1",
    "http://www.google.com?no=2&time=500",
    "http://www.google.com?no=3&time=150",
    "http://www.google.com?no=4&time=300",
    "http://www.google.com?no=5&time=120",
    "http://www.google.com?no=6&time=500",
  ];
  const data = await runInParallel(urls, 3);
  // console.dir(data);

  // terminal other operations
  expect(urls.length > data.length).toBe(true);

  expect(data[0]).toBe("");
});
