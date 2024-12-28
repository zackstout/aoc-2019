// const { intCode } = require("./intCode.js");

// const test = `1,9,10,3,
// 2,3,11,0,
// 99,
// 30,40,50`;
// const program = test.split(",").map((x) => parseInt(x, 10));
// console.log(intCode(program));

const intCode = (program, inputs, idx = 0) => {
  let i = idx;
  // let times = 0;
  while (i < program.length) {
    // times++;
    // Support parameter modes: 0 is position mode, 1 is immediate mode
    // Last two digits of the instruction indicate the opcode
    const padZeroes = (str) => "000" + str;
    let opCode = parseInt(padZeroes(program[i]).toString().slice(-2), 10);

    // console.log(opCode);
    // let opCode = program[i];
    if (opCode === 99) {
      //   console.log("BREAK");
      return { idx: i, output: undefined, inputs };
    }
    // Op code will be either 1 or 2. 1 is addition, 2 is multiplication.
    const modes = program[i].toString().slice(0, -2).split("").reverse();

    const mode1 = modes[0] ? parseInt(modes[0], 10) : 0;
    const mode2 = modes[1] ? parseInt(modes[1], 10) : 0;

    let input1 = mode1 ? program[i + 1] : program[program[i + 1]];
    let input2 = mode2 ? program[i + 2] : program[program[i + 2]];

    // The third parameter is always in position mode
    let outputIndex = program[i + 3];

    if (opCode === 1) {
      program[outputIndex] = input1 + input2;
      i += 4;
    } else if (opCode === 2) {
      program[outputIndex] = input1 * input2;
      i += 4;
    } else if (opCode === 3) {
      // Input
      program[program[i + 1]] = inputs.shift(); // SOME INPUT(s)
      i += 2;
    } else if (opCode === 4) {
      // Output
      const value = mode1 ? program[i + 1] : program[program[i + 1]];
      // console.log("OUTPUT", value);

      // For this, day 7, we do want to return here, I think
      // NOTE: WE ARE CHANGING THIS FOR PART TWO -- ahhh  of course must return i+2, not i
      return { idx: i + 2, output: value, inputs };
      // return program;
      i += 2;
    } else if (opCode === 5) {
      // Jump if true
      if (input1 !== 0) {
        i = input2;
      } else {
        i += 3;
      }
    } else if (opCode === 6) {
      // Jump if false
      if (input1 === 0) {
        i = input2;
      } else {
        i += 3;
      }
    } else if (opCode === 7) {
      // Less than
      program[outputIndex] = input1 < input2 ? 1 : 0;
      i += 4;
    } else if (opCode === 8) {
      // Equals
      program[outputIndex] = input1 === input2 ? 1 : 0;
      i += 4;
    }
  }
  return { idx: i, output: undefined };
};

const ex = "3,15,3,16,1002,16,10,16,1,16,15,15,4,15,99,0,0";
const ex2 =
  "3,23,3,24,1002,24,10,24,1002,23,-1,23,101,5,23,23,1,24,23,23,4,23,99,0,0";

const real = `3,8,1001,8,10,8,105,1,0,0,21,42,55,76,89,114,195,276,357,438,99999,3,9,1001,9,3,9,1002,9,3,9,1001,9,3,9,1002,9,2,9,4,9,99,3,9,102,2,9,9,101,5,9,9,4,9,99,3,9,102,3,9,9,101,5,9,9,1002,9,2,9,101,4,9,9,4,9,99,3,9,102,5,9,9,1001,9,3,9,4,9,99,3,9,1001,9,4,9,102,5,9,9,1001,9,5,9,1002,9,2,9,101,2,9,9,4,9,99,3,9,101,1,9,9,4,9,3,9,101,1,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,1001,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,2,9,4,9,99,3,9,1001,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,101,1,9,9,4,9,3,9,1002,9,2,9,4,9,99,3,9,102,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,101,2,9,9,4,9,99,3,9,1002,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,1001,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,1,9,4,9,99,3,9,1001,9,1,9,4,9,3,9,101,1,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,101,2,9,9,4,9,99`;
// For each permutation of 01234, run the intCode program with the phases as inputs
// First input will be 0, the rest will be the output of the previous run
// Second input will be phase setting.

