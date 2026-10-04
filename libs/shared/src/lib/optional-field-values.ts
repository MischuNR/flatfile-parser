export type OptionalFieldValues<T extends PropertyKey> = {
    [K in T]?: string;
};