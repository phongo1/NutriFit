import { useEffect } from "react";
import NavBar from "../components/navBar";

export default function Home() {
  useEffect(() => {
    document.title = "NutriFit";
  }, []);

  return (
    <div className='flex flex-col justify-center items-center pb-10 px-10'>
      <NavBar />
      HELLO
    </div>
  );
}
