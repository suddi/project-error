# ProjectError

[![CircleCI](https://img.shields.io/circleci/project/suddi/project-error/master.svg)](https://circleci.com/gh/suddi/project-error)
[![codecov](https://codecov.io/gh/suddi/project-error/branch/master/graph/badge.svg)](https://codecov.io/gh/suddi/project-error)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/f3cbca070bbd4488b579748680348c28)](https://www.codacy.com/app/Suddi/project-error)
[![npm](https://img.shields.io/npm/v/project-error.svg)](https://www.npmjs.com/package/project-error)
[![npm](https://img.shields.io/npm/dt/project-error.svg)](https://www.npmjs.com/package/project-error)
[![David](https://img.shields.io/david/suddi/project-error.svg)](https://david-dm.org/suddi/project-error)
[![license](https://img.shields.io/github/license/suddi/project-error.svg)](https://raw.githubusercontent.com/suddi/project-error/master/LICENSE)

[![codecov](https://codecov.io/gh/suddi/project-error/branch/master/graphs/commits.svg)](https://codecov.io/gh/suddi/project-error)

Customized error class module for project/microservices. Throw error enum objects within a JavaScript Error class preserving the stack.

## Installation

````
npm install --save project-error
````

## Usage

1) Pass any object containing into the first argument of `ProjectError`:

````js
var ProjectError = require('project-error');

throw new ProjectError({
    code: 4010,
    statusCode: 400,
    message: 'Bad Request'
});
````

2) Pass additional error details as either a string or an array of strings:

````js
var ProjectError = require('project-error');

var errorObj = {
    code: 4010,
    statusCode: 400,
    message: 'Bad Request'
};
var errorDetail = 'This is a one-liner error detail';
throw new ProjectError(errorObj, errorDetail);
````

````js
var ProjectError = require('project-error');

var errorObj = {
    code: 4010,
    statusCode: 400,
    message: 'Bad Request'
};
var errorDetails = [
    'This is multiple lines of error details',
    'This is multiple lines of error details',
    'This is multiple lines of error details'
];
throw new ProjectError(errorObj, errorDetails);
````

3) Pass a standard `Error` object and preserve the stack:

````js
var errorObj = {
    code: 4010,
    statusCode: 400,
    message: 'Bad Request'
};
var errorDetail = 'This is a one-liner error detail';
var error = new Error('Fail!');
throw new ProjectError(errorObj, errorDetail, error);
````
