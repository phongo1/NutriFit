import { useState, useEffect } from "react";
import { useAccount } from "~/persistence/accountContext";
import NavBar from "~/components/navBar";
import ProductCard from "~/components/productCard";

interface NutritionItem {
  description: string;
  price: number;
  upc: string;
  brand: string;
  serving_weight_grams: number | null;
  nf_metric_qty: number;
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
  nf_calories: number;
}

export default function Profile() {
  const { account } = useAccount();
  const [savedItems, setSavedItems] = useState<NutritionItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate a GET request to fetch saved items for the user
    const fetchSavedItems = async () => {
      try {
        await new Promise((res) => setTimeout(res, 500));

        // Mock saved items data
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
            nf_calories: 120,
            nf_saturated_fat: 3,
            nf_protein: 8,
            nf_total_carbohydrate: 12,
            nf_dietary_fiber: 0,
            nf_sugars: 12,
            nf_sodium: 105,
            nf_cholesterol: 20,
            photo:
              "https://assets.syndigo.com/143d8d9c-c0f7-441f-8bab-8ee97a903d15",
            rating: 85,
          },
          {
            description: "Harris Teeter 2% Reduced Fat Milk",
            price: 3.79,
            upc: "072036738059",
            brand: "Harris Teeter",
            serving_weight_grams: null,
            nf_calories: 150,
            nf_metric_qty: 240,
            nf_metric_uom: "ml",
            nf_total_fat: 5,
            nf_saturated_fat: 3,
            nf_protein: 8,
            nf_total_carbohydrate: 12,
            nf_dietary_fiber: 0,
            nf_sugars: 12,
            nf_sodium: 105,
            nf_cholesterol: 20,
            photo:
              "https://assets.syndigo.com/f4ecad91-138d-4f88-9b49-bedc62814990",
            rating: 85,
          },
        ];
        setSavedItems(mockResults);
      } catch (err) {
        setError("Failed to load saved items.");
      }
    };

    fetchSavedItems();
  }, [account]);

  return (
    <div>
      <NavBar />
      <div className="flex flex-col py-[4rem] px-[20rem]">
        <h1 className="text-3xl font-bold text-[var(--color-text)]">Profile</h1>
        {account ? (
          <>
            <p className="text-xl text-[var(--color-text-secondary)] mt-2">
              Welcome, {account.name}!
            </p>
            {account.nutritionGoal && (
              <div className="mt-1 text-lg flex gap-2">
                  <p className="text-[var(--color-text-secondary)]">
                    Nutritional Goal:
                  </p>
                  <p className="text-[var(--color-accent)] font-semibold">
                    {account.nutritionGoal.toUpperCase()}
                  </p>
              </div>
            )}
          </>
        ) : (
          <p className="text-xl text-[var(--color-text-secondary)] mt-2">
            No account found.
          </p>
        )}

        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-[var(--color-text)]">
            Saved Items
          </h2>
          <p className="text-md text-[var(--color-text-secondary)] mt-1">
            Browse your saved nutritional items below.
          </p>
          {error && <p className="text-red-500 mt-2">{error}</p>}
          {!error && savedItems.length === 0 && (
            <p className="text-gray-500 mt-2">You have no saved items.</p>
          )}
          <div className="mt-4 flex flex-wrap gap-8 w-full">
            {savedItems.map((item) => (
              <ProductCard
                key={item.upc}
                serving_qty={item.nf_metric_qty}
                serving_unit={item.nf_metric_uom}
                nf_calories={
                  item.nf_total_fat * 9 +
                  item.nf_protein * 4 +
                  item.nf_total_carbohydrate * 4
                }
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
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
