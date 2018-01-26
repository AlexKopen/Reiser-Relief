# Reiser-Relief

Source code for the front-end of [reiserrelief.org](http://reiserrelief.org)

## Installation

Install the necessary node modules with [npm](https://www.npmjs.com/)

```
npm install
```

Install the necessary PHP dependencies with [composer](https://getcomposer.org/)
```
composer install
```

## Usage

Run gulp with npm start
```
npm start
```

Run the server

```
php -S localhost:8000 -t dist
```


View the site at [http://localhost:8000](http://localhost:8000)

## Additional Information

[Silex](http://silex.sensiolabs.org/) is used for the micro-framework with [Twig](http://twig.sensiolabs.org/) as its template engine.

Gulp is used to continuously watch for changes to image, JavaScript, Less, PHP, and Twig files in the 'src' directory.  Any modification to these files will be immediately reflected in the 'dist' directory.
