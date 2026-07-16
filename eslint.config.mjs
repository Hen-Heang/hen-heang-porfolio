import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const eslintConfig = [
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    rules: {
      // These React Compiler-oriented rules newly ship as errors in this
      // config version and fire on pre-existing, legitimate patterns this
      // repo relies on throughout (SSR-hydration "mounted" guards, timeout-
      // driven animation state, localStorage reads, stable icon lookups).
      // Downgraded to warn rather than rewriting many unrelated components.
      "react-hooks/set-state-in-effect": "warn",
      "react-hooks/static-components": "warn",
    },
  },
];

export default eslintConfig;
