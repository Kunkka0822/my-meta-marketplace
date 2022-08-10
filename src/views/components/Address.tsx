import { useMemo } from "react"

const Address = ({ address }: { address?: string}) => {
    const segs = useMemo(() => {
        return address?.split(',').map(item => item.trim());
    }, [address])
    return (
        <>
            {segs?.map(item => (
                <>
                    <span>{item}</span><br />
                </>
            ))}
        </>
    )
}
export default Address;
