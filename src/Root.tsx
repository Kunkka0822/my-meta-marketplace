import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { BounceLoader } from "react-spinners";
import { toast } from "react-toastify";
import LocalStorage from "./global/LocalStorage";
import commonApi from "./modules/api/common";
import { useAppDispatch, useAppSelector } from "./store";
import { getSession, setSession, setSessionInitial, setSessionLoading } from "./store/reducers/session";
import { sessionSelector } from "./store/selectors/session";
import { isPublicPath } from "./views/nav";

const Root = (props: any) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [displayEnabled, setDisplayEnabled] = useState(false);
    const { data: session, loading: sessionLoading, initial } = useAppSelector(sessionSelector);

    const signinHash = useCallback((hash: string) => {
        dispatch(setSessionLoading(true));
        commonApi.signinWithHash(hash)
        .then(response => {
            dispatch(setSession(response.session));
            LocalStorage.saveToken(response.token);
            navigate(location.pathname);
        })
        .catch(e => {
            console.log(e);
            toast.error(e.message);
        })
        .finally(() => {
            dispatch(setSessionLoading(false));
            dispatch(setSessionInitial(false));
        })
    }, [dispatch, location.pathname, navigate])

    useEffect(() => {
        const token = LocalStorage.getToken();
        let Url = new URL(window.location.href);
        const hash = Url.searchParams.get('hash');
        if (isPublicPath(location.pathname)) {
            if (hash && initial) {
                if (session) {
                    LocalStorage.removeToken();
                    dispatch(setSession(null));
                }
                signinHash(hash)
                return;
            } else if (!session && !sessionLoading && initial && token) {
                dispatch(getSession());
            } 
            setDisplayEnabled(true);
        } else {
            if (!token && !sessionLoading && !session) {
                navigate(`/login?redirect=${location.pathname}`)
                return;
            }
            if (session || sessionLoading) {
                setDisplayEnabled(true);
                return;
            }
            if (token) {
                dispatch(getSession());
                return;
            }
            if (hash) {
                signinHash(hash)
                return;
            }
            setDisplayEnabled(false);
        }
    }, [dispatch, initial, location.pathname, navigate, session, sessionLoading, signinHash])

    if (!displayEnabled) {
        return (
            <div className="w-full h-screen flex justify-center items-center">
                <BounceLoader size={100} color="#007b55" />
            </div>
        )
    } else {
        return <>{props.children}</>
    }
}
export default Root;