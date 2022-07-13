import { useMemo } from "react";
import { useLocation } from "react-router";

const useQuery = () => {
    const { search } = useLocation();
    const query = useMemo(() => new URLSearchParams(search), [search]);
    return query;
}
export default useQuery;