## Reiser-Relief

Source code for [reiserrelief.org](http://reiserrelief.org)

### Installation

Clone the repository into an environment running PHP 7.0+.

Install the necessary node modules with [npm](https://www.npmjs.com/):

```
npm install
```

Install the necessary PHP dependencies with [composer](https://getcomposer.org/):
```
composer install
```

### Usage

Run gulp with npm start:
```
npm start
```

Access index.php, located inside the newly created 'dist' directory, using a web browser.

Ex. [http://localhost/Reiser-Relief/dist/](http://localhost/Reiser-Relief/dist/)

### Additional Information

[Silex](http://silex.sensiolabs.org/) is used for the micro-framework with [Twig](http://twig.sensiolabs.org/) as its template engine.

Gulp is used to continuously watch for changes to JavaScript, Less, PHP, and Twig files in the 'src' directory.  Any modification to these files will be immediately reflected in the 'dist' directory.
