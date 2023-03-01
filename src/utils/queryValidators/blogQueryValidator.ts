import {SortDirection} from "mongodb";

export function queryValidator(searchNameTerm: string, sortBy: string, sortDirection: SortDirection, pageNumber: string,
                                    pageSize: string): [searchNameTerm: string, sortBy: string,
                                        sortDirection: SortDirection, pageNumber: string, pageSize: string]{
    typeof searchNameTerm === 'undefined' ? searchNameTerm = 'null' : searchNameTerm
    typeof sortBy === 'undefined' ? sortBy = 'createdAt' : sortBy
    typeof sortDirection === 'undefined' ? sortDirection = 'desc' : sortDirection
    typeof pageNumber === 'undefined'  ? pageNumber = '1' : pageNumber
    typeof pageSize === 'undefined'  ? pageSize = '10' : pageSize
    return [searchNameTerm, sortBy, sortDirection, pageNumber, pageSize]
}