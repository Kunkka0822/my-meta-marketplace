import { useTranslation } from 'react-i18next';
import { extractValiationParams } from '../../modules/lib/validators';

const ValidationErrorMessage = ({
    errors,
    className = '',
    params = {},
    rules = [],
}: {
    errors: Array<string> | undefined;
    className?: string | null;
    params?: any;
    rules?: Array<string> | undefined;
}) => {
    const { t } = useTranslation();
    if (!errors) return <></>;

    params = { ...params, ...extractValiationParams(rules) };

    return (
        <>
            {errors &&
                errors!.length > 0 &&
                errors?.map((error, index) => (
                    <p
                        className={'validation-error-message ' + className}
                        key={index}
                    >
                        {t(error, params)}
                    </p>
                ))}
        </>
    );
};

export default ValidationErrorMessage;
