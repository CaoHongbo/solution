<!-- # Programming Assignments

The folder includes:

- [./Asynchronous_programming.md](./Asynchronous_programming.md)

problems. Please, implement all the tasks and send us the results for review.

# Asynchronous programming

Design a component (a `function` or a `class`) that accepts an array of URLs and allows to fetch multiple resources in parallel, returning their `.text` representation. Provide a parameter so that the caller can limit the number of concurrent fetches run in parallel. A minimal interface for such a component could be the following

```tsx
async function runInParallel(
  urls: string[],
  concurrency: number
): Promise<string[]> {
  // ...
}
```

Important questions to consider: -->

# Solution

- Main logic code `runInParallel` component is in `index.ts`
- How would you test the solution? A: it's in `test` folder
- Is the solution able to cover any possible cases? A: yes, plz have a look at test case
- Is it optimal? A: yes, almost optimal

# How to test

```
npm install
npm test
```

![](assets/WX20220724-223231%402x.png)
