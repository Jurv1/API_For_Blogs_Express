import {Document} from "mongodb";

export function filterQueryValid(searchNameTerm?: string, searchLoginTerm?: string, searchEmailTerm?: string): Document{
    let filter: Document = {}

    typeof searchNameTerm === 'undefined' ? console.log("No Name Term") : filter.name =
        { $regex: searchNameTerm, $options: "i" }

    if(searchLoginTerm || searchEmailTerm ){
        filter.$or = []
        typeof searchLoginTerm === 'undefined'  ? console.log("No Login Term") : filter.$or.push({ login:
                { $regex: searchLoginTerm, $options: "i" } })
        typeof searchEmailTerm === 'undefined' ? console.log("No Email Term") : filter.$or.push({ login:
                { $regex: searchEmailTerm, $options: "i" } })
    }

    return filter
}