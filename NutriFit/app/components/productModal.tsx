import React from "react";

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: any;
  product: any
  account: any
}

const ProductModal: React.FC<ProductModalProps> = ({
  isOpen,
  onClose,
  onSave,
  product,
  account
}) => {
  if (!isOpen) return null;

  const {
    nf_metric_uom,
    nf_metric_qty,
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
  } = product;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-xl w-[28rem] p-6 flex flex-col gap-4">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-lg font-bold text-[var(--color-text)]">{brand}</h1>
          <div className="flex items-center justify-center bg-red-500 text-white font-bold rounded-full w-8 h-8">
            {rating}
          </div>
        </div>

        {/* Image */}
        <img
          src={photo}
          alt="product"
          className="w-32 h-32 object-contain rounded self-center"
        />

        {/* Description */}
        <h1 className="text-xl font-semibold text-[var(--color-text)] text-left">
          {description.replace(new RegExp(brand, "gi"), "").trim()}
        </h1>

        {/* Serving + nutrition */}
        <p className="text-sm text-gray-500 text-center flex">
          {nf_metric_qty} {nf_metric_uom} ({nf_calories} cal)
        </p>

        <ul className="text-sm text-gray-700 grid grid-cols-2 gap-x-4 gap-y-1">
          <li>Saturated Fat: {nf_saturated_fat}g</li>
          <li>Sodium: {nf_sodium}mg</li>
          <li>Carbs: {nf_total_carbohydrate}g</li>
          <li>Fiber: {nf_dietary_fiber}g</li>
          <li>Sugars: {nf_sugars}g</li>
          <li>Protein: {nf_protein}g</li>
        </ul>

        {/* Footer */}
        <div className="mt-6 flex justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold bg-gray-200 text-gray-800 rounded hover:bg-gray-300 cursor-pointer"
          >
            Close
          </button>
          <button
            onClick={() => onSave(account.userId, product)}
            className="px-4 py-2 text-sm font-semibold bg-[var(--color-accent)] text-white rounded hover:brightness-110 cursor-pointer"
          >
            Save Item
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
