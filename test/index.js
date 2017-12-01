'use strict';

var expect = require('chai').expect;
var errorStackParser = require('error-stack-parser');

var ProjectError = require('../lib');

function getBadRequest() {
    return {
        code: 400,
        message: 'Bad Request'
    };
}

function getTooManyRequests() {
    return {
        code: 429,
        message: 'Too Many Requests'
    };
}

function throwAndCatch(status, details, previousError) {
    try {
        throw new ProjectError(status, details, previousError);
    } catch (error) {
        return error;
    }
}

function generateErrorInNamedFunctionForTraceability() {
    return new Error('Fail');
}

function assertStack(error) {
    var stack = errorStackParser.parse(error);
    expect(stack[0].functionName).to.be.eql('throwAndCatch');
    expect(stack[0].lineNumber).to.be.eql(24);
    expect(stack[0].columnNumber).to.be.eql(15);
}

describe('Testing ProjectError', function () {
    it('CASE 1: Should work correctly and generate stack trace at the point of throw', function () {
        var status = getBadRequest();
        var expectedMessage = status.message;
        var expectedErrorObj = status;
        var expectedDetails = [];
        var expectedPreviousError = undefined;

        var error = throwAndCatch(status);

        expect(error.message).to.be.eql(expectedMessage);
        expect(error.errorObj).to.deep.eql(expectedErrorObj);
        expect(error.details).to.deep.eql(expectedDetails);
        expect(error.ex).to.be.eql(expectedPreviousError);

        assertStack(error);
    });

    it('CASE 2: Should handle details passed as an array', function () {
        var status = getBadRequest();
        var details = [
            'This is my favourite error message in the whole wide world',
            'Oh yeah, but this is even better',
            'Hahaha, I made you read all of this'
        ];
        var expectedMessage = status.message;
        var expectedErrorObj = status;
        var expectedDetails = details;
        var expectedPreviousError = undefined;

        var error = throwAndCatch(status, details);

        expect(error.message).to.be.eql(expectedMessage);
        expect(error.errorObj).to.deep.eql(expectedErrorObj);
        expect(error.details).to.deep.eql(expectedDetails);
        expect(error.ex).to.be.eql(expectedPreviousError);

        assertStack(error);
    });

    it('CASE 3: Should handle details passed as a string', function () {
        var status = getBadRequest();
        var details = 'I am a lonely error message';
        var expectedMessage = status.message;
        var expectedErrorObj = status;
        var expectedDetails = [details];
        var expectedPreviousError = undefined;

        var error = throwAndCatch(status, details);

        expect(error.message).to.be.eql(expectedMessage);
        expect(error.errorObj).to.deep.eql(expectedErrorObj);
        expect(error.details).to.deep.eql(expectedDetails);
        expect(error.ex).to.be.eql(expectedPreviousError);

        assertStack(error);
    });

    it('CASE 4: Should handle the case when errorObj is invalid', function () {
        var status = undefined;
        var details = 'I am a lonely error message';
        var expectedMessage = 'ProjectError';
        var expectedErrorObj = {};
        var expectedDetails = [details];
        var expectedPreviousError = undefined;

        var error = throwAndCatch(status, details);

        expect(error.message).to.be.eql(expectedMessage);
        expect(error.errorObj).to.deep.eql(expectedErrorObj);
        expect(error.details).to.deep.eql(expectedDetails);
        expect(error.ex).to.be.eql(expectedPreviousError);

        assertStack(error);
    });

    it('CASE 5: Should use previousError stack if it is provided', function () {
        var status = undefined;
        var details = 'I am a lonely error message';
        var previousError = generateErrorInNamedFunctionForTraceability();
        var expectedMessage = 'ProjectError';
        var expectedErrorObj = {};
        var expectedDetails = [details];
        var expectedPreviousError = previousError;

        var error = throwAndCatch(status, details, previousError);

        expect(error.message).to.be.eql(expectedMessage);
        expect(error.errorObj).to.deep.eql(expectedErrorObj);
        expect(error.details).to.deep.eql(expectedDetails);
        expect(error.previousError).to.be.eql(expectedPreviousError);

        // NOTE: For this case, the stack trace will reflect the error when it was created in ProjectError
        var stack = errorStackParser.parse(error);
        expect(stack[0].functionName).to.be.eql('generateErrorInNamedFunctionForTraceability');
        expect(stack[0].lineNumber).to.be.eql(31);
        expect(stack[0].columnNumber).to.be.eql(15);
    });

    it('CASE 6: Should handle different statusObj forms', function () {
        var status = getTooManyRequests();
        var expectedMessage = status.message;
        var expectedErrorObj = status;
        var expectedDetails = [];
        var expectedPreviousError = undefined;

        var error = throwAndCatch(status);

        expect(error.message).to.be.eql(expectedMessage);
        expect(error.errorObj).to.deep.eql(expectedErrorObj);
        expect(error.details).to.deep.eql(expectedDetails);
        expect(error.ex).to.be.eql(expectedPreviousError);

        assertStack(error);
    });
});
