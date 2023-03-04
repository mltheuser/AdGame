import * as natural from 'natural';
// @ts-ignore
import { BinaryHeap } from 'js-data-structures';

class TrieNode {
  children: Map<string, TrieNode>;
  isEndOfWord: boolean;
  words: Set<string>;

  constructor() {
    this.children = new Map();
    this.isEndOfWord = false;
    this.words = new Set();
  }
}

function insertIntoTrie(root: TrieNode, word: string, originalWord: string) {
  let currentNode = root;
  for (const char of word) {
    if (!currentNode.children.has(char)) {
      currentNode.children.set(char, new TrieNode());
    }
    currentNode = currentNode.children.get(char)!;
    currentNode.words.add(originalWord);
  }
  currentNode.isEndOfWord = true;
}

function findTopKMatches(root: TrieNode, search: string, k: number): string[] {
  let currentNode = root;
  for (const char of search) {
    if (!currentNode.children.has(char)) {
      return [];
    }
    currentNode = currentNode.children.get(char)!;
  }

  const matches: string[] = Array.from(currentNode.words);
  const heap: [number, string][] = [];
  for (const match of matches) {
    const distance = natural.LevenshteinDistance(search, match);
    if (heap.length < k) {
      heap.push([distance, match]);
      if (heap.length === k) {
        BinaryHeap.heapify(heap, (a: any, b: any) => b[0] - a[0]);
      }
    } else if (distance < heap[0][0]) {
      heap[0] = [distance, match];
      BinaryHeap.heapify(heap, (a: any, b: any) => b[0] - a[0]);
    }
  }

  return heap.map(([_distance, match]) => match).reverse();
}

export default function topKClosestMatches(strings: string[], search: string, k: number): string[] {
  const root = new TrieNode();
  for (const string of strings) {
    insertIntoTrie(root, string, string);
  }
  return findTopKMatches(root, search, k);
}
