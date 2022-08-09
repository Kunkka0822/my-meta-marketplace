import SearchBar from "../components/SearchBar";
import StoreInfo from "../components/StoreInfo";

import { isArray } from "lodash";
import Card from "../components/Card";
import InfiniteScroll from "react-infinite-scroll-component";
import type { ParcelData } from "../../types/models/parcel";
import { useCallback, useEffect, useState } from "react";
import useApi from "../../hooks/useApi";
import parcelApi from "../../modules/api/parcel";
import { BeatLoader } from "react-spinners";
//
const PAGE_SIZE = 30;
const Home = () => {
  const [parcels, setParcels] = useState<ParcelData[]>([]);
  const { apiErrorHandler } = useApi();
  const [loading, setLoading] = useState(false);
  const [init, setInit] = useState(true);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);

  const handleLoad = useCallback(() => {
    if (loading) return;
    setLoading(true);
    parcelApi
      .getListParcels({ page, size: PAGE_SIZE })
      .then((response: ParcelData[]) => {
        setParcels([...parcels, ...response]);
        setHasMore(response.length > 0);
        setPage(page + 1);
      })
      .catch(apiErrorHandler)
      .finally(() => setLoading(false));
  }, [apiErrorHandler, loading, page, parcels]);

  useEffect(() => {
    if (init) {
      setInit(false);
      handleLoad();
    }
  }, [handleLoad, init, page]);

  // const { data: parcels, initial, loading } = useAppSelector<ParcelState>(state => state.parcel);
  // const [ pageState, setPageState ] = useState<Pagination | undefined>();
  // const dispatch = useAppDispatch();

  // if (initial && !loading || parcels && !isArray(parcels)) {
  //   dispatch(getListParcels({}));
  // }

  // useEffect(() => {
  //   if (!initial && !loading && parcels && isArray(parcels) && !pageState) {
  //     setPageState(initPagination(parcels.length));
  //   }
  // }, [initial, loading, pageState, parcels]);

  return (
    <div className="flex">
      <SearchBar />
      <div className=" flex-1 flex flex-col gap-[32px] mt-[64px] sm:ml-[280px] p-[32px]">
        <StoreInfo />
        <InfiniteScroll
          dataLength={parcels.length}
          next={handleLoad}
          style={{
            display: "flex",
            flexDirection: "column",
            overflow: "unset",
          }}
          hasMore={init || hasMore}
          loader={
            <div className="flex justify-center">
              <BeatLoader size={20} color="#007b55" />
            </div>
          }
          scrollableTarget="vet-list"
        >
          <div className="flex flex-wrap gap-[16px] justify-center mb-6">
            {isArray(parcels) &&
              parcels.map((parcel, index) => {
                return <Card key={index} data={parcel} />;
              })}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default Home;
