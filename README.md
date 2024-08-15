# Find Words in Grid

This project implements a function to find words from a dictionary in a grid of letters. The words can be matched in any direction: horizontally, vertically, and diagonally.

## Overview

The goal of this assignment is to develop an efficient solution to locate words from a dictionary within a grid of letters. The solution uses a Trie data structure combined with a Depth-First Search (DFS) approach to achieve this.

## Implementation

### `find_words.js`

This script contains the core implementation of the word-finding algorithm:

1. **Trie Data Structure**: 
   - **TrieNode**: Represents each node in the Trie.
   - **Trie**: Contains methods to insert words, search for prefixes, and check if a word exists.

2. **Depth-First Search (DFS)**:
   - Searches the grid in all 8 possible directions.
   - Uses a `visited` matrix to track and avoid revisiting cells during a single DFS path.

3. **Functionality**:
   - **`findWords(wordGrid, dictionary)`**: Main function to find all words from the dictionary that are present in the letter grid.

### `models.js`

Defines Mongoose schemas and models for the database, including `User` and `Payment` schemas, using a MongoDB connection.

### `findWords_tests.js`

Contains test cases for validating the functionality of `findWords` using the Mocha testing framework with Chai assertions. Tests include:

1. Basic functionality with example grid and dictionary.
2. Handling of an empty dictionary.
3. Detection of diagonal words.
4. Overlapping words.
5. Performance with a larger grid and more words.
6. Single-letter words.

## Running Tests

To run the tests, use the following command:

```bash
npm run test:mocha
```
## Acknowledgements
- The solution uses a Trie data structure and DFS for efficient word searching.
- Mocha and Chai are used for unit testing.
