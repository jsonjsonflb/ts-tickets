///<reference path="../node_modules/typescript/lib/lib.es6.d.ts"/>
///<reference path="../node_modules/@types/node/index.d.ts" />

//允许ts,tsx文件引入less文件
declare module '*.less' {
  const styles: any;
  export = styles;
}

//允许ts,tsx文件引入less文件
declare module '*.scss' {
  const styles: any;
  export = styles;
}

//允许ts,tsx文件引入json文件
declare module '*.json' {
  const data: any;
  export = data;
}

interface Window {
  // gtag(type: any, value: any, parameters: any): void;
  // initGeetest: any;
}
