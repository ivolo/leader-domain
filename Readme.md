
# leader-domain

  A [leader](https://github.com/ivolo/leader) plugin for  analyzing email domains.

## Example

```js
var Leader = require('leader');
var domain = require('leader-domain');

var leader = Leader()
  .use(domain())
  .populate({ email: 'joe@mailinator.com', function(err, person) {
    // ..
});
```

And adds the `domain` object to the `person`:

```js
{
    email: 'joe@mailinator.com',
    // ..
    domain: {
        name: 'mailinator.com',
        personal: false,
        disposable: true,
        interesting: false
    }
}
```

## API

#### domain()

  Return a domain analysis plugin.
