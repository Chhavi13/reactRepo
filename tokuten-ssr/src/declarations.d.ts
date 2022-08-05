// https://www.typescriptlang.org/docs/handbook/modules.html#ambient-modules

declare module '*.svg' {
  const src: string;
  export default src;
}
declare module '*.png' {
  const src: string;
  export default src;
}
declare module '*.mp4' {
  const src: string;
  export default src;
}

declare module 'document'{
  const document : any;
  export default document
}

