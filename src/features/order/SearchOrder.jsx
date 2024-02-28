import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchOrder = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    navigate(`/order/${query}`);
    setQuery("");
  };
  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <input
        className="placeholder: w-28 rounded-full bg-yellow-100 px-4 py-2 text-sm transition-all duration-300 placeholder:text-slate-500 focus:outline-none focus:ring focus:ring-yellow-500 sm:w-64 sm:focus:w-72"
        placeholder="Search Order #"
        value={query}
        onChange={(evt) => setQuery(evt.target.value)}
      />
    </form>
  );
};
export default SearchOrder;
