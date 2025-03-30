import { useState } from "react";
import NavBar from "~/components/navBar";
import searchIcon from "~/assets/search.png";
import SearchGetStarted from "~/components/placeHolders/searchGetStarted";
import ProductCard from "~/components/productCard";
import ProductModal from "~/components/productModal";

interface NutritionItem {
  description: string;
  price: number;
  upc: string;
  brand: string;
  serving_weight_grams: number | null;
  nf_metric_qty: number;
  nf_calories: number;
  nf_metric_uom: string;
  nf_total_fat: number;
  nf_saturated_fat: number;
  nf_protein: number;
  nf_total_carbohydrate: number;
  nf_dietary_fiber: number;
  nf_sugars: number;
  nf_sodium: number;
  nf_cholesterol: number;
  photo: string;
  rating: number;
}

export default function SearchItem() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<NutritionItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<NutritionItem | null>(null);

  const handleSearch = async () => {
    if (!query.trim()) return;

    try {
      setError(null);

      console.log(`Searching for: ${query}`);

      const mockResults: NutritionItem[] = [
        {
          description: "Harris Teeter™ 2% Reduced Fat Milk",
          price: 2.19,
          upc: "072036738134",
          brand: "Harris Teeter",
          serving_weight_grams: null,
          nf_metric_qty: 240,
          nf_metric_uom: "ml",
          nf_total_fat: 5,
          nf_saturated_fat: 3,
          nf_calories: 150,
          nf_protein: 8,
          nf_total_carbohydrate: 12,
          nf_dietary_fiber: 0,
          nf_sugars: 12,
          nf_sodium: 105,
          nf_cholesterol: 20,
          photo: "https://assets.syndigo.com/143d8d9c-c0f7-441f-8bab-8ee97a903d15",
          rating: 85,
        },
        {
          description: "Harris Teeter 2% Reduced Fat Milk",
          price: 3.79,
          upc: "072036738059",
          brand: "Harris Teeter",
          serving_weight_grams: null,
          nf_metric_qty: 240,
          nf_metric_uom: "ml",
          nf_calories: 160,
          nf_total_fat: 5,
          nf_saturated_fat: 3,
          nf_protein: 8,
          nf_total_carbohydrate: 12,
          nf_dietary_fiber: 0,
          nf_sugars: 12,
          nf_sodium: 105,
          nf_cholesterol: 20,
          photo: "https://assets.syndigo.com/f4ecad91-138d-4f88-9b49-bedc62814990",
          rating: 85,
        },
      ];

      setResults(mockResults);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <>
      <NavBar />
      <div className="flex flex-col items-center justify-start pt-[8rem] px-4 min-h-screen">
        <div className="relative w-full max-w-xl">
          <img
            src={searchIcon}
            alt="search"
            className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 opacity-50"
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search for an item"
            className="w-full pl-12 pr-4 py-4 rounded-full shadow-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-[var(--color-text)] bg-white"
          />
        </div>

        {error && <p className="text-red-500 mt-4">{error}</p>}

        {!error && results.length === 0 && (
          <div className="mt-12">
            <SearchGetStarted />
          </div>
        )}

        {results.length > 0 && (
          <div className="mt-6 w-full self-center flex flex-wrap items-center justify-center gap-10">
            {results.map((item) => (
              <div
                key={item.upc}
                onClick={() => setSelectedProduct(item)}
                className="cursor-pointer"
              >
                <ProductCard
                  serving_qty={item.nf_metric_qty}
                  serving_unit={item.nf_metric_uom}
                  nf_calories={item.nf_calories}
                  nf_saturated_fat={item.nf_saturated_fat}
                  nf_sodium={item.nf_sodium}
                  nf_total_carbohydrate={item.nf_total_carbohydrate}
                  nf_dietary_fiber={item.nf_dietary_fiber}
                  nf_sugars={item.nf_sugars}
                  nf_protein={item.nf_protein}
                  photo={item.photo}
                  rating={item.rating}
                  brand={item.brand}
                  description={item.description}
                />
              </div>
            ))}
          </div>
        )}

        <ProductModal
          isOpen={!!selectedProduct}
          product={selectedProduct!}
          onClose={() => setSelectedProduct(null)}
          onSave={() => {
            console.log("Saved:", selectedProduct);
            setSelectedProduct(null);
          }}
        />
      </div>
    </>
  );
}
