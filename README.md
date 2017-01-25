## Reiser-Relief

Source code for [reiserrelief.org](http://reiserrelief.org)

### Installation

Clone the repository into an environment running PHP 5.5+

Install the necessary node modules:

```
npm install
```

### Usage

Run gulp with npm start:
```
npm start
```

Access index.php, located inside the newly created 'dist' directory, using a web browser.

Ex. [http://localhost/dist/](http://localhost/dist/)

### Additional Information

Gulp is used to continuously watch for changes to TypeScript, Less, and PHP files in the 'src' directory.  Any modification to these files will be immediately reflected in the 'dist' directory.
