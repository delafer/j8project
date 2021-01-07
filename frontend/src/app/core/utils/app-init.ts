
declare const require;
//declare custom prototype (function) for any ts/js array
declare global {
  interface Array<T> {
    last();
  }
}

function registerCustomPrototypes() {
  if (!Array.prototype.hasOwnProperty('last')) {
    Object.defineProperty(Array.prototype, "last", {
      value: function (): any {
        // please don't use slice(-1)[0], because it creates a new copy of an array,
        // and its slow, memory inefficient and NLP & >= 1 checks are required.
        return this.length > 0 ? this[this.length - 1] : null;
      },
    });
  }
}

export function initializer() {

  registerCustomPrototypes();

  return (): Promise<any> => {
    console.log("Keycloak Init wird ausgeführt")
    return new Promise<void>(resolve => resolve());
  }
}


