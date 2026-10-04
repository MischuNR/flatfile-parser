export type RequiredFieldValues<T extends PropertyKey> = {
    [K in T]: string;
};