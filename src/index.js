/*!
 * deep-aplus <https://github.com/nknapp/deep-aplus>
 *
 * Copyright (c) 2024 Nils Knappmeier.
 * Released under the MIT license.
 */

function isPlainObject(val) {
  // From: https://www.30secondsofcode.org/js/s/complete-guide-to-js-type-checking/
  return val != null && typeof val === "object" && val.constructor === Object;
}

function isPromiseAlike(obj) {
  return obj === Object(obj) && typeof obj.then === "function";
}

export async function deepAplus(obj) {
  if (isPlainObject(obj)) {
    return await handleObject(obj);
  } else if (Array.isArray(obj)) {
    return await Promise.all(obj.map(deepAplus));
  } else if (isPromiseAlike(obj)) {
    return await deepAplus(await obj);
  } else {
    return obj;
  }
}

async function handleObject(obj) {
  const keys = Object.keys(obj);
  const values = await deepAplus(Object.values(obj));
  const entries = keys.map((key, index) => [key, values[index]]);
  return Object.fromEntries(entries);
}
