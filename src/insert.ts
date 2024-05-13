import {
  Color,
  Comparable,
  Empty,
  isBlack,
  Some,
  makeBlack,
  RBNode,
  Tree,
} from "./adt";

export const insert = <T extends Comparable<T>>(
  t: Tree<T>,
  elem: T
): Tree<T> => {
  return makeBlack(ins(t, elem));
};

const ins = <T extends Comparable<T>>(t: Tree<T>, x: T): Tree<T> => {
  switch (t._tag) {
    case "Empty":
      return RBNode(Color.Red, Empty(), x, Empty());
    case "Node": {
      let { color, elem: y, left, right } = t;

      switch (x.compareTo(y)) {
        case -1:
          return balance(color, ins(left, x), y, right);
        case 0:
          return t;
        case 1:
          return balance(color, left, y, ins(right, x));
      }
    }
  }
};

const balance = <T extends Comparable<T>>(
  color: Color,
  left: Tree<T>,
  elem: T,
  right: Tree<T>
): Tree<T> => {
  if (color === Color.Black) {
    if (!isBlack(left) && Some(left) && !isBlack(left.left)) {
      // Case: B (T R (T R a x b) y c) z d
      const l = left as RBNode<T>;
      const ll = l.left as RBNode<T>;
      return RBNode(
        Color.Red,
        RBNode(Color.Black, ll.left, ll.elem, ll.right),
        l.elem,
        RBNode(Color.Black, l.right, elem, right)
      );
    }
    if (!isBlack(left) && Some(left) && !isBlack(left.right)) {
      // Case: B (T R a x (T R b y c)) z d
      const l = left as RBNode<T>;
      const lr = l.right as RBNode<T>;
      return RBNode(
        Color.Red,
        RBNode(Color.Black, l.left, l.elem, lr.left),
        lr.elem,
        RBNode(Color.Black, lr.right, elem, right)
      );
    }
    if (!isBlack(right) && Some(right) && !isBlack(right.left)) {
      // Case: B a x (T R (T R b y c) z d)
      const r = right as RBNode<T>;
      const rl = r.left as RBNode<T>;
      return RBNode(
        Color.Red,
        RBNode(Color.Black, left, elem, rl.left),
        rl.elem,
        RBNode(Color.Black, rl.right, r.elem, r.right)
      );
    }
    if (!isBlack(right) && Some(right) && !isBlack(right.right)) {
      // Case: B a x (T R b y (T R c z d))
      const r = right as RBNode<T>;
      const rr = r.right as RBNode<T>;
      return RBNode(
        Color.Red,
        RBNode(Color.Black, left, elem, r.left),
        r.elem,
        RBNode(Color.Black, rr.left, rr.elem, rr.right)
      );
    }
  }

  return RBNode(color, left, elem, right);
};
