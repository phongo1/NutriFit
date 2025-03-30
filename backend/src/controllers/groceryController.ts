import { Request, Response, NextFunction } from 'express';
import { getProducts } from '../utils/KrogerApi';
import { CleanKrogerProductData } from '../types';

export const searchItem = async (req: Request, res: Response, next: NextFunction) => {

    const { searchTerm } = req.body;
    const zipCode: number = 22903; // TODO: get this from the user
    const searchLimit: number = req.body.searchLimit || 10; 
    const searchResults: CleanKrogerProductData  = await getProducts(zipCode, searchTerm, searchLimit);
    

    // use the search term in the kroger search filter.term=milk
    // limit the search to about 20-50 filter.limit=1-50
    // brand filter.brand=brand

    // get the price
    // get the upc x
}