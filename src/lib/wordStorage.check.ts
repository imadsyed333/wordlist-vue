import { parseWords } from "./wordStorage.ts";

const sample = {
  id: "abc",
  name: "foo",
  type: "noun",
  definition: "a bar",
};

console.assert(parseWords(null).length === 0, "null → []");
console.assert(parseWords("").length === 0, "empty → []");
console.assert(parseWords("not json").length === 0, "invalid json → []");
console.assert(parseWords("{}").length === 0, "object → []");
console.assert(parseWords("[1, {\"id\":1}]").length === 0, "bad entries dropped");
console.assert(
  parseWords(JSON.stringify([sample, { ...sample, id: 1 }])).length === 1,
  "keeps only well-shaped words",
);
console.assert(
  parseWords(JSON.stringify([sample]))[0]?.name === "foo",
  "round-trips a valid word",
);

console.log("wordStorage.check: ok");
