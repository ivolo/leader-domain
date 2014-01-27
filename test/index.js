
var assert = require('assert');
var Plugin = require('..');

describe('leader-domain', function () {

  var plugin = Plugin();

  it('should wait if theres no email', function () {
    var context = {}, person = {};
    assert(!plugin.wait(person, context));
  });

  it('should not wait if there is a company name', function () {
    var person = { email: 'joe@mailinator.com' };
    var context = {};
    assert(plugin.wait(person, context));
  });

  it('should recognize disposable domains', function (done) {
    var person = { email: 'joe@mailinator.com' };
    var context = {};
    plugin.fn(person, context, function (err) {
      if (err) return done(err);
      var domain = person.domain;
      assert(!domain.personal);
      assert(domain.disposable);
      assert(!domain.interesting);
      done();
    });
  });
});