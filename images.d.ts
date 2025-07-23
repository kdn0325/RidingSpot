declare module '*.png' {
  const content: number; // for `require(...)` style
  export default content;
}
