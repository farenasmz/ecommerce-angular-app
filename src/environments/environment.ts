// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  name: 'dev',
  firebaseConfig: {
    apiKey: 'AIzaSyAHpZNdTeUrlFjfPvNvGIRYbnu4hJajC-Y',
    authDomain: 'ecommerce-94c04.firebaseapp.com',
    projectId: 'ecommerce-94c04',
    storageBucket: 'ecommerce-94c04.appspot.com',
    messagingSenderId: '946572349890',
    appId: '1:946572349890:web:a6f6ef41784e44d320065b',
    measurementId: 'G-LX24F61H97',
  },
  actionCodeSettings: {
    url: 'http://localhost:5200/demo',
    handleCodeInApp: true,
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
