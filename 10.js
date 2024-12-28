const input = `....#.....#.#...##..........#.......#......
.....#...####..##...#......#.........#.....
.#.#...#..........#.....#.##.......#...#..#
.#..#...........#..#..#.#.......####.....#.
##..#.................#...#..........##.##.
#..##.#...#.....##.#..#...#..#..#....#....#
##...#.............#.#..........#...#.....#
#.#..##.#.#..#.#...#.....#.#.............#.
...#..##....#........#.....................
##....###..#.#.......#...#..........#..#..#
....#.#....##...###......#......#...#......
.........#.#.....#..#........#..#..##..#...
....##...#..##...#.....##.#..#....#........
............#....######......##......#...#.
#...........##...#.#......#....#....#......
......#.....#.#....#...##.###.....#...#.#..
..#.....##..........#..........#...........
..#.#..#......#......#.....#...##.......##.
.#..#....##......#.............#...........
..##.#.....#.........#....###.........#..#.
...#....#...#.#.......#...#.#.....#........
...####........#...#....#....#........##..#
.#...........#.................#...#...#..#
#................#......#..#...........#..#
..#.#.......#...........#.#......#.........
....#............#.............#.####.#.#..
.....##....#..#...........###........#...#.
.#.....#...#.#...#..#..........#..#.#......
.#.##...#........#..#...##...#...#...#.#.#.
#.......#...#...###..#....#..#...#.........
.....#...##...#.###.#...##..........##.###.
..#.....#.##..#.....#..#.....#....#....#..#
.....#.....#..............####.#.........#.
..#..#.#..#.....#..........#..#....#....#..
#.....#.#......##.....#...#...#.......#.#..
..##.##...........#..........#.............
...#..##....#...##..##......#........#....#
.....#..........##.#.##..#....##..#........
.#...#...#......#..#.##.....#...#.....##...
...##.#....#...........####.#....#.#....#..
...#....#.#..#.........#.......#..#...##...
...##..............#......#................
........................#....##..#........#`;

const testInput = `.#..#
.....
#####
....#
...##`;

// Find the asteroid that "sees" the most other asteroids. Can be blocked when there is another asteroid in the way.
// But watch out for like [6, 3] > [2, 1] sort of things. If asteroid is [6, 3] away, we need to check every [2, 1] after, not [6, 3].
const run = () => {
  const grid = input.split("\n").map((row) => row.split(""));
  const positions = [];
  grid.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell === "#") {
        positions.push([x, y]);
      }
    });
  });

  const numAsteroidsVisible = (position) => {
    // Iterate through all other asteroid positions. Assume we can add it.
    // Check through all SEEN ones and REMOVE them if they are blocked.

    // Or.... wait... can we just make a set of slopes...
    // Oh not quite... because left half of plane is getting ...same slopes...but are allowed....

    const [x1, y1] = position;
    const slopes = new Set();

    positions.forEach((otherPosition) => {
      const [x2, y2] = otherPosition;
      if (x1 === x2 && y1 === y2) {
        return;
      }

      const dx = x2 - x1;
      const dy = y2 - y1;

      // Ah ok, this was the fix!
      //   const slope = dy / dx;
      const slope = Math.atan2(dy, dx);

      slopes.add(slope);
    });

    // This size is all that matters; we get one representative of each angle, and that's it!
    return slopes.size;
  };

  let r = null;
  let max = 0;
  positions.forEach((position) => {
    const num = numAsteroidsVisible(position);
    if (num > max) {
      max = num;
      r = position;
    }
  });

  let result = positions.map(numAsteroidsVisible).sort();
  result = result[result.length - 1];
  console.log("Result", result, positions.length, r);
};

// =====================================================================================

const partTwo = () => {
  //   console.log(
  //     Math.atan2(1, 1),
  //     Math.atan2(1, 0),
  //     Math.atan2(0, 1),
  //     Math.atan2(-1, 0),
  //     Math.atan2(-1, -1),
  //     Math.atan2(0, -1),
  //     Math.atan2(1, -1),
  //     Math.atan2(1, 1)
  //   );

  // Ok so [0, 1] is 0, [1, 0] is Pi/2, [0, -1] is Pi, [-1, 0] is -Pi/2
  // We want to, if negative, take abs value and add Pi to it, to go full rotation. -- well not quite but almost..

  const grid = input.split("\n").map((row) => row.split(""));
  const positions = [];
  grid.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell === "#") {
        positions.push([x, y]);
      }
    });
  });

  // [30, 34] for real input
  //   const laser = [3, 4];
  const laser = [30, 34];
  const [x1, y1] = laser;

  const slopes = new Map();

  //   const positionsTest = [
  //     [4, 4],
  //     [3, 5],
  //     [2, 4],
  //     [3, 3],
  //   ];

  positions.forEach((otherPosition) => {
    const [x2, y2] = otherPosition;
    if (x1 === x2 && y1 === y2) {
      return;
    }

    const dx = x2 - x1;
    const dy = y2 - y1;

    let slope = Math.atan2(dy, dx);

    if (slope < 0) {
      slope = 2 * Math.PI - Math.abs(slope);
    }

    // Start at 12 o clock
    slope = (slope + Math.PI / 2) % (2 * Math.PI);

    slopes.set(slope, (slopes.get(slope) || []).concat(`${x2},${y2}`));
  });

  const sortedSlopes = Array.from(slopes.keys()).sort();

  Array.from(slopes.keys()).forEach((key) => {
    const asteroids = slopes.get(key);
    asteroids.sort((a, b) => {
      const [x, y] = a.split(",").map(Number);
      const [x2, y2] = b.split(",").map(Number);
      const d1 = Math.abs(y - laser[1]) + Math.abs(x - laser[0]);
      const d2 = Math.abs(y2 - laser[1]) + Math.abs(x2 - laser[0]);
      return d1 - d2;
    });
    slopes.set(key, asteroids);
  });

  console.log(slopes, sortedSlopes);

  // Ahhh right we also have to sort within each slope by distance to laser... OK..
  // Oh duh and we need to sort the slopes
  // And we have to find the laser first...
  //   const numAngles = slopes.size;

  //   // We need to find the 200th asteroid to be vaporized.
  //   const angleIdx = 8 % numAngles;
  //   const numCycles = Math.floor(8 / numAngles);

  //   const angle = sortedSlopes[angleIdx];
  //   const asteroids = slopes.get(angle);
  //   const asteroid = asteroids[numCycles];
  //   console.log("Result", asteroids, asteroid, slopes.size);

  let idx = 0;
  const target = 200;
  let result = null;
  while (idx < target) {
    const angle = sortedSlopes[idx % sortedSlopes.length];
    const asteroids = slopes.get(angle);
    if (asteroids.length === 0) {
      //   sortedSlopes.splice(idx % sortedSlopes.length, 1);
      continue;
    }
    result = asteroids.shift();
    idx++;
  }

  // Hey hey hey, that's right! Nice one!

  console.log("Result", result);
};

// Hmm... 338 is too low....
// run();

partTwo();
