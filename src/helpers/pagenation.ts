import { Pagination } from "../types/common"

export const initPagination = (totalPage: number, perPage: number = 20): Pagination => {
    return {
        currentPage: 0,
        lastPage: totalPage > perPage ? perPage - 1 : totalPage - 1,
        perPage,
        total: totalPage
    };
}