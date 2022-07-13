import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { applyValidation } from '../modules/lib/validators';
import { RulesType, ValidationErrorType } from '../types/validation';

const useValidation = <T>(rules?: RulesType<T>) => {
    const { t } = useTranslation();
    const validate = useCallback(
        (data: T) => {
            if (!rules) return [false, []];
            let errors: ValidationErrorType<T> = {};
            let result = false;
            for (const key in rules) {
                const ruleItems = rules[key as keyof T];
                const value = data[key as keyof T];

                errors[key] = [];
                for (const rule of ruleItems) {
                    const error = applyValidation(rule, value);
                    if (error) {
                        result = true;
                        errors[key]!.push(error);
                    } else {
                        if (rule.startsWith('passwordConfirm')) {
                            if (value !== data['password' as keyof T]) {
                                errors[key]!.push(t('Please confirm password'));
                                result = true;
                            }
                        }
                    }
                }
            }

            return [result, errors];
        },
        [rules, t]
    );
    return {
        validate,
    };
};

export default useValidation;
