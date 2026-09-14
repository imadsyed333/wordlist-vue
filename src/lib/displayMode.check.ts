import { isStandalonePwa } from "./displayMode.ts";

console.assert(
  isStandalonePwa(() => true, false) === true,
  "display-mode: standalone → PWA",
);
console.assert(
  isStandalonePwa(() => false, true) === true,
  "iOS navigator.standalone → PWA",
);
console.assert(
  isStandalonePwa(() => false, false) === false,
  "browser tab → not PWA",
);
console.assert(
  isStandalonePwa(() => false, undefined) === false,
  "missing standalone flag → not PWA",
);

console.log("displayMode.check: ok");
