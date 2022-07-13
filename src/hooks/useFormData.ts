import React, { useCallback, useState } from 'react';
import { StatusType } from '../types/common';
import { RulesType, ValidationErrorType } from '../types/validation';
import useValidation from './useValidation';

const useFormData = <T>(formData: T, rules?: RulesType<T>) => {
    const [data, setData] = useState(formData);

    const [errors, setErrors] = useState<ValidationErrorType<T>>({});

    const onInput = useCallback(
        (name: string) =>
            (e: string | React.ChangeEvent<HTMLInputElement> | any) => {
                let value = '';
                if (e.target) {
                    if (e.target.files) {
                        value = e.target.files.length
                            ? e.target.files[0]
                            : null;
                    } else {
                        value = e.target.value;
                    }
                } else {
                    value = e;
                }
                setData(old => ({
                    ...old,
                    [name]: value,
                }));
                setErrors(old => ({ ...old, [name]: [] }));
            },
        []
    );

    const onCheckBoxInput = useCallback(
        (name: keyof T, value?: any) => (e: any) => {
            const { checked } = e.target;
            if (Array.isArray(data[name]) && value !== undefined) {
                const arrayData = data[name] as any;
                const index = arrayData.findIndex(
                    (element: any) => element === value
                );
                if (checked && index < 0) {
                    arrayData.push(value);
                }
                if (!checked && index > -1) {
                    arrayData.splice(index, 1);
                }
                setData({ ...data, [name]: arrayData });
            } else {
                setData({
                    ...data,
                    [name]: checked ? StatusType.ENABLE : StatusType.DISABLE,
                });
            }
            setErrors({ ...errors, [name]: [] });
        },
        [data, errors]
    );

    const { validate } = useValidation(rules);
    const doValidation = useCallback(() => {
        const [result, errors] = validate(data);
        if (result) {
            setErrors(errors as ValidationErrorType<T>);
        }
        return result;
    }, [data, validate]);

    const setSubData = useCallback(
        (subData: Partial<T>) => {
            setData({ ...data, ...subData });
            let tempErrors = errors;

            for (const key in subData) {
                tempErrors = { ...tempErrors, [key]: [] };
            }
            setErrors({ ...tempErrors });
        },
        [data, errors]
    );
    return {
        data,
        errors,
        onInput,
        onCheckBoxInput,
        validate: doValidation,
        setData,
        setSubData,
        setErrors,
    };
};
export default useFormData;
