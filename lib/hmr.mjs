import LISTENERS from './listeners.js';

const META_KEY = Symbol('import.meta');

/**
 * @typedef ImportMeta
 * @prop {string} url
 * @prop {(specifier: string) => string} resolve
 */

class HRMModuleAPI {
  constructor(meta) {
    this[META_KEY] = meta;
  }

  accept(specifiers, onChange) {
    const urls = specifiers.map(specifier => this[META_KEY].resolve(specifier));
    for (const url of urls) {
      LISTENERS.set(url, onChange);
    }
  }

  acceptSelf(onError) {
    LISTENERS.set(this[META_KEY].url, onError);
  }

  decline(dependencies) {}

  declineSelf() {}

  dispose(handler) {}
  addDisposeHandler(handler) {}
  removeDisposeHandler(handler) {}
}

/**
 * Register a listener for changes to a module.
 *
 * @param {ImportMeta} meta An import.meta-like object
 */
export default function hmr(meta) {
  return new HRMModuleAPI(meta.url);
}
