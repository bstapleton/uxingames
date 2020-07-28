const base32 = require("hi-base32");
if (process.env.npm_config_encodeMe.length < 16) {
    console.log('Input must be 16 characters or longer.')
} else {
    console.log(`Drop this into your auth.json file under the secret key: ${base32.encode(process.env.npm_config_encodeMe).replace(/=/g, '')}`);
}
