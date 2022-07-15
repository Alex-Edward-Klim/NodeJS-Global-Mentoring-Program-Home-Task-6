const jwt = require('jsonwebtoken');

const user = {
  name: 'John',
};

const accessToken = jwt.sign(user, 'cba2073e08e34d1b8a0165f3ee262949b3129e31aa63342c4e39953c047e203ca997d5aa96ddf163ae82fabfe2f3cfa53634f2a73c5b309ded40c86a35032456');

console.log(accessToken);
