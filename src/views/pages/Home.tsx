import SearchBar from '../components/SearchBar';
import StoreInfo from '../components/StoreInfo';

import { isArray } from 'lodash';
import Card from '../components/Card';
import PaginationComponent from '../components/Pagination'
import type { ParcelData } from '../../types/models/parcel';
import { useCallback, useEffect, useState } from 'react';
import useApi from '../../hooks/useApi';
import parcelApi from '../../modules/api/parcel';

const PAGE_SIZE = 30;
const Home = () => {
  const [parcels, setParcels] = useState<ParcelData[]>([]);
  const { apiErrorHandler } = useApi();
  const [loading, setLoading] = useState(false);
  const [init, setInit] = useState(true);
  const [page, setPage] = useState<number>(1);

  const handleLoad = useCallback(() => {
    if (loading) return;
    setLoading(true);
    parcelApi.getListParcels({ page, size: PAGE_SIZE })
    .then((response: ParcelData[]) => {
      setParcels(response);
    })
    .catch(apiErrorHandler)
    .finally(() => setLoading(true));
  }, [apiErrorHandler, loading, page])

  useEffect(() => {
    if (init) {
      setInit(false);
      handleLoad();
    }
  }, [handleLoad, init, page])

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
    
    <div className='flex'>
      <SearchBar />
      <div className=' flex-1 flex flex-col gap-[32px] mt-[64px] sm:ml-[280px] p-[32px]'>
        <StoreInfo />
          <div>
            <div className='flex flex-wrap gap-[16px] justify-center mb-6'>
              {
                isArray(parcels) && parcels.map((parcel, index) => {
                  return <Card  key={index} data={parcel}/>
                })
              }
            </div>
          </div>
      </div>
    </div>
  )
}

export default Home;