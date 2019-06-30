import React, { Component, ReactElement, ReactNode } from 'react'
import { FormContext } from './FormContext';
import { FormHelpers, FieldValue } from './FormHelpers';

interface FormProps<T, R=any> {
    createInput: (...args: any[]) => T;
    children: ReactElement | ReactElement[] | ((state: FormState<T>) => ReactNode);
}

interface FormState<T> {
    input: T;
    errors: string[];
}

export default class Form extends Component {

    constructor(props) {
        super(props);

        this.state = {
            input: props.createInput,
            errors: []
        }
    }

    get = (id: string) => {
        const value: string = "some value";
        const isValid = true;
        const errors = [''];

        const result: FieldValue<string> = { value, isValid, errors};
        return result;
    };

    set = (id: string, value: any) => {}


    formHelpers: FormHelpers = {
        get: this.get,
        set: this.set,
    }

    render() {
        const { children } = this.props;
        return (
            <FormContext.Provider value={this.formHelpers}>
                <div>
                    {typeof children === 'function' ? children(this.state) : children}
                    </div>
            </FormContext.Provider>
        )
    }
}
