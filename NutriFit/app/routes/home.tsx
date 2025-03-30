import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    document.title = "NutriFit";
  }, []);

  return (
    <div>
      Home
    </div>
  );
}
