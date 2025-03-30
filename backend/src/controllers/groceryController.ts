import { Request, Response, NextFunction } from 'express';
import { getProducts } from '../utils/KrogerApi';
import { CleanKrogerProductData } from '../types';
import { combineProductWithNutrinix } from '../utils/NutrinixApi';

export const searchItem = async (req: Request, res: Response, next: NextFunction) => {
    const { searchTerm } = req.body;
    const zipCode: number = 22903; // TODO: get this from the user
    const searchLimit: number = req.body.searchLimit || 10; 
    const searchResults: CleanKrogerProductData  = await getProducts(zipCode, searchTerm, searchLimit);
    // pass through the algorithm 
    // need to somehow get the fitness goal
    const fullData = await combineProductWithNutrinix(searchResults);
    res.status(200).json(fullData);
}