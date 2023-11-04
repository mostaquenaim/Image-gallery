import { useContext, useState } from "react";
import { ImageContext } from "../Contexts/ImageProvider";
import { ThemeContext } from "../Contexts/ThemeProvider";

const NavBarComp = () => {
    // Access context for image data
    const { setImages, initialImages } = useContext(ImageContext);

    // Access context for theme settings
    const { theme, setTheme } = useContext(ThemeContext);

    // Initialize local state
    const [search, setSearch] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    // Handle the search action
    const handleSearch = () => {
        // Filter images based on the search query
        const filteredImages = initialImages.filter((image) =>
            image.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        // Update the displayed images
        setImages(filteredImages);
    };

    // Handle theme toggle action
    const toggleTheme = () => {
        // Toggle between "retro" and "forest" themes
        setTheme(theme === "retro" ? "forest" : "retro");
    };

    return (
        <>
            <div
                data-theme={theme}
                className="navbar bg-base-100 p-5 md:px-20"
            >
                <div className="flex-1">
                    <a href="/" className="bg-transparent normal-case text-xl">
                        <img
                            src="/logo.jpg"
                            className="w-20 rounded-lg border-secondary border-2"
                            alt="Logo"
                        />
                    </a>
                </div>
                <div className="flex-none gap-2 items-center">
                    <div className="form-control flex flex-row items-center gap-4">
                        <div className="relative flex">
                            {/* Search input field for medium/large screens */}
                            <input
                                type="text"
                                placeholder="Search"
                                className="hidden md:inline-block input input-bordered w-24 md:w-auto"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            {/* Search icon for medium/large screens */}
                            <svg
                                onClick={handleSearch}
                                className="hidden md:inline-block cursor-pointer md:absolute right-3 top-2 w-7 h-7"
                                xmlns="http://www.w3.org/2000/svg"
                                x="0px" y="0px"
                                viewBox="0 0 50 50"
                            >
                                <path
                                    d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z"
                                ></path>
                            </svg>
                            {/* Search icon for small screens (toggles search field visibility) */}
                            <svg
                                onClick={() => setSearch(!search)}
                                className="cursor-pointer md:hidden w-7 h-7"
                                xmlns="http://www.w3.org/2000/svg"
                                x="0px" y="0px"
                                viewBox="0 0 50 50"
                            >
                                <path
                                    d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z"
                                ></path>
                            </svg>
                        </div>
                        {/* Theme toggle icon */}
                        <div className="w-10 rounded-full">
                            <label
                                className="swap swap-rotate"
                            >
                                {/* Hidden checkbox controls the state */}
                                <input type="checkbox" onClick={toggleTheme} />

                                {/* Sun icon for light theme */}
                                <svg className="swap-on fill-current w-8 h-8 md:w-10 md:h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <path
                                        d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                                </svg>

                                {/* Moon icon for dark theme */}
                                <svg className="swap-off fill-current w-8 h-8 md:w-10 md:h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <path
                                        d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />

                                </svg>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            {/* Small screen search field */}
            <div className={search ? "flex mx-auto text-center justify-center relative opacity-100" : "opacity-0"}>
                <div className="join md:hidden">
                    {/* Search input field for small screens */}
                    <input
                        className="input input-bordered join-item"
                        placeholder=""
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {/* Search button for small screens */}
                    <button
                        onClick={handleSearch}
                        className="btn join-item rounded-r-full"
                    >
                        Search
                    </button>
                </div>
            </div>
        </>
    );
};

export default NavBarComp;
