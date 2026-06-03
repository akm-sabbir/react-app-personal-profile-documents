
export const SearchBar = () =>{
    return (<><div class="ml-auto flex items-center gap-4">


        <div class="relative flex items-center">
            <input
                type="text"
                placeholder="Search..."
                class="w-48 sm:w-64 focus:w-96 bg-[#f1f3f5] text-slate-800 pl-4 pr-10 py-1.5 rounded-lg
                border border-orange-300 duration-300 ease-in-out text-sm focus:outline-none focus:border-blue-500
                focus:ring-1 focus:ring-blue-500 transition-all transition-all"
            />

            <svg xmlns="http://w3.org" class="h-4 w-4 absolute right-3 text-slate-400 pointer-events-none"
                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
        </div>


        <button class="bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm py-1.5
                px-4 rounded-lg transition-colors shadow-sm whitespace-nowrap px-[12px] py-[6px]">
            Log In
        </button>

    </div></>);

  }