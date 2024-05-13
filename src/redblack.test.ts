import { Comparable, Empty, maxheight, member } from "./adt";
import { insert } from "./insert";

import { allpaths, inorder } from "./iter";

class KeyValue implements Comparable<KeyValue> {
  key: number;
  value: number;

  constructor(key: number, value: number) {
    this.key = key;
    this.value = value;
  }

  compareTo(other: KeyValue): -1 | 0 | 1 {
    if (this.value < other.value) return -1;
    if (this.value === other.value) return 0;
    return 1;
  }
}

class CNum implements Comparable<CNum> {
    value: number;

    constructor(value: number) {
        this.value = value;
    }

    compareTo(other: KeyValue): -1 | 0 | 1 {
        if (this.value < other.value) return -1;
        if (this.value > other.value) return 1;
        return 0;
    }
}

describe("basic rb tree", () => {
  it("builds tree", () => {
    let t = Empty<KeyValue>();
    t = insert(t, new KeyValue(4, 0));
    t = insert(t, new KeyValue(5, 2));
    t = insert(t, new KeyValue(6, 4));

    console.log(allpaths(t));

    expect(member(t, new KeyValue(4, 44))).toBe(false);
    expect(member(t, new KeyValue(5, 2))).toBe(true);
    expect(member(t, new KeyValue(4, 0))).toBe(true);
    expect(member(t, new KeyValue(6, 4))).toBe(true);

    switch (t._tag) {
      case "Empty":
        fail("Tree is unexpectedly empty");
        break;

      case "Node":
        expect(t.elem.key).toBe(5);
        break;
    }

    expect(maxheight(t)).toBe(2);
  });

  it("builds 18tree", () => {
    let h1 = [];
    for (let idx = 0; idx < 9; idx++) {
      h1.push(idx);
    }

    let h2 = [];
    for (let idx = 9; idx < 18; idx++) {
      h2.push(idx);
    }

    let t = Empty<CNum>();
    for (let idx = 0; idx <= h1.length - 1; idx++) {
      t = insert(t, new CNum(h1[idx]));
      t = insert(t, new CNum(h2[idx]));
    }

    console.log(allpaths(t));

    expect(inorder(t)).toEqual([
      new CNum(0),
      new CNum(1),
      new CNum(2),
      new CNum(3),
      new CNum(4),
      new CNum(5),
      new CNum(6),
      new CNum(7),
      new CNum(8),
      new CNum(9),
      new CNum(10),
      new CNum(11),
      new CNum(12),
      new CNum(13),
      new CNum(14),
      new CNum(15),
      new CNum(16),
      new CNum(17),
    ]);
  });
});
