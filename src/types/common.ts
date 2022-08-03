export type nstring = string | number | undefined;
export type ID = string;

export type Pagination = {
    currentPage: number;
    lastPage: number;
    size: number;
    total: number;
};

export type PageData<T> = Pagination & {
    data: Array<T>;
};

export type PageParam<T = {}> = T & {
    page?: number;
    size?: number;
    offset?: number;
};

export type Status = 'ACTIVE' | 'INACTIVE';

export type AppErrorType = {
    name: string;
    message: string;
};

export type ErrorType =
    | Array<string>
    | string
    | null
    | Array<AppErrorType>
    | AppErrorType
    | any;

export type ToastOptionType = {
    position:
        | 'top-left'
        | 'top-right'
        | 'top-center'
        | 'bottom-right'
        | 'bottom-center';
    autoClose: number;
    hideProgressBar: boolean;
    closeOnClick: boolean;
    pauseOnHover: boolean;
    draggable: boolean;
};
export type CurrentUserType = {
    name: string;
    email: string;
};

export type Pager<T = Object> = { page: number; size: number } & T;

export enum SORT_DIRECTION {
    DESC = 'desc',
    ASC = 'asc',
}
export type Sorter<T> = {
    sortCol?: string | any;
    sortDirection?: 'desc' | 'asc';
} & T;

export enum StatusType {
    DISABLE = 0,
    ENABLE = 1,
}

export type SerializableFileType = {
    id?: ID;
    name?: string;
    uri: string;
    size?: number;
    type?: string;
    lastModified?: any;
};
export type ParamType = {
    id: string;
};

export enum GenderType {
    MALE = 1,
    FEMALE = 0,
}

export enum MediaType {
    TYPE_IMAGE = 'image',
    TYPE_VIDEO = 'video',
    TYPE_FILE = 'file',
}
