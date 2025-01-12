export type ApiResponse<T> = {
    data: T;
    meta: {
        currentPage: number
        totalPages: number
        total: number
    }
}