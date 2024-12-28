// We are shuffling a deck with a few operations and we need to do it with a huge deck a huge number of times.
// We need to find what card ends up in a certain position (2020)

// "New stack" is easy, just reverse
// "Cut N" is easy, just shift N cards to the back
// "Increment N" is hard, but we can do it backwards by finding the position of the card that ends up in a certain position

// Let's see, so for "increment by 3",
// 0 -> 0
// 1 -> 3
// 2 -> 6
// 3 -> 9
// 4 -> 12 -> 2 (which mod length of array is 2)
// 5 -> 15 -> 5
// 6 -> 18 -> 8
// 7 -> 21 -> 1
// 8 -> 24 -> 4
// 9 -> 27 -> 7
// Oh so it looks easy.
// Ah but only going forwards...
// What if I want to know, who ends up in position X? (Rather than, "where does Position X get sent to?")

// What about increment by 7?

// 0 -> 0
// 1 -> 7
// 2 -> 14 -> 4
// 3 -> 21 -> 1
// 4 -> 28 -> 8
// 5 -> 35 -> 5
// 6 -> 42 -> 2
// 7 -> 49 -> 9
// 8 -> 56 -> 6
// 9 -> 63 -> 3

// Ok but what about by a non-prime number? What about 4?

// I guess it just has to be a number that is RELATIVELY prime with the length of the deck.

// "Positions on the table which already contain cards are still counted; they're not skipped.
// Of course, this technique is carefully designed so it will never put two cards in the same position or leave a position empty."

// 0 -> 0
// 1 -> 4
// 2 -> 8
// 3 -> 12 -> 2
// 4 -> 16 -> 6
// 5 -> 20 -> 0
// 6 -> 24 -> 4
// 7 -> 28 -> 8
// 8 -> 32 -> 2
// 9 -> 36 -> 6

// It looks like you keep adding 10 until you hit a multiple of 3.

const input = `deal 26
cut 7249
deal 16
cut -5811
deal 63
cut -4598
deal 75
cut -5840
deal 53
deal into new stack
cut -180
deal 4
cut -5974
deal 25
cut -1826
deal 42
cut -2961
deal 32
cut -6089
deal 19
cut -2271
deal 38
cut 8671
deal 63
cut 4526
deal 68
cut -1291
deal 38
cut 6359
deal 41
deal into new stack
deal 9
cut 5347
deal 6
cut -9559
deal 70
cut -7976
deal 56
cut -294
deal 6
cut 2147
deal 37
cut 3562
deal 38
cut -6876
deal 34
cut -9812
deal 68
cut 1670
deal 11
deal into new stack
deal 15
cut -310
deal 4
cut 584
deal 49
cut -3803
deal 38
cut -2287
deal 13
deal into new stack
deal 69
cut 9777
deal 47
cut 218
deal into new stack
cut -805
deal 51
cut 7062
deal into new stack
cut -5375
deal 64
cut 1315
deal into new stack
cut 1582
deal 22
cut 6100
deal into new stack
deal 56
cut 2934
deal 23
cut -5579
deal 35
cut -8518
deal 38
cut -7207
deal into new stack
deal 65
cut -3266
deal into new stack
deal 36
cut 7064
deal 34
cut -8337
deal 2
deal into new stack
deal 75
deal into new stack
cut -8040
deal 33`;

// Works great for partone, nice.
function partOne() {
  const instructions = input.split("\n");

  // PART ONE
  //   const deckSize = 10007;
  //   let position = 2019;

  // PART TWO
  const deckSize = 119315717514047;
  let position = 2020;

  // So in part one, we want to know, where does the card in position 2019 end up after all the shuffling.
  // In part two, we want to know, what card ends up in position 2020 after all the shuffling.

  // So yeah part one direction for "increment" would be simple.... that's just the multiply and modulo...
  // But how do you go backwards from that...?
  // Oh I see, you can just do the opposite of the modulo operation, which is the multiplication operation. (???)

  let times = 0;

  // Uh oh..... there must be another shortcut for doing it n times...
  // I think I can just keep track of the position of 2020 and the number of times I've done it.
  // Yeah that's what I tried but it's not working......

  while (times < 1 || position !== 2020) {
    times++;
    instructions.forEach((instruction) => {
      const [operation, value] = instruction.split(" ");

      if (operation === "deal") {
        if (value === "into") {
          // Operation is "deal into new stack" -- works same for part one and two.
          position = deckSize - 1 - position;
        } else {
          const increment = parseInt(value, 10);
          // Operation is "deal with increment N"
          // console.log("inc", increment);
          // PART ONE
          // position = (position * increment) % deckSize;

          // PART TWO -- yes I think this is it -- inverting modulo multiplication!
          let p = position;
          while (p % increment !== 0) {
            p += deckSize;
          }
          position = p / increment;
        }
      } else {
        const cutValue = parseInt(value, 10);
        // Operation is "cut N"
        //   console.log("cut", cutValue);
        // PART ONE: (where does this index end up?)
        //   position = (position - cutValue + deckSize) % deckSize;

        // PART TWO: (who ends up at this index?)
        position = (position + cutValue + deckSize) % deckSize;
      }
    });
  }

  console.log("times", times);

  // Ok so after one round, 46902832175826 ends up at 2020.

  // Nuts, 46902832175826 is too low.....Oh duh we have to do it a bunch of times lol.
  //   return deck.indexOf(2019);
  return position;
}

console.log(partOne());
