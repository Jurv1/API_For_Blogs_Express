import {NextFunction, Request, RequestHandler, Response} from "express";
import {SortDirection} from "mongodb";

export default (req: Request|Request<{}, {}, {}, {searchNameTerm: string, sortBy: string,
    sortDirection: SortDirection, pageNumber: string, pageSize: string}>|Request<{}, {}, {}, {searchLoginTerm: string, searchEmailTerm: string, sortBy: string,
    sortDirection: SortDirection, pageNumber: string, pageSize: string}, {}>, res: Response, next: NextFunction) => {
    const hashText = (req.headers.authorization || '').replace(/Basic\s?/, '')
    if (hashText) {
        try {
            let b64string: string = hashText
            const [login, password] = Buffer.from(b64string, 'base64').toString().split(":")
            if (login === "admin" && password === "qwerty") {
                next()
            }
            else {
                res.status(401).json(
                    {message: 'Нет доступа'}
                )
            }
        } catch (err) {
            return res.status(401).json(
                {message: 'Нет доступа'}
            )
        }
    } else {
        return res.status(401).json({
            message: 'Нет доступа'
        })
    }
}