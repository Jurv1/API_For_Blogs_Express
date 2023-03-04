import {Sort, SortDirection} from "mongodb";

export function queryValidator(sortBy: string, sortDirection: SortDirection): Sort{
    let sort: Sort = {}

    typeof sortBy === 'undefined' ? sortBy = 'createdAt' : sortBy

    sort[sortBy] = -1

    if (sortDirection === 'asc'){
        sort[sortBy] = 1
    }

    return sort

}