import {IValidation} from 'typia';

const toType = (value: any) => {
    if (typeof value !== 'object') {
        return JSON.stringify(value);
    }
    if (value === null) {
        return 'null';
    }
    if (Array.isArray(value)) {
        return 'array';
    }
    return 'object';
};

// eslint-disable-next-line import/no-unused-modules
export class TypeValidationError extends Error {
    constructor(public validation: IValidation) {
        const errors = validation.errors
            .map((e) => {
                if (e.expected === 'undefined') {
                    return `${e.path} is not allowed, received ${toType(e.value)}`;
                }
                return `${e.path} received: ${toType(e.value)} expected: ${e.expected}`;
            })
            .join('\n');
        const message = `Type validation failed:\n${errors}`;
        super(message);
    }
}

export const testType = <T>(value: any): value is T => {
    throw new Error('Not Implemented');
};