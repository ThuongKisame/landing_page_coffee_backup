import { useRouter } from 'next/router';
import * as React from 'react';
import { BiSearch } from 'react-icons/bi';

export default function App() {
  const router = useRouter();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [text, setText] = React.useState<string>('');

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  React.useEffect(() => {
    inputRef?.current?.focus();
  }, []);

  React.useEffect(() => {
    setText(decodeURIComponent((router?.query?.search as string) || ''));
  }, [router?.query?.search]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push({
      pathname: '/shop',
      query: { search: encodeURIComponent(text) },
    });
  };

  return (
    <form
      onSubmit={handleSearch}
      className="relative right-0 top-0 h-10 w-full"
    >
      <input
        ref={inputRef}
        type="text"
        value={text}
        onChange={handleOnChange}
        id="input-search"
        placeholder="Nhập từ khóa tìm kiếm..."
        className=" h-10 w-full rounded-md border border-gray-600 pl-4 pr-10 opacity-90 shadow focus:border-[#E6B325] focus:outline-none focus:ring-1 focus:ring-[#E6B325] sm:text-sm"
      />
      <button
        type="submit"
        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-300 hover:cursor-pointer hover:text-[#E6B325]"
      >
        <BiSearch size={26} />
      </button>
    </form>
  );
}
