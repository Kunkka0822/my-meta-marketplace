import { ParcelData } from "../../types/models/parcel";

export type PortfolioItemParams = {
  data?: ParcelData;
};

const Item: React.FC<PortfolioItemParams> = ({ data }) => {
  return (
    <div className="p-4 rounded-lg shadow-sm shadow-indigo-100 bg-gray-50">
      <img
        alt="123 Wallaby Avenue, Park Road"
        src={data?.image}
        className="object-cover w-[340px] h-[340px] rounded-md"
      />

      <div className="mt-4">
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

        <dl className="flex items-center justify-center mt-6 space-x-8 text-xs">
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
              <dt className="text-gray-500">Generation</dt>

              <dd className="font-medium text-darkgreen">Alpha</dd>
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
              <dt className="text-gray-500">Parcel Type</dt>

              <dd className="font-medium">Land</dd>
            </div>
          </div>

          <div className="sm:inline-flex sm:items-center sm:shrink-0">
            <svg
              className="w-5 h-6 text-indigo-700 fill-indigo-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 512 301.57"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M65.11 107.53 253.54 1.15a8.968 8.968 0 0 1 8.82.02l188.27 107.31c4.31 2.45 5.83 7.94 3.38 12.25a8.987 8.987 0 0 1-3.13 3.23L264.6 237.36c-2.99 1.83-6.64 1.69-9.44-.05L64.4 123.34c-4.25-2.55-5.64-8.07-3.09-12.32a8.912 8.912 0 0 1 3.8-3.49zm253.74 176.35c4.79 1.26 7.66 6.19 6.4 10.99-1.26 4.79-6.19 7.66-10.98 6.4l-30.27-8c-4.8-1.26-7.67-6.19-6.4-10.99l8.15-30.84c1.26-4.8 6.18-7.66 10.98-6.4 4.8 1.26 7.67 6.18 6.41 10.98l-2.81 10.61 179.38-103.48-9.85-2.64c-4.8-1.28-7.65-6.22-6.37-11.01 1.28-4.8 6.22-7.66 11.02-6.38l30.81 8.26c4.8 1.28 7.65 6.22 6.37 11.02l-8.1 30.24c-1.28 4.8-6.22 7.65-11.02 6.37-4.8-1.28-7.65-6.22-6.37-11.02l2.49-9.3-178.42 102.92 8.58 2.27zm-115.09 17.38c-4.96.41-9.32-3.28-9.72-8.23-.4-4.96 3.28-9.32 8.24-9.72l9.07-.77-187.91-112.3 2.36 8.82c1.28 4.79-1.57 9.73-6.37 11.01-4.8 1.29-9.74-1.57-11.02-6.37l-8.1-30.23c-1.28-4.8 1.57-9.74 6.37-11.02l30.81-8.26c4.8-1.28 9.74 1.57 11.02 6.37 1.28 4.8-1.57 9.73-6.37 11.02l-10.28 2.75 191.55 114.49-.87-10.23c-.4-4.95 3.28-9.31 8.24-9.71 4.95-.41 9.31 3.28 9.71 8.23l2.7 31.79c.41 4.95-3.28 9.31-8.23 9.72l-31.2 2.64zM257.9 19.29 86.88 115.84l173 103.36L428.5 116.54 257.9 19.29z"
              />
            </svg>

            <div className="sm:ml-3 mt-1.5 sm:mt-0">
              <dt className="text-gray-500">Parcel Size</dt>

              <dd className="font-medium">
                {data?.square}ms<sup>2</sup>
              </dd>
            </div>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default Item;
