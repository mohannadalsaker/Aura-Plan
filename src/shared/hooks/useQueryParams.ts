import { debounce } from "@mui/material";
import { useSearchParams } from "react-router-dom";

export const useQueryParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const pageSize = parseInt(searchParams.get("pageSize") || "10", 10);
  const pageNumber = parseInt(searchParams.get("pageNumber") || "1", 10);
  const q = searchParams.get("q") || "";

  const handleChangePageSize = (value: number) => {
    searchParams.set("pageSize", value.toString());
    setSearchParams(searchParams);
  };

  const handleChangePageNumber = (value: number) => {
    searchParams.set("pageNumber", value.toString());
    setSearchParams(searchParams);
  };

  const handleChangeSearch = debounce((value: string) => {
    searchParams.set("q", value);
    searchParams.set("pageNumber", "1");
    setSearchParams(searchParams); // ✅ push changes to URL
  }, 500);

  return {
    q,
    pageNumber,
    pageSize,
    handleChangePageNumber,
    handleChangePageSize,
    handleChangeSearch,
  };
};
