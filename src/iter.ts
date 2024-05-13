import { Comparable, Tree } from "./adt";

export const allpaths = <T extends Comparable<T>>(
  t: Tree<T>,
  path: T[] = []
): T[][] => {
  switch (t._tag) {
    case "Empty":
      return [];
    case "Node":
      const newPath = path.concat(t.elem);

      if (t.left._tag === "Empty" && t.right._tag === "Empty") {
        return [newPath];
      }

      return [...allpaths(t.left, newPath), ...allpaths(t.right, newPath)];
  }
};

export const inorder = <T extends Comparable<T>>(t: Tree<T>): T[] => {
  switch (t._tag) {
    case "Empty":
      return [];
    case "Node":
      return [...inorder(t.left), t.elem, ...inorder(t.right)];
  }
};

export const preorder = <T extends Comparable<T>>(t: Tree<T>): T[] => {
  switch (t._tag) {
    case "Empty":
      return [];
    case "Node":
      return [t.elem, ...preorder(t.left), ...preorder(t.right)];
  }
};

export const postorder = <T extends Comparable<T>>(t: Tree<T>): T[] => {
  switch (t._tag) {
    case "Empty":
      return [];
    case "Node":
      return [...postorder(t.left), ...postorder(t.right), t.elem];
  }
};

export const bfs = <T extends Comparable<T>>(t: Tree<T>): T[] => {
    const result: T[] = [];
    const queue: Tree<T>[] = [t];

    while (queue.length > 0) {
        const current = queue.shift();
        if (current && current._tag == "Node") {
            result.push(current.elem);
            if (current.left._tag !== "Empty") {
                queue.push(current.left);
            }
            if (current.right._tag !== "Empty") {
                queue.push(current.right);
            }
            break;
        }
    }

    return result;
};

