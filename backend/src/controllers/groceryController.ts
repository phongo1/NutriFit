import { Request, Response, NextFunction } from 'express';
import { getProducts } from '../utils/KrogerApi';
import { CleanKrogerProductData, FullyFinishedProduct } from '../types';
import { combineProductWithNutrinix } from '../utils/NutrinixApi';
import { getScore } from '../../helpers/scoreAlgorithms';

export const searchItem = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const searchTerm = req.query.searchTerm as string;
    if (!searchTerm) {
        res.status(400).json({ error: "Search term is required" });
        return;
    }

    const zipCode: number = 22903;
    const searchLimit: number = req.body.searchLimit || 2; 
    const searchResults: CleanKrogerProductData  = await getProducts(zipCode, searchTerm, searchLimit);
    const almostFullData = await combineProductWithNutrinix(searchResults);
    const fullData: FullyFinishedProduct[] = [];

    const goal = req.query.goal as string;
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
            "nf_calories": product.nf_calories,
            "rating": rating
        }
        fullData.push(fullProduct);
    }

    const sortedProducts = fullData.sort((a, b) => {
        const ratingA = a.rating ?? -Infinity; 
        const ratingB = b.rating ?? -Infinity; 
    
        return ratingB - ratingA; 
    });
    
    res.status(200).json(sortedProducts);
}