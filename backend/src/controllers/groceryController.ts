import { Request, Response, NextFunction } from 'express';
import { getProducts } from '../utils/KrogerApi';
import { CleanKrogerProductData, FullyFinishedProduct } from '../types';
import { combineProductWithNutrinix } from '../utils/NutrinixApi';
// import { getScore } from '../../helpers/scoreAlgorithms';

interface RequestBody {
    searchTerm: string;
    searchLimit: string;
  }

interface RequestBody {
    searchTerm: string;
    searchLimit: string;
  }

export const searchItem = async (req: Request, res: Response, next: NextFunction) => {
    const searchTerm  = req.body.searchTerm;
    console.log(searchTerm);
    const zipCode: number = 22903; // TODO: get this from the user
    const searchLimit: number = req.body.searchLimit || 10; 
    const searchResults: CleanKrogerProductData  = await getProducts(zipCode, searchTerm, searchLimit);
    const almostFullData = await combineProductWithNutrinix(searchResults);
    const fullData: FullyFinishedProduct[] = [];

    // pass through the algorithm 
    // need to somehow get the fitness goal
    const goal: string = req.body.goal;
    for (const product of almostFullData) {
        const rating = getScore(goal, product);
        const fullProduct: FullyFinishedProduct = {
            "description": product.description,
            "price": product.price,
            "upc": product.upc,
            "brand": product.brand,
            "serving_weight_grams": product.serving_weight_grams,
            "nf_metric_qty": product.nf_metric_qty,
            "nf_metric_uom": product.nf_metric_uom,
            "nf_total_fat": product.nf_total_fat,
            "nf_saturated_fat": product.nf_saturated_fat,
            "nf_protein": product.nf_protein,
            "nf_total_carbohydrate": product.nf_total_carbohydrate,
            "nf_dietary_fiber": product.nf_dietary_fiber,
            "nf_sugars": product.nf_sugars,
            "nf_sodium": product.nf_sodium,
            "nf_cholesterol": product.nf_cholesterol,
            "photo": product.photo,
            "rating": rating
        }
        fullData.push(fullProduct);
    }
    
    res.status(200).json(fullData);
    return fullData;
}