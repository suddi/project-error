'use strict';

function ProjectError(errorObj, details, previousError) {
    errorObj = errorObj || {};
    if (details instanceof Array) {
        details = details;
    } else if (details) {
        details = [details];
    } else {
        details = [];
    }

    var message = errorObj.message || 'ProjectError';
    Error.call(this, message);

    this.message = message;
    this.errorObj = errorObj;
    this.details = details;
    this.previousError = previousError;

    if (previousError && previousError.stack) {
        this.stack = previousError.stack;
    } else {
        Error.captureStackTrace(this, ProjectError);
    }
}

ProjectError.prototype = Object.create(Error.prototype);

module.exports = ProjectError;
