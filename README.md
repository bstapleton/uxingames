## UX in Games

This is for a blog I am building.

Simple CRUD actions handled with a Laravel API, with a React front-end.

## Installation

### Pre-requisites

1. NodeJS
1. PHP7
1. MySQL
1. Google Authenticator app

### Instructions

1. Run `composer install` to grab all of the dependencies for the server-side
1. Run `npm install` to grab all of the dependencies for the client-side
1. In order to access any of the admin route on your own install, you'll need to generate a secret:
    * Create a `auth.json` file at the project root:
    ```json
   {
        "users": [
            "your@email.com"
        ],
        "token": "somerandomstringhere",
        "secret": ""
   }
   ```
    * Run the generate-secret script `npm --encodeMe=WHATEVERYOUWANT run-script generate-secret`, replacing the value with... whatever you want. It needs to be 16 or more characters long though!
    * Copy-paste the output from the script into the secret key in your `auth.json` file.
    * Add a new entry in your Google Authenticator app (under manual entry) - use the email you added to `auth.json`, and paste in the secret you generated into the key field.
1. Run `php artisan serve` to fire up the Laravel API
1. Run `npm run watch` to fire up the front-end

And you should be good to go!

### TODO

* ~~Create actions and associated forms~~
* ~~Read actions and associated views~~
* ~~Update actions and associated forms~~
* Delete actions and associated forms
* CSS
* Authentication - partially done but needs binding to the database
* Some form od WYSIWYG editor to replace content textareas
* Some kind of solution for non-post pages

### Eventual features

* Search
* Post archives by year/month
* Pagination for listing pages
