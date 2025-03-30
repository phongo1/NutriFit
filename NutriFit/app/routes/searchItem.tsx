import { useState } from "react";
import NavBar from "~/components/navBar";
import searchIcon from "~/assets/search.png";
import SearchGetStarted from "~/components/placeHolders/searchGetStarted";
import ProductCard from "~/components/productCard";
import ProductModal from "~/components/productModal";
import { useAccount } from "~/persistence/accountContext";

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
  const { account } = useAccount();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<NutritionItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<NutritionItem | null>(null);

  const handleSearch = async () => {
    if (!query.trim()) return;

    try {
      setError(null);
      console.log(`Searching for: ${query}`);

      const res = await fetch(`http://localhost:3636/api/grocery/searchItem?searchTerm=${query}&goal=${account?.nutritionGoal || "bulking"}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        throw new Error("API request failed");
      }
      const data: NutritionItem[] = await res.json();
      setResults(data);
    } catch (err) {
      console.error(err);
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
