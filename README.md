# Node Share Count

## Get Share Counts

Node Share Count is a utility to get share counts for the following supported services:

- facebook
- pinterest
- linkedin
- googleplus

Here is how to use it:

```js
var shareCount = require('node-share-count');

shareCount.get('facebook', 'http://google.com', function(err, counts) {
  console.log('Counts for google.com is ', counts);
});
```


## Run the tests

To run the tests, do the following:
```js
npm test
```

## TODOS:
- add project to npm
