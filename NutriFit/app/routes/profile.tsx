import { useState, useEffect } from "react";
import { useAccount } from "~/persistence/accountContext";
import NavBar from "~/components/navBar";
import ProductCard from "~/components/productCard";
import { useNavigate } from "react-router";
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
  const { account, setAccount } = useAccount();
  const [savedItems, setSavedItems] = useState<NutritionItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  
  const navigate = useNavigate();
  useEffect(() => {
    console.log("ACCOUNT:", account);
    if (!account) {
        navigate("/"); // redirect home if not logged in
    }
    const fetchSavedItems = async () => {
      try {
        const res = await fetch(
          `http://localhost:3636/api/user/getSavedItems?userId=${account.userId}`
        );
        if (!res.ok) {
          throw new Error("API error");
        }
        const data: NutritionItem[] = await res.json();
        setSavedItems(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load saved items.");
      }
    };

    fetchSavedItems();
  }, [account]);

  return (
    <div>
      <NavBar />
      <div className="flex flex-col py-[4rem] px-[20rem]">
        <div className="flex justify-between items-center mt-4">
          <h1 className="text-3xl font-bold text-[var(--color-text)]">
            Profile
          </h1>
          <button
            className="text-[var(--color-accent)] font-bold uppercase hover:underline cursor-pointer"
            onClick={() => {
              setAccount(null); // LOG OUT
            }}
          >
            Sign Out
          </button>
        </div>{" "}
        {account ? (
          <>
            <div className="flex flex-col">
              <p className="text-[var(--color-text-secondary)] font-medium">
                Welcome, {account.firstName}!
              </p>
              <p className="text-[var(--color-text-secondary)] font-medium">
                You are currently:{" "}
                <span className="text-[var(--color-accent)] font-bold">
                  {account.fitnessGoal.toUpperCase()}
                </span>
              </p>
            </div>
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
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
