import {SortDirection} from "mongodb";
import {SortOrder} from "mongoose";

export function queryValidator(sortBy: string, sortDirection: SortDirection): { [key: string]: SortOrder; }{


    typeof sortBy === 'undefined' ? sortBy = 'createdAt' : sortBy
    let sort: { [key: string]: SortOrder } = {[sortBy]: "desc"}

    if (sortDirection === 'asc'){
        sort[sortBy] = "asc"
    }

    return sort

}