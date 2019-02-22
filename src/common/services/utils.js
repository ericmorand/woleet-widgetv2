import { icon } from '@fortawesome/fontawesome-svg-core'

function extendObject(a, b) {
  for (let key in b)
    if (b.hasOwnProperty(key))
      a[key] = b[key];
  return a;
}

function defineProperty(target) {
  return (name, value) => Object.defineProperty(target, name, {
    enumerable: false,
    value
  })
}

function extractClasses(styles, classCodes) {
  return Object.keys(styles)
    .map(classCode => classCodes.indexOf(classCode) !== -1 ? styles[classCode] : '')
    .filter(className => className && className.length > 0);
}

function translate(code, lang = '', options = {}) {
  if (window.i18n && window.i18n.t) {
    return window.i18n.t(code, extendObject({ lng: lang }, options));
  }
  return code;
}

/**
 * Get regular SVG icon of the library Font-Awesome
 * @param iconCode
 * @param options
 * @returns {*}
 */
function getRegularIconSVG(iconCode, options = {}) {
  if (window.regularIconsModule) {
    return icon(window.regularIconsModule[iconCode], options).html[0];
  }
  return false;
}

/**
 * Get solid SVG icon of the library Font-Awesome
 * @param iconCode
 * @param options
 * @returns {*}
 */
function getSolidIconSVG(iconCode, options = {}) {
  if (window.solidIconsModule) {
    return icon(window.solidIconsModule[iconCode], options).html[0];
  }
  return false;
}

/**
 * Get unique id
 * @returns {*}
 */
function getUniqueId(prefix = '', suffix = '') {
  const uniqueId = (s4()+s4()+"-"+s4()+"-"+s4()+"-"+s4()+"-"+s4()+s4()+s4());

  return prefix + uniqueId + suffix;
}

function s4() {
  return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
}

function setTimer(callback, delay) {
  if (delay && delay > 0) {
    setTimeout(callback, delay)
  }
}

/**
 * Get nested object property by string
 * @param o
 * @param s
 * @returns {*}
 */
function byString(o, s) {
  s = s.replace(/^window./g, '');
  s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
  s = s.replace(/^\./, '');           // strip a leading dot
  const a = s.split('.');
  for (let i = 0, n = a.length; i < n; ++i) {
    let k = a[i];
    if (k in o) {
      o = o[k];
    } else {
      return false;
    }
  }
  return o;
}

export default  {
  byString,
  setTimer,
  translate,
  getUniqueId,
  extendObject,
  defineProperty,
  extractClasses,
  getSolidIconSVG,
  getRegularIconSVG
}