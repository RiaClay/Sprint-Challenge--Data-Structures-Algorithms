const swap = (arr, firstIndex, secondIndex) => {
  const placeHolder = arr[firstIndex];
  arr[firstIndex] = arr[secondIndex];
  arr[secondIndex] = placeHolder;
}

const childSort = (heap, i, max) => {
  let index;
  let leftChild;
  let rightChild;

  while (i < max) {
    index = i;

    leftChild = 2 * i + 1;
    rightChild = leftChild + 1;

    if (leftChild < max && heap[leftChild] > heap[index]) {
      index = leftChild;
    }

    if (rightChild < max && heap[rightChild] > heap[index]) {
      index = rightChild;
    }

    if (index == i) {
      return;
    }

    swap(heap, i, index);

    i = index;
  }
}

const buildHeap = (arr) => {
  let i;
  i = Math.floor(arr.length / 2 - 1);

  while (i >= 0) {
    childSort(arr, i, arr.length);
    i -= 1;
  }
}

const heapsort = (arr) => {
  /* Your code here */
  buildHeap(arr);

  lastElement = arr.length - 1;

  while (lastElement > 0) {
    swap(arr, 0, lastElement);

    childSort(arr, 0, lastElement);

    lastElement -= 1;
  }

};

class Heap {
  constructor() {
    this.storage = [null];
    this.size = 0;
  }

  insert(val) {
    const index = this.storage.push(val) - 1;
    this.size++;
    this.bubbleUp(index);
  }

  delete() {
    if (this.storage.length === 2) {
      this.size--;
      return this.storage.pop();
    } else if (this.storage.length === 1) {
      return this.storage[0];
    }
    this.size--;
    const max = this.storage[1];
    this.storage[1] = this.storage.pop();
    this.siftDown(1);
    return max;
  }

  getMax() {
    return this.storage[1];
  }

  getSize() {
    return this.size;
  }

  bubbleUp(index) {
    const parent = Math.floor(index/2);
    if (parent > 0 && this.storage[parent] < this.storage[index]) {
      [this.storage[parent], this.storage[index]] = [this.storage[index], this.storage[parent]];
      this.bubbleUp(parent);
    }
  }

  siftDown(index) {
    const child1 = index * 2;
    const child2 = index * 2 + 1;
    let maxChild;

    if (this.storage[child1] !== undefined) {
      if (this.storage[child2] === undefined) {
        maxChild = child1;
      } else if (this.storage[child2] !== undefined) {
        maxChild = this.storage[child1] > this.storage[child2] ? child1 : child2;
      }

      if (this.storage[index] < this.storage[maxChild]) {
        [this.storage[maxChild], this.storage[index]] = [this.storage[index], this.storage[maxChild]];
        this.siftDown(maxChild);
      }
    }
  }
}

module.exports = {
  Heap,
  heapsort,
};
