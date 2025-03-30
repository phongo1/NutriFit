import { Request, Response, NextFunction } from 'express';

export const searchItem = (req: Request, res: Response, next: NextFunction) => {

    const { searchTerm } = req.body;
    // use the search term in the kroger search filter.term=milk
    // limit the search to about 20-50 filter.limit=1-50
    // brand filter.brand=brand

    // get the price
    // get the upc x
}