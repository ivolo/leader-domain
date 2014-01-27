
var extend = require('extend');
var isDisposable = require('is-disposable-email');
var isPersonal = require('is-personal-email');
var objCase = require('obj-case');

/**
 * Create a new leader plugin.
 *
 * @returns {Object}
 */

module.exports = function () {
  return { fn: plugin(), wait: wait };
};

/**
 * Create a domain leader plugin.
 *
 * @return {String} apiKey
 * @return {Function}
 */

function plugin (apiKey) {
  return function domainPlugin (person, context, next) {
    var email = getEmail(person, context);
    if (!email) return next();
    var personal = isPersonal(email);
    var disposable = isDisposable(email);
    var domain = email.split('@')[1];
    person.domain = person.domain || {};
    extend(true, person.domain, {
      name: domain,
      personal: personal,
      disposable: disposable
    });
    domain.interesting = domain.interesting || (!personal && !disposable);
    next();
  };
}

/**
 * Wait until we have an email.
 *
 * @param {Object} context
 * @param {Object} person
 * @return {Boolean}
 */

function wait (person, context) {
  return getEmail(person, context);
}

/**
 * Get the persons email.
 *
 * @param {Object} context
 * @param {Object} person
 * @return {String}
 */

function getEmail (person, context) {
  return objCase(person, 'email');
}
