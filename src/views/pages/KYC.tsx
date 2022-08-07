import { useCallback, useEffect, useState } from "react";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import useApi from "../../hooks/useApi";
import commonApi from "../../modules/api/common";
import { KYCStatus } from "../../types/models/user";

export type KYCCmdParam = {
    cmd: string
}

const KYC = () => {
    const { cmd } = useParams<KYCCmdParam>();
    const [kycStatus, setKycStatus] = useState<KYCStatus>();
    const [loading, setLoading] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();

    const { apiErrorHandler } = useApi();

    const fetchStatus = useCallback(() => {
        if (loading) return;
        setLoading(true);
        commonApi.getKycStatus()
        .then((response: { status: KYCStatus}) => {
            setKycStatus(response.status);
        })
        .catch(apiErrorHandler)
        .finally(() => setLoading(false))
    }, [apiErrorHandler, loading]);

    useEffect(() => {
        if (cmd === 'start') {

        }
    }, [cmd])
    

    return (
        <></>
    )
}
export default KYC;