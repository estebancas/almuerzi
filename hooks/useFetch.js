import { useState, useEffect } from 'react';

useFetch = (url) => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const fetchData = async () => {
        const response = await fetch(url);
        const parsed = await response.json();

        setData(parsed);
        setLoading(false)
    }

    useEffect(() => {
        fetchData();
    }, []);

    return { loading, data }
}

export default useFetch