// Hmmm, so for this version of intCode, we DO want to return when we hit an output....

const permutations = (n) => {
  let result = [];
  if (n === 1) return ["0", "1", "2", "3", "4"];
  let prev = permutations(n - 1);
  for (let i = 0; i < prev.length; i++) {
    for (let j = 0; j < 5; j++) {
      // Ahh yeah, no dupes!
      if (prev[i].includes(j)) continue;
      result.push(prev[i] + j);
    }
  }
  return result;
};

const run = () => {
  //   const permutation = "01234";

  //   console.log(permutations(3));

  const allPermutations = permutations(5);

  let max = 0;

  allPermutations.forEach((permutation) => {
    // console.log("perm", permutation);

    // if (idx > 10) return;
    const phases = permutation.split("").map((x) => parseInt(x, 10));
    let output = 0;
    phases.forEach((phase) => {
      output = intCode(
        real.split(",").map((x) => parseInt(x, 10)),
        [phase, output]
      ).output;
    });
    // console.log(output);
    if (output > max) max = output;
  });

  return max;
};

// const max = run();
// console.log(max);

// =====================================================================================

// Ah yeah ok part 2 is trickier because all of them need to running at same time...
// Waiting for and sending each other signals...
// First input is phase setting, but then after that you need to wait for new inputs...

// In part 1, first input is phase, second input is cycling output (starts at 0).
// In part 2.. first input to each amp is again the phase, and all subsequent ones are the output of the previous amp.
// So... we need to keep track of the state of each amp, and then run them all in parallel...
// And then we need to keep track of the output of the last amp...

// So Amp A will need to output something after receiving 0 as input... otherwise it can't do anything.
// Amp B could then receive that output, and now it has 2 inputs. It can output something after 1 or 2 inputs I guess.
// But that would be a boring loop. So we could mostly assume it will consume both... but whatever.

const partTwoEval = (p, perm) => {
  const amps = {
    0: {
      program: p.split(",").map((x) => parseInt(x, 10)),
      inputs: [perm[0], 0],
      i: 0,
      output: 0,
    },
    1: {
      program: p.split(",").map((x) => parseInt(x, 10)),
      inputs: [perm[1]],
      i: 0,
      output: 0,
    },
    2: {
      program: p.split(",").map((x) => parseInt(x, 10)),
      inputs: [perm[2]],
      i: 0,
      output: 0,
    },
    3: {
      program: p.split(",").map((x) => parseInt(x, 10)),
      inputs: [perm[3]],
      i: 0,
      output: 0,
    },
    4: {
      program: p.split(",").map((x) => parseInt(x, 10)),
      inputs: [perm[4]],
      i: 0,
      output: 0,
    },
  };

  let ampIdx = 0;
  let times = 0;
  while (true) {
    times++;
    let { program, inputs, i } = amps[ampIdx];
    const { idx, output } = intCode(program, inputs, i);
    if (output === undefined) {
      break;
    }
    amps[ampIdx].output = output;
    amps[ampIdx].i = idx;
    // amps[ampIdx].inputs = newInputs;
    ampIdx = (ampIdx + 1) % 5;
    // console.log(
    //   "ampidx",
    //   ampIdx,
    //   amps[ampIdx].inputs,
    //   amps[ampIdx].output,
    //   amps[ampIdx].i
    // );
    amps[ampIdx].inputs.push(output);
  }
  return amps[4].output;
};

const ex3 =
  "3,26,1001,26,-4,26,3,27,1002,27,2,27,1,27,26,27,4,27,1001,28,-1,28,1005,28,6,99,0,0,5";
// console.log(
//   partTwoEval(
//     ex3,
//     "98765".split("").map((x) => parseInt(x, 10))
//   )
// );

const partTwo = () => {
  const allPermutations = permutations(5);

  let max = 0;

  allPermutations.forEach((permutation) => {
    const output = partTwoEval(
      real,
      permutation.split("").map((x) => parseInt(x, 10) + 5)
    );
    // console.log(output);
    if (output > max) max = output;
  });

  return max;
};

// AHA! FINALLY GOT THERE BB
console.log(partTwo());
