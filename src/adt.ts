export interface Comparable<T> {
  compareTo(other: T): -1 | 0 | 1;
}

export enum Color {
  Red,
  Black,
}

export interface Empty {
  readonly _tag: "Empty";
}

export interface RBNode<T extends Comparable<T>> {
  readonly _tag: "Node";
  readonly color: Color;
  readonly left: Tree<T>;
  readonly elem: T;
  readonly right: Tree<T>;
}

export type Tree<T extends Comparable<T>> = Empty | RBNode<T>;

export const Empty = <T extends Comparable<T>>(): Tree<T> => ({
  _tag: "Empty",
});

export const RBNode = <T extends Comparable<T>>(
  color: Color,
  left: Tree<T>,
  elem: T,
  right: Tree<T>
): RBNode<T> => {
  return { _tag: "Node", color, left, elem, right };
};

export const makeBlack = <T extends Comparable<T>>(t: Tree<T>): Tree<T> => {
  switch (t._tag) {
    case "Empty":
      return t;
    case "Node":
      let { left, elem, right } = t;
      return RBNode(Color.Black, left, elem, right);
  }
};

export const isBlack = <T extends Comparable<T>>(tree: Tree<T>) => {
  switch (tree._tag) {
    case "Empty":
      return true;
    case "Node":
      return tree.color === Color.Black;
  }
};

export const Some = <T extends Comparable<T>>(
  node: Tree<T>
): node is RBNode<T> => node._tag === "Node";

export const minheight = <T extends Comparable<T>>(t: Tree<T>): number => {
  switch (t._tag) {
    case "Empty":
      return 0;
    case "Node":
      return 1 + Math.min(minheight(t.left), minheight(t.right));
  }
};

export const maxheight = <T extends Comparable<T>>(t: Tree<T>): number => {
    switch (t._tag) {
        case "Empty": return 0;
        case "Node": return 1 + Math.max(maxheight(t.left), maxheight(t.right));
    }
}

export const member = <T extends Comparable<T>>(t: Tree<T>, x: T): boolean => {
  switch (t._tag) {
    case "Empty":
      return false;
    case "Node": {
      const { elem: y, left, right } = t;

      switch (x.compareTo(y)) {
        case -1:
          return member(left, x);
        case 0:
          return true;
        case 1:
          return member(right, x);
      }
    }
  }
};
