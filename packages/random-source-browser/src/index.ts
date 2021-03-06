import {randomValues as ie11RandomValues} from './ie11RandomValues';
import {randomValues as webCryptoRandomValues} from './webCryptoRandomValues';
import {isMsWindow} from '@aws-crypto/ie11-detection';
import {supportsWebCrypto, supportsSecureRandom} from '@aws-crypto/supports-web-crypto';
import {locateWindow} from '@aws-sdk/util-locate-window';

export {ie11RandomValues, webCryptoRandomValues};

export function randomValues(byteLength: number): Promise<Uint8Array> {
  // Find the global scope for this runtime
  const globalScope = locateWindow();

  if (supportsWebCrypto(globalScope)) {
    return webCryptoRandomValues(byteLength);
  } else if (isMsWindow(globalScope)) {
    return ie11RandomValues(byteLength);
  }

  return Promise.reject(
    new Error(`Unable to locate a secure random source.`)
  );
}

export function randomValuesOnly(byteLength: number): Promise<Uint8Array> {
  // Find the global scope for this runtime
  const globalScope = locateWindow();

  if (supportsSecureRandom(globalScope)) {
    return webCryptoRandomValues(byteLength);
  } else if (isMsWindow(globalScope)) {
    return ie11RandomValues(byteLength);
  }

  return Promise.reject(
    new Error(`Unable to locate a secure random source.`)
  );
}