// Ahh... the moons.

// So part of the idea here is you only have to store the initial state and see when that gets repeated.
// You can't get a loop later, because that would mean 2 states leading to the same state, which can't happen here (it's invertible).
// The other idea is that you can just do each axis independently, and then find the LCM of the periods of each axis.
// So... let's do that.

const ex = `<x=-1, y=0, z=2>
<x=2, y=-10, z=-7>
<x=4, y=-8, z=8>
<x=3, y=5, z=-1>`;

const exParse = [
  [-1, 0, 2],
  [2, -10, -7],
  [4, -8, 8],
  [3, 5, -1],
];

const real = `<x=13, y=-13, z=-2>
<x=16, y=2, z=-15>
<x=7, y=-18, z=-12>
<x=-3, y=-8, z=-8>`;

const realParse = [
  [13, -13, -2],
  [16, 2, -15],
  [7, -18, -12],
  [-3, -8, -8],
];

const getPeriod = (input, axis = 0) => {
  const velocities = new Array(input.length).fill(0);
  const xPositions = input.map((x) => x[axis]);
  // What we will test against
  const xInitial = xPositions.slice();
  let xPeriod = 0;
  let xSteps = 0;
  while (xPeriod === 0) {
    xSteps++;
    for (let i = 0; i < xPositions.length; i++) {
      // Start at j=i because we don't need to compare the same pair twice
      // Ahhh no nevermind because we're only updating one side. Got it.
      for (let j = 0; j < xPositions.length; j++) {
        if (i === j) continue;
        if (xPositions[i] < xPositions[j]) velocities[i]++;
        if (xPositions[i] > xPositions[j]) velocities[i]--;
      }
    }
    for (let i = 0; i < xPositions.length; i++) {
      xPositions[i] += velocities[i];
    }
    if (
      xPositions.join("") === xInitial.join("") &&
      velocities.join("") === "0".repeat(velocities.length)
    ) {
      xPeriod = xSteps;
    }
  }
  return xPeriod;
};

const gcd = (a, b) => {
  if (b === 0) return a;
  return gcd(b, a % b);
};

const lcm = (a, b) => {
  return (a * b) / gcd(a, b);
};

const run = (input) => {
  const x = getPeriod(input, 0);
  const y = getPeriod(input, 1);
  const z = getPeriod(input, 2);
  //   return [x, y, z];

  // Ahhhh of course we need to apply it twice!
  return lcm(x, lcm(y, z));
};

// YASSS 295_693_702_908_636 is right lol
console.log(run(realParse));
