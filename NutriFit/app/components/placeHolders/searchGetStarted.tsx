import searchGetStarted from '../../assets/searchGetStarted.png';

const SearchGetStarted = () => {
    return (
        <>
            <div className="flex flex-col items-center justify-center mt-[1rem]">
                <img src={searchGetStarted} alt="Search Get Started" className='w-[10rem] h-auto mt-[5rem]' />
                <p className='text-lg text-center text-[var(--color-text-secondary)] font-medium mt-10'>Search for a food item to get started</p>
            </div>
        </>
    );
};

export default SearchGetStarted;