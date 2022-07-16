import SearchBar from '../components/SearchBar';
import StoreInfo from '../components/StoreInfo';

import { useAppDispatch, useAppSelector } from '../../store';
import { getListParcels, ParcelState } from '../../store/reducers/parcel';
import { isArray } from 'lodash';
import Card from '../components/Card';
import { useEffect, useState } from 'react';
import { Pagination } from '../../types/common';
import { initPagination } from '../../helpers/pagenation';
import PaginationComponent from '../components/Pagination';

const Home = () => {
  const { data: parcels, initial, loading } = useAppSelector<ParcelState>(state => state.parcel);
  const [ pageState, setPageState ] = useState<Pagination | undefined>();
  const dispatch = useAppDispatch();

  if (initial && !loading || parcels && !isArray(parcels)) {
    dispatch(getListParcels({}));
  }

  useEffect(() => {
    if (!initial && !loading && parcels && isArray(parcels) && !pageState) {
      setPageState(initPagination(parcels.length));
    }
  }, [initial, loading, parcels]);

  return (
    
    <div className='flex'>
      <SearchBar />
      <div className=' flex-1 flex flex-col gap-[32px] mt-[64px] sm:ml-[280px] p-[32px]'>
        <StoreInfo />
        {!initial && 
          <div>
            <div className='flex flex-wrap gap-[16px] justify-center mb-6'>
              {
                isArray(parcels) && parcels.map((parcel, index) => {
                  return <Card  key={index} data={parcel}/>
                })
              }
            </div>
            { pageState && pageState.perPage > pageState.total &&
              <PaginationComponent state={pageState}/>
            }
          </div>
        }
      </div>
    </div>
  )
}

export default Home;