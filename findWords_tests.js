// Testing with Mocha framework
// can test by running 'npm run test:mocha'

const chai = require("chai");
const expect = chai.expect;

const { findWords } = require("./find_words");

describe("findWords", () => {
  // Test 1: Functionality of DFS function with example provided
  it("should find words in the grid", () => {
    const grid = [
      ["C", "C", "C"],
      ["C", "A", "C"],
      ["C", "C", "T"],
      ["D", "O", "G"],
    ];
    const dictionary = new Set(["CAT", "DOG", "BIRD", "PLANE"]);
    const result = findWords(grid, dictionary);
    expect(result).to.deep.equal(new Set(["CAT", "DOG"]));
  });

  // Test 2: With a small grid and no words in the dictionary
  it("should return an empty set when no words in the dictionary", () => {
    const grid = [
      ["A", "B", "C"],
      ["D", "E", "F"],
      ["G", "H", "I"],
    ];
    const dictionary = new Set([]);
    const result = findWords(grid, dictionary);
    expect(result.size).to.equal(0);
  });

  // Test 3: With words spelled diagonally
  it("should find words spelled diagonally", () => {
    const grid = [
      ["A", "B", "C", "D"],
      ["E", "F", "A", "H"],
      ["I", "A", "K", "L"],
      ["M", "N", "O", "P"],
    ];
    const dictionary = new Set(["BAL", "EAO"]);
    const result = findWords(grid, dictionary);
    expect(result).to.deep.equal(new Set(["BAL", "EAO"]));
  });

  // Test 4: With overlapping words
  it("should find overlapping words", () => {
    const grid = [
      ["T", "E", "S"],
      ["E", "S", "T"],
      ["S", "T", "E"],
    ];
    const dictionary = new Set(["TES", "SET", "EST"]);
    const result = findWords(grid, dictionary);
    expect(result).to.deep.equal(new Set(["TES", "SET", "EST"]));
  });

  // Test 5: With larger grid and more words in the dictonary
  it("should handle larger grids", () => {
    const grid = [
      ["T", "E", "S", "A", "P", "R", "O", "D"],
      ["E", "S", "T", "I", "G", "E", "R", "S"],
      ["S", "T", "E", "M", "O", "U", "S", "E"],
      ["R", "E", "V", "E", "R", "S", "E", "D"],
      ["A", "P", "P", "L", "E", "P", "I", "E"],
      ["D", "O", "G", "M", "A", "T", "C", "H"],
      ["C", "A", "T", "S", "A", "N", "D", "D"],
      ["B", "I", "R", "D", "S", "O", "N", "G"],
    ];
    const dictionary = new Set([
      "APPLE",
      "MOUSE",
      "DOG",
      "CATS",
      "TIGERS",
      "REVERSED",
    ]);
    const result = findWords(grid, dictionary);
    expect(result).to.deep.equal(
      new Set(["APPLE", "MOUSE", "DOG", "CATS", "TIGERS", "REVERSED"])
    );
  });

  // Test 6: if the dictionary is a single letter word
  it("should find single-letter words", () => {
    const grid = [["B"]];
    const dictionary = new Set(["A", "B"]);
    const result = findWords(grid, dictionary);
    expect(result).to.deep.equal(new Set(["B"]));
  });
  
});
