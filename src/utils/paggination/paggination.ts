export function makePagination(pageNumber: string, pageSize: string):
    {skipValue: number, limitValue: number, pageSize: number, pageNumber: number}{

    let pagination: {skipValue: number, limitValue: number, pageSize: number, pageNumber: number} = {
        skipValue: 0,
        limitValue: 0,
        pageSize: 0,
        pageNumber: 0
    }

    typeof pageNumber === 'undefined' && (pageNumber = '1')
    typeof pageSize === 'undefined' && (pageSize = '10')

    const skipValue: number = +pageNumber > 0 ? (+pageNumber - 1) * +pageSize : 0

    const limitValue: number = +pageSize > 0 ? +pageSize : 0

    pagination.skipValue = skipValue
    pagination.limitValue = limitValue
    pagination.pageSize = +pageSize
    pagination.pageNumber = +pageNumber

    return pagination
}