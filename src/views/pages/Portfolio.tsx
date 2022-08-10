import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper";
import Item from "../components/PortfolioItem";
import { useAppDispatch } from "../../store";
import { useCallback, useEffect, useState } from "react";
import parcelApi from "../../modules/api/parcel";
import { ParcelData } from "../../types/models/parcel";
import useApi from "../../hooks/useApi";

import "swiper/css";
import "swiper/css/pagination";
import "./portfolio.css";
import { BeatLoader } from "react-spinners";
import { isArray } from "lodash";

export default function Portfolio() {
  const { apiErrorHandler } = useApi();
  const [parcels, setParcels] = useState<ParcelData[]>([]);
  const [init, setInit] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleLoad = useCallback(() => {
    if (loading) return;
    setLoading(true);
    parcelApi
      .myParcels()
      .then((response: ParcelData[]) => {
        setParcels([...parcels, ...response]);
      })
      .catch(apiErrorHandler)
      .finally(() => setLoading(false));
  }, [apiErrorHandler, loading, parcels]);

  useEffect(() => {
    if (init) {
      setInit(false);
      handleLoad();
    }
  }, [init, handleLoad]);

  return (
    <div className="max-w-[1500px] mx-auto">
      {loading ? (
        <div className="flex justify-center my-10">
          <BeatLoader size={20} color="#007b55" />
        </div>
      ) : isArray(parcels) && parcels.length ? (
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={true}
          modules={[EffectCoverflow, Pagination]}
          className="w-[100%]"
        >
          {parcels.map((parcel: ParcelData, index: number) => (
            <SwiperSlide key={index}>
              <Item data={parcel} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="flex justify-center my-10">No Items</div>
      )}
    </div>
  );
}
