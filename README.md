# 🎄🗓️ Advent of code 2020

## FAQ

> These are mainly notes to my future self

Some of the solutions on the repo will look convoluted to you, and they might be. The decisions taken on solving the puzzles are so that I respect some self-imposing rules:

- Assume datasets might be **really** large
- Always keep [orders-of-growth](https://en.wikipedia.org/wiki/Analysis_of_algorithms#Orders_of_growth)/[Big O notation](https://en.wikipedia.org/wiki/Big_O_notation) when implementing a solution that requires iterating a collection.
- Despite optimizing for runtime, **keep the code understandable**

### Why do you use `readline` / `EventEmitter`/ streams?

From my experience on previous similar challenges, input files tend to grow larger in order to evaluate how the solution performs on larger datasets. This means that loading the full dataset into memory usually comes with a huge run duration impact, because your program is "frozen" until it has finished loading the whole dataset (which might be 20MBs, for example).

I **know** that AoC is not such a challenge because datasets are relatively small, but I'm self-imposing this requirement just to keep the challenge interesting.

By using a line file reader (which is the basic building block on every of the solutions), we are able to "start solving" the problem while the file is still being read, allowing us to potentially end "early" (before reading the whole file).

### Why do you always use lookup maps, sets or something similar?

When performing search tasks, is usually a good idea to do so, because it enables you to do a lot of work without the need for iterating a collection multiple times. Reasoning behind each one of these particular cases depend on the puzzle it self, but this is mainly to keep runtime as low as possible (but increasing the memory consumption).

### Other questions

Feel free to open an issue to discuss about any particular topic related with the solutions on this repo!

