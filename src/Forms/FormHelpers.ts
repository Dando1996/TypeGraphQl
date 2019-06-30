export interface FieldValue<T> {
    value: T;
    isValid: boolean;
    errors: string[];
}

export interface FormHelpers {
    get<V = string>(id: string): FieldValue<V | undefined>;
    set<V = any>(id: string, value: V): void;
    validate(): void;
    submit<T = object>( mutate: (input: T) => any ): Promise<any>;
}