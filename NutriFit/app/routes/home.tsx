import { useEffect } from "react";
import NavBar from "../components/navBar";

export default function Home() {
  useEffect(() => {
    document.title = "NutriFit";
  }, []);

  return (
    <div>
      <NavBar/>
    </div>
  );
}
