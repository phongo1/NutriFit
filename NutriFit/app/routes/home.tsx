import { useEffect } from "react";
import NavBar from "../components/navBar";
import landingPage from "../assets/landingPage.png";
import stepLine from "../assets/stepLine.png"
import { useNavigate } from "react-router";
export default function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "NutriFit";
  }, []);

  return (
    <div className='flex flex-col justify-center items-center pb-[20rem] px-10 gap-30'>
      <NavBar />
      {/* landing section */}
      <div className='flex flex-row justify-between items-center w-[70%]'>
        <div className="flex flex-col w-[24rem] gap-4">
          <h1 className='text-5xl font-bold text-left text-[var(--color-text)]'>Optimize your Health Goals.</h1>
          <p className='text-lg text-left text-[var(--color-text)]'>Get the best branded foods by the macros that matter to you.</p>
          <button 
                className="bg-[var(--color-accent)] text-white font-bold w-[10rem] mt-6 py-2 px-4 rounded hover:scale-105 transition duration-200 shadow-md hover:shadow-lg cursor-pointer" 
                onClick={() => {navigate("/login")}}
            >
                Get Started
          </button>
        </div>
        <img src={landingPage} alt="Landing Page" className='w-[30rem] h-auto' />
      </div>

      {/* "How it Works." section */}
      <div className='flex flex-col items-center justify-center mt-[10rem]'>
        <h1 className='text-5xl font-bold text-left text-[var(--color-text)]'>How it works.</h1>
        <div className='flex flex-col w-auto'>
          <img src={stepLine} className='mt-[5rem]'></img>
          <div className='flex mt-[1rem]'>
            <p className='text-center text-[var(--color-text-secondary)] w-[15rem] ml-[1rem] font-medium'>
              Set your health goal and use our search bar to look for an item
            </p>
            <p className='text-center text-[var(--color-text-secondary)] w-[15rem] ml-[10.5rem] font-medium'>
              Get a ranked list of products that optimize your macro-nutrient needs
            </p>
            <p className='text-center text-[var(--color-text-secondary)] w-[15rem] ml-[9rem] font-medium'>
              Save your most nutritionally fitting foods to your profile for quick access
            </p>
          </div>
        </div>
      </div>

      {/* Nutrition goals section */}
      <div className='flex flex-col gap-[3rem] mt-[13rem] items-center justify-center'>
        <h1 className='text-5xl font-bold text-left text-[var(--color-text)]'>We rank products based off your nutrition goal.</h1>
        <div className='flex flex-row justify-between items-start w-full mt-[4rem]'>
          {/* bulking */}
          <div className='flex flex-col w-[15rem] justify-center items-center gap-3'>
            <h1 className='text-3xl font-bold text-center text-[var(--color-accent)]'>Bulking 🏋️</h1>
            <p className='text-lg text-center text-[var(--color-text)] font-medium'>high-protein, high-calorie foods with a balance of clean carbs and fats.</p>
          </div>
          {/* cutting */}
          <div className='flex flex-col w-[15rem] justify-center items-center gap-3'>
            <h1 className='text-3xl font-bold text-center text-[var(--color-accent)]'>Cutting 🏃‍</h1>
            <p className='text-lg text-center text-[var(--color-text)] font-medium'>High protein, low to moderate carbs, moderate fats, low sugar, low to moderate calories</p>
          </div>
          {/* keto */}
          <div className='flex flex-col w-[15rem] justify-center items-center gap-3'>
            <h1 className='text-3xl font-bold text-center text-[var(--color-accent)]'>Keto  🥑</h1>
            <p className='text-lg text-center text-[var(--color-text)] font-medium'>Moderate protein, low carbs, high fats, very low sugar, moderate calories</p>
          </div>
          {/* Diabetic */}
          <div className='flex flex-col w-[15rem] justify-center items-center gap-3'>
            <h1 className='text-3xl font-bold text-center text-[var(--color-accent)]'>Diabetic 🍬</h1>
            <p className='text-lg text-center text-[var(--color-text)] font-medium'>Moderate protein, low carbs, moderate to high fats, very low sugar, high fiber</p>
          </div>
        </div>
      </div>
    </div>
  );
}
