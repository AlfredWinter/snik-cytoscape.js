/**
Logging to console or overlay or both, depending on availability (server call using node or client) and log level.
@module */
/* eslint no-console: 0 */
// temporary solution. todo: use a logging library or write more elegantly using enums or integers

// for mocha testing
/* eslint no-var: 0*/
/* eslint no-use-before-define: 0*/
if(!alert)  {var alert = ()=>{};}

import config from "./config.js";

/** @return {String} a padded, right aligned string with the line number of the caller of the caller */
function callSource()
{
  // https://stackoverflow.com/questions/1340872/how-to-get-javascript-caller-function-line-number-how-to-get-javascript-caller
  const e = new Error();
  if(!e.stack) {return "";} // old browser
  const stack = e.stack.toString().split(/\r\n|\n/);
  return "            [" + stack[2].replace(/.*\//,"") + ']';
}

/** Logs the given messages with log level info */
export function info(s)
{
  if(typeof config !== 'undefined'&&config.logLevelDisplay==="info"||config.logLevelDisplay==="debug"||config.logLevelDisplay==="trace") {alert(s);}
  if(!config||config.logLevelConsole==="info"||config.logLevelConsole==="debug"||config.logLevelConsole==="trace")
  {
    const argumentsArray = Array.prototype.slice.call(arguments);
    argumentsArray.push(callSource());
    console.log.apply(console,argumentsArray);
  }
}

/** Logs the given messages with log level info */
export function debug(s)
{
  if(typeof config !== 'undefined'&&config.logLevelDisplay==="debug"||config.logLevelDisplay==="trace")  {alert(s);}
  if(typeof config === 'undefined'||config.logLevelConsole==="debug"||config.logLevelConsole==="trace")
  {
    const argumentsArray = Array.prototype.slice.call(arguments);
    argumentsArray.push(callSource());
    console.log.apply(console,argumentsArray);
  }
}

/** Logs the given messages with log level error
 Errors are always shown both on console and display.*/
export function error(s)
{
  alert(s);
  {
    const argumentsArray = Array.prototype.slice.call(arguments);
    argumentsArray.push(callSource());
    console.error.apply(console,argumentsArray);
  }
}

/** Logs the given messages with log level warn */
export function warn(s)
{
  if(typeof config !== 'undefined'&&config.logLevelDisplay!=="error")  {alert(s);}
  if(typeof config === 'undefined'||config.logLevelConsole!=="error")
  {
    const argumentsArray = Array.prototype.slice.call(arguments);
    argumentsArray.push(callSource());
    console.warn.apply(console,argumentsArray);
  }
}

/** Logs the given messages with log level trace. Never displayed to the user. */
export function trace()
{
  if(typeof config === 'undefined'||config.logLevelConsole!=="trace") {return;}
  const argumentsArray = Array.prototype.slice.call(arguments);
  argumentsArray.push(callSource());
  console.log.apply(console,argumentsArray);
}
