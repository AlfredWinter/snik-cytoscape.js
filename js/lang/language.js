/**
Language dependend strings.
@module */

import en from './en.js';
import de from './de.js';

const strings =
{
  'en': en,
  'de': de,
  'fa': {}, // for future Persian UI labels and for Persian class labels
};

let language = "en";

/** Sets the user interface language if it exists.
@returns {boolean} whether the language exists
*/
export function setLanguage(lang)
{
  if(!strings[lang]) {return false;}
  language=lang;
  return true;
}

/** 
@returns {string} the active language code, such as "en" or "de"
*/
export function getLanguage() {return language;}

/**
 * getString - description
 * @return {type}  descriptioa
 */
export function getString(key)
{
  return strings[language][key];
}

/**
 * getString - description
 * @return {type}  description
 */
export function getStrings()
{
  return strings[language];
}
