module.exports = {
    declaration: true,
    module: "esnext",
    target: "es2016",
    lib: ["es6", "dom"],
    jsx: "react",
    allowSyntheticDefaultImports: true,
    moduleResolution: "node", //?
    forceConsistentCasingInFileNames: true,
    noImplicitReturns: true,
    suppressImplicitAnyIndexErrors: true,
    allowJs: true,
    checkJs: true,
    noImplicitThis: false,
    experimentalDecorators: true
};
