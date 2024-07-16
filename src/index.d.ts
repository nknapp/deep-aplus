

type ResolveObjectPromises<Type> = {
    [Property in keyof Type]: ResolvePromises<Type[Property]>;
};

export type ResolvePromises<T> =
    T extends Promise<infer U>
        ? ResolvePromises<U>
        : T extends { [key: string]: unknown }
            ? ResolveObjectPromises<T>
            : T extends Array<unknown>
                ? ResolveObjectPromises<T>
                : T;

export declare function deepAplus<T>(obj: T): Promise<ResolvePromises<T>>