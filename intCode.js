// This is from Day 2 -- we also need Day 5 in order to complete Day 7
// yes we got Day 5 working!!!
// Omfg there's a Day 5 part 2 lol -- Ok got it.

const intCode = (program, inputs) => {
  let i = 0;
  // let times = 0;
  while (i < program.length) {
    // times++;
    // Support parameter modes: 0 is position mode, 1 is immediate mode
    // Last two digits of the instruction indicate the opcode
    const padZeroes = (str) => "000" + str;
    let opCode = parseInt(padZeroes(program[i]).toString().slice(-2), 10);

    // console.log(opCode);
    // let opCode = program[i];
    if (opCode === 99) break;
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
      console.log("OUTPUT", value);
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
  return program;
};

// Ok, seems to be working
const test = `1,0,0,3,1,1,2,3,1,3,4,3,1,5,0,3,2,9,1,19,1,19,5,23,1,23,6,27,2,9,27,31,1,5,31,35,1,35,10,39,1,39,10,43,2,43,9,47,1,6,47,51,2,51,6,55,1,5,55,59,2,59,10,63,1,9,63,67,1,9,67,71,2,71,6,75,1,5,75,79,1,5,79,83,1,9,83,87,2,87,10,91,2,10,91,95,1,95,9,99,2,99,9,103,2,10,103,107,2,9,107,111,1,111,5,115,1,115,2,119,1,119,6,0,99,2,0,14,0`;
const program = test.split(",").map((x) => parseInt(x, 10));
program[1] = 12;
program[2] = 2;

// console.log(intCode(program));
module.exports = { intCode };
