export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

export type ServiceType<S extends (...args: any) => any> = UnwrapPromise<ReturnType<S>>;
