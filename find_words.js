/*
 * This program should find all words from a dictionary in a grid of letters. Words
 * can be matched in any direction (horizontally, vertically, and diagonally).
 * For example, if passed the dictionary {"CAT", "DOG", "BIRD", "PLANE"}, the program
 * should return the set {"CAT", "DOG"}.
 *
 * 	    |  C  |  C  |  C  |
 *      |  C  |  A  |  C  |
 *      |  C  |  C  |  T  |
 * 		  |  D  |  O  |  G  |
 *
 * Your task is to implement the main function and any other functions you may need to
 * complete the task. In addition to functionality, you'll be assessed on code efficiency,
 * overall structure/code decomposition, and error handling.
 */

/**
 * Finds all words from the dictionary that are present in the grid of letters
 * @param {Array} wordGrid Letter grid represented as an array of char arrays.
 * The first array from the above example would be passed in
 * as ["C", "C", "C"] and the second would be ["C", "A", "C"], etc...)
 * @param {Set} dictionary Contains all words to look for in the letter grid
 * @returns {Set} All words from the dictionary that were found
 */

// Going with Trie Tree combined with DFS approach 

// Basic building block of the Trie
class TrieNode {
  constructor() {
    this.children = {};
    this.isEndOfWord = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  // responsible for inserting a word into the Trie
  // starting from root node and iterating over each character
  insert(word) {
    let node = this.root;
    for (let char of word) {
      if (!node.children[char]) {
        node.children[char] = new TrieNode();
      }
      node = node.children[char];
    }
    node.isEndOfWord = true; // denoting the word has ended
  }

  // helper function used by search and startsWith
  // searches for a prefix in the Trie and returns the last node of the prefix if it exists
  searchPrefix(prefix) {
    let node = this.root;
    for (let char of prefix) {
      if (node.children[char]) {
        node = node.children[char];
      } else {
        return null;
      }
    }
    return node;
  }

  // checks if a full word exists in the Trie
  search(word) {
    const node = this.searchPrefix(word);
    return node != null && node.isEndOfWord; // if isEndOfWord is true and node exists, the word exists in the Trie
  }


  // simply checks if there is any word in the Trie that starts with the given prefix.
  startsWith(prefix) {
    return this.searchPrefix(prefix) != null;
  }
}

function findWords(wordGrid, dictionary) {

  // initializing grid
  let rows = wordGrid.length;
  if (rows === 0) return new Set(); // if no rows, return empty Set
  let cols = wordGrid[0].length;
  let result = new Set();
  const trie = new Trie();
  for (let word of dictionary) {
    trie.insert(word);
  }

  // ensures the move is within the bounds of the grid
  const isSafe = (x, y) => x >= 0 && y >= 0 && x < rows && y < cols;

  // all 8 directions that can be made when looking for a word
  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
    [-1, -1],
    [-1, 1],
    [1, -1],
    [1, 1],
  ];

  const depth_first_search = (x, y, currentWord) => {
    if (!isSafe(x, y) || visited[x][y]) {
      return;
    }

    currentWord += wordGrid[x][y];

    if (!trie.startsWith(currentWord)) {
      return; // Pruning step
    }

    // if current currentWord is found in the Trie, add it to the result set
    if (trie.search(currentWord)) {
      result.add(currentWord);
    }

    visited[x][y] = true;

    for (let [dx, dy] of directions) {
      let nextX = x + dx;
      let nextY = y + dy;
      depth_first_search(nextX, nextY, currentWord);
    }

    visited[x][y] = false; // Reset for backtracking
  };

  // responsible for keeping track of which cells have been looked at in current DFS path
  const visited = Array(rows)
    .fill(false)
    .map(() => Array(cols).fill(false));

  // grid exploration, nested loop to ensure every cell in the grid has been searched with DFS
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      depth_first_search(i, j, "");
    }
  }

  return result;
}
module.exports.findWords = findWords;
