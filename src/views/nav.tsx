import Home from "./pages/Home";
import ParcelDetail from "./pages/parcel/detail";

export enum Guard {
    PUBLIC = 0,
    USER = 1,
};

export type NavItemData = {
    anchor: string;
    to: string;
    component: any;
    guard: Guard;
};

const NavData: Array<NavItemData> = [
    {
        anchor: 'Parcel Detail Page',
        to: '/parcels/:id',
        component: ParcelDetail,
        guard: Guard.PUBLIC,
    },
    {
        anchor: 'HOME, List all parcels',
        to: '/',
        component: Home,
        guard: Guard.PUBLIC,
    }
];

export default NavData;
export const publicPaths = NavData.filter(({ guard }) => guard === Guard.PUBLIC);

export const isPublicPath = (path: string) =>
    publicPaths.findIndex(({ to }) => to === path) > -1;

// export const GetNavItemFromPath = (path: string) => {
//     for (let i = NavData.length - 1; i >= 0; i --) {
//         if (matchPath(path, { path: NavData[i].to })) return NavData[i];
//     }
// }