import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { requestErrorHandler } from '../global/Api';
import { showError } from '../helpers/error';
import { useAppDispatch } from '../store';
import { signOut } from '../store/reducers/session';

const useApi = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const apiErrorHandler = useCallback(
        (error: any) => {
            requestErrorHandler(error, (e: any) => {
                showError(e);
                if (
                    (e.response &&
                        (e.response.status === 401 ||
                            e.response.status === 403)) ||
                    e.status === 401 ||
                    e.status === 403
                ) {
                    let loginUrl;
                    loginUrl = '/login'
                    dispatch(signOut());
                    navigate(loginUrl);
                }
            });
        },
        [dispatch, navigate]
    );

    return {
        apiErrorHandler,
    };
};
export default useApi;
