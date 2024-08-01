import SearchIcon from "@mui/icons-material/Search";
import AddSnippetButton from "./AddSnippetButton";

const SearchBar = () => {
  return (
    <div className="relative pl-3 w-[60%] h-[40px] bg-slate-100 rounded-3xl flex items-center gap-2">
      <SearchIcon className="text-blue-600" sx={{ fontSize: 14 }}></SearchIcon>
      <input
        placeholder="Search a snippet..."
        className="w-[70%] outline-none text-sm bg-slate-100 text-slate-500"
      ></input>
      <AddSnippetButton></AddSnippetButton>
    </div>
  );
};

export default SearchBar;
