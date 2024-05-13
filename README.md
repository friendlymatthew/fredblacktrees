# fredblacktrees

Functional red black trees written in typescript. Each insert incurs a new tree being created. That is:
```typescript
const t1 = Empty();
const t2 = insert(t1, 2);
const t3 = insert(t2, 3);
```

Traverse through the fred and black tree using the iterators in `iter.ts`.



Functional Pearls by Chris Okasaki: https://www.cs.tufts.edu/comp/150FP/archive/chris-okasaki/redblack99.pdf