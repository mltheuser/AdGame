export default function topKClosestMatches(lables: any[], search: string, k: number): string[] {
  // Calculate Levenshtein distance between search string and list of strings
  const distances = lables.map((lable_tuple) => {
    const string = lable_tuple[0].name.toLowerCase();
    const distanceMatrix = new Array(search.length + 1).fill(null).map(() => new Array(string.length + 1).fill(null));

    for (let i = 0; i <= string.length; i += 1) {
      distanceMatrix[0][i] = i;
    }

    for (let j = 0; j <= search.length; j += 1) {
      distanceMatrix[j][0] = j;
    }

    for (let j = 1; j <= search.length; j += 1) {
      for (let i = 1; i <= string.length; i += 1) {
        if (search[j - 1] === string[i - 1]) {
          distanceMatrix[j][i] = distanceMatrix[j - 1][i - 1];
        } else {
          const substitutionCost = distanceMatrix[j - 1][i - 1] + 1;
          const insertionCost = distanceMatrix[j][i - 1] + 1;
          const deletionCost = distanceMatrix[j - 1][i] + 1;
          distanceMatrix[j][i] = Math.min(substitutionCost, insertionCost, deletionCost);
        }
      }
    }

    return distanceMatrix[search.length][string.length];
  });

  // Use a heap to keep track of the top k closest matches
  const heap: [number, number][] = [];
  distances.forEach((distance, index) => {
    if (heap.length < k) {
      heap.push([distance, index]);
      if (heap.length === k) {
        heapify(heap);
      }
    } else if (distance < heap[0][0]) {
      heap[0] = [distance, index];
      heapify(heap);
    }
  });

  // Get the top k closest matches and sort them by similarity
  const closestMatches: string[] = heap.map(([_distance, index]) => lables[index]);
  closestMatches.sort((a, b) => {
    const aDistance = distances[lables.indexOf(a)];
    const bDistance = distances[lables.indexOf(b)];
    return aDistance - bDistance;
  });

  return closestMatches;
}

function heapify<T>(array: T[]): void {
  for (let i = Math.floor(array.length / 2); i >= 0; i--) {
    sink(array, i, array.length);
  }
}

function sink<T>(array: any[], index: number, length: number): void {
  while (2 * index + 1 < length) {
    let childIndex = 2 * index + 1;
    if (childIndex + 1 < length && array[childIndex][0] < array[childIndex + 1][0]) {
      childIndex++;
    }
    if (array[index][0] >= array[childIndex][0]) {
      break;
    }
    [array[index], array[childIndex]] = [array[childIndex], array[index]];
    index = childIndex;
  }
}
