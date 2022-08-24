import { useEffect, useState } from "react"

const useFetch = (getMethod:Function) => {
    
    const [data, setData] = useState<any>()
    const [loading, setLoading] = useState(true)
    const [ error, setError ] = useState('')

    useEffect(()=> {
        getMethod().then(
            (res:any) => {
                setData(res.data.results)
            }
        ).catch(
            (err:any) => {
                setError(err.data?.details)
            }
        ).then(
            setLoading(false)
        )
    },[getMethod])

    return ([ data, loading, error ])
}

export default useFetch