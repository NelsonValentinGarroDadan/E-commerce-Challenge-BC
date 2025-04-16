import { Search } from "lucide-react";

export default function SearchBar({ value, onChange }: { value: string, onChange: (value: string) => void }) {
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value); 
  };

  return (
    <div 
        className="flex items-center justify-center w-full max-w-60 gap-1 px-2 text-text bg-background border-1 border-text/60 rounded-sm 
        focus-within:border-text
        !duration-100"
    >
        <label htmlFor="searchBar" className="cursor-pointer">
            <Search className="w-4 h-4"/>
        </label>
        <input
          type="text"
          className="w-full focus:outline-none"
          value={value}
          onChange={handleSearch} 
          id="searchBar"
        />

    </div>
  );
}
