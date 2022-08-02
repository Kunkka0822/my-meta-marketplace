import { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Logo from '../../assets/pngs/logo-w.png';
import LocalStorage from '../../global/LocalStorage';
import useApi from '../../hooks/useApi';
import useFormData from '../../hooks/useFormData';
import authApi from '../../modules/api/auth';
import { useAppDispatch } from '../../store';
import { setSession, setSessionInitial } from '../../store/reducers/session';
import { LoginRequest } from '../../types/requests/auth';
import { RulesType } from '../../types/validation';
import MButton from '../components/MButton';
import ValidationErrorMessage from '../components/ValidationErrorMessage';

const Login = () => {
    const [loading, setLoading] = useState(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const initialData = useMemo(() => ({
        email: '',
        password: '',
    }), [])
    const rules: RulesType<LoginRequest> = {
        email: ['required', 'email'],
        password: ['required']
    }

    const {
        data: formData,
        errors,
        onInput,
        validate
    } = useFormData<LoginRequest>(initialData, rules);

    const { apiErrorHandler } = useApi();
    const handleSubmit = useCallback(() => {
        if (loading) return;
        const result = validate();
        if (!result) {
            setLoading(true);
            authApi.login(formData)
            .then(response => {
                dispatch(setSession(response.session));
                dispatch(setSessionInitial(false));
                LocalStorage.saveToken(response.token);
                toast.success('Login Successfully');

                let Url = new URL(window.location.href);
                const redirect = Url.searchParams.get('redirect');
                if (redirect && redirect !== '/login') {
                    navigate(redirect);
                } else {
                    navigate('/')
                }
            })
            .catch(e => {
                setLoading(false);
                apiErrorHandler(e);
            })
        }
    }, [apiErrorHandler, dispatch, formData, loading, navigate, validate])
    return (
        <div className="w-full flex justify-center">
            <section className="mt-36 max-w-screen-xl">
                <div className="container px-6 py-12 h-full">
                    <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800 gap-x-10">
                        <div className="md:w-8/12 lg:w-6/12 mb-12 md:mb-0">
                            <img
                                src={Logo}
                                className="w-full"
                                alt="Phone"
                            />
                        </div>
                        <div className="grow">
                            <form>
                                <div className="mb-6">
                                    <input
                                        type="text"
                                        className="form-control block w-full px-4 py-2 text-xl font-normal 
                                            text-gray-700 bg-white bg-clip-padding border border-solid 
                                            border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 
                                            focus:bg-white focus:border-blue-600 focus:outline-none"
                                        placeholder="Email address"
                                        onChange={onInput('email')}
                                        value={formData.email}
                                    />
                                    <ValidationErrorMessage
                                        errors={errors.email}
                                        params={{ name: 'Email' }}
                                        rules={rules.email}
                                    />
                                </div>

                                <div className="mb-6">
                                    <input
                                        type="password"
                                        className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 
                                            bg-white bg-clip-padding border border-solid border-gray-300 rounded transition 
                                            ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        placeholder="Password"
                                        value={formData.password}
                                        onChange={onInput('password')}
                                    />
                                    <ValidationErrorMessage 
                                        errors={errors.password}
                                        params={{ name: 'Password' }}
                                        rules={rules.password}
                                    />
                                </div>

                                <div className="flex justify-end items-center mb-6">
                                    <a href="#!"
                                        className="text-green hover:text-darkgreen duration-200 transition ease-in-out"
                                    >
                                        Forgot password?
                                    </a>
                                </div>

                                <MButton
                                    className="inline-block px-7 py-3 bg-green text-white font-medium text-sm leading-snug uppercase 
                                        rounded shadow-md hover:bg-darkgreen hover:shadow-lg focus:bg-darkgreen focus:shadow-lg focus:outline-none focus:ring-0 
                                        active:bg-darkgreen active:shadow-lg transition duration-150 ease-in-out w-full"
                                    data-mdb-ripple="true"
                                    data-mdb-ripple-color="light"
                                    onClick={handleSubmit}
                                    loading={loading}
                                >
                                    Sign in
                                </MButton>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
export default Login;