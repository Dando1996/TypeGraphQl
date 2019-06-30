import React from 'react';
import { FormHelpers } from './FormHelpers';

export const FormContext = React.createContext<FormHelpers>({
    get: () => ({value: undefined, errors: [''], isValid: true}),
    set: () => null,
    validate: () => null,
    submit: () => Promise.resolve()
});