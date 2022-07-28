import React, { PropsWithChildren } from 'react';
import { useNavigate } from 'react-router';
import { BeatLoader } from 'react-spinners';

type ButtonProps = PropsWithChildren<{
    onClick?: any;
    loading?: boolean;
    to?: string;
    loaderColor?: string
}> &
    React.ButtonHTMLAttributes<HTMLButtonElement>;

const MButton: React.FC<ButtonProps> = ({
    onClick = undefined,
    loading = false,
    to = '/',
    children,
    loaderColor,
    ...rest
}) => {
    const navigate = useNavigate();

    return (
        <button
            type="button"
            className="primary-btn"
            onClick={onClick ? onClick : () => navigate(to)}
            {...rest}
        >
            <BeatLoader size={10} color={loaderColor ? loaderColor : "#eee"} loading={loading} />
            {!loading && children}
        </button>
    );
};

export default MButton;
