const { defaults: tsjPreset } = require("ts-jest/presets");

module.exports = {
   roots: ["./src/store"],
   transform: {
      ...tsjPreset.transform,
      "^.+\\.tsx?$": "ts-jest",
   },
   testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
   moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};
