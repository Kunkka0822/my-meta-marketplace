export type ValidationErrorType<T> = { [K in keyof T]?: Array<string> };
export type RulesType<T> = { [K in keyof T]?: Array<string> | any }; // Record<keyof T, Array<string>>;
