declare module 'system' {
  import fetch = require('isomorphic-fetch');
  import * as Aurelia from 'aurelia-framework';
  import isbigint = require('isbigint');

  /*
   * List your dynamically imported modules to get typing support
   */
  interface System {
    import(name: string): Promise<any>;
    import(name: 'aurelia-framework'): Promise<typeof Aurelia>;
    import(name: 'isomorphic-fetch'): Promise<typeof fetch>;
    import(name: 'isbigint'): typeof isbigint;
  }

  global {
    var System: System;
  }
}
