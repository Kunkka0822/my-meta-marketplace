import { ParcelData } from "../../types/models/parcel";

export type PortfolioItemParams = {
  data?: ParcelData;
};

const Item: React.FC<PortfolioItemParams> = ({ data }) => {
  return (
    <div className="w-[350px] p-4 rounded-lg shadow-sm shadow-indigo-100 bg-gray-50">
      <img
        alt="123 Wallaby Avenue, Park Road"
        src={data?.image}
        className="object-cover w-[340px] h-[340px] rounded-md"
      />

      <div className="mt-2">
        <dl>
          <div>
            <dt className="sr-only">Price</dt>

            <dd className="text-sm text-gray-500">
              ${(data?.price || 0) * 0.001}
            </dd>
          </div>

          <div>
            <dt className="sr-only">Address</dt>

            <dd className="font-medium">{data?.address}</dd>
          </div>
        </dl>

        <dl className="flex items-center mt-6 space-x-8 text-xs">
          <div className="sm:inline-flex sm:items-center sm:shrink-0">
            <svg
              className="w-4 h-4 text-indigo-700"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
              />
            </svg>

            <div className="sm:ml-3 mt-1.5 sm:mt-0">
              <dt className="text-gray-500">Parking</dt>

              <dd className="font-medium">2 spaces</dd>
            </div>
          </div>

          <div className="sm:inline-flex sm:items-center sm:shrink-0">
            <svg
              className="w-4 h-4 text-indigo-700"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
              />
            </svg>

            <div className="sm:ml-3 mt-1.5 sm:mt-0">
              <dt className="text-gray-500">Bathroom</dt>

              <dd className="font-medium">2 rooms</dd>
            </div>
          </div>

          <div className="sm:inline-flex sm:items-center sm:shrink-0">
            <svg
              className="w-4 h-4 text-indigo-700"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>

            <div className="sm:ml-3 mt-1.5 sm:mt-0">
              <dt className="text-gray-500">Bedroom</dt>

              <dd className="font-medium">4 rooms</dd>
            </div>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default Item;
