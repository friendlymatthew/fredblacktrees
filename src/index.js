"use strict";
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Black"] = 1] = "Black";
})(Color || (Color = {}));
;
const Empty = { _tag: "Empty" };
function RBNode(color, left, value, right) {
    return { _tag: 'Node', color, left, value, right };
}
