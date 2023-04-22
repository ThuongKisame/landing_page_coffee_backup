import * as React from 'react';
import { BiSearch } from 'react-icons/bi';

export default function App() {
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    inputRef?.current?.focus();
  }, []);

  return (
    <label className="relative right-0 top-0 h-8 w-full">
      <input
        ref={inputRef}
        type="text"
        id="input-search"
        placeholder="Search..."
        className=" h-10 w-full rounded-md border border-gray-600 pl-4 opacity-90 shadow focus:border-[#E6B325] focus:outline-none focus:ring-1 focus:ring-[#E6B325] sm:text-sm"
      />
      <div className="absolute right-2 top-0 text-gray-500 hover:cursor-pointer hover:text-[#E6B325]">
        <BiSearch size={26} />
      </div>
    </label>
  );
}
