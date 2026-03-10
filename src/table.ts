type Grid6x6 = string[][];

const table: [Grid6x6, Grid6x6] = [
  [
    ["a", "b", "c", "d", "e", "f"],
    ["g", "h", "i", "j", "k", "l"],
    ["m", "n", "o", "p", "q", "r"],
    ["s", "t", "u", "v", "w", "x"],
    ["y", "z", " ", "1", "2", "3"],
    ["5", "6", "7", "8", "9", "0"]
  ],
  [
    ["A", "B", "C", "D", "E", "F"],
    ["G", "H", "I", "J", "K", "L"],
    ["M", "N", "O", "P", "Q", "R"],
    ["S", "T", "U", "V", "W", "X"],
    ["Y", "Z", "!", "@", "#", "$"],
    ["%", "^", "*", "\0", "\0", "\0"]
  ]
];

export default function getChar(layer: number, row: number, col: number): string | undefined {
  return table[layer - 1]?.[row - 1]?.[col - 1];
}
