import React from "react";

interface ProductCardProps {
  serving_qty: number;
  serving_unit: string;
  nf_calories: number;
  nf_saturated_fat: number;
  nf_sodium: number;
  nf_total_carbohydrate: number;
  nf_dietary_fiber: number;
  nf_sugars: number;
  nf_protein: number;
  photo: string;
  rating: number; // out of 100
  brand: string;
  description: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  serving_qty,
  serving_unit,
  nf_calories,
  nf_saturated_fat,
  nf_sodium,
  nf_total_carbohydrate,
  nf_dietary_fiber,
  nf_sugars,
  nf_protein,
  photo,
  rating,
  brand,
  description,
}) => {
  return (
    <div className="p-4 pb-[1rem] bg-white rounded-xl shadow border border-gray-100 flex flex-col gap-4 w-[22rem] h-auto mt-[3rem] cursor-pointer hover:scale-102 transition duration-200 ease-in-out">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-bold text-[var(--color-text)]">{brand}</h1>
        <div className="flex items-center justify-center bg-red-500 text-white font-bold rounded-full w-8 h-8">
          {rating}
        </div>
      </div>{" "}
      <img
        src={photo}
        alt="product"
        className="w-24 h-24 object-contain rounded"
      />
      <h1 className="text-xl font-semibold text-[var(--color-text)]">
        {description.replace(new RegExp(brand, "gi"), "").trim()}
      </h1>
      <div className="flex-1">
        <div className="flex justify-between items-center mb-2">
          <p className="text-sm text-gray-500">
            {serving_qty} {serving_unit} ({nf_calories} cal)
          </p>
        </div>
        <ul className="text-sm text-gray-700 grid grid-cols-2 gap-x-4 gap-y-1">
          <li>Saturated Fat: {nf_saturated_fat}g</li>
          <li>Sodium: {nf_sodium}mg</li>
          <li>Carbs: {nf_total_carbohydrate}g</li>
          <li>Fiber: {nf_dietary_fiber}g</li>
          <li>Sugars: {nf_sugars}g</li>
          <li>Protein: {nf_protein}g</li>
        </ul>
      </div>
    </div>
  );
};

export default ProductCard;
