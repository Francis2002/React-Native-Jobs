import { useState, useEffect } from "react";
import axios from "axios";

const rapidapikey = process.env.EXPO_PUBLIC_RAPID_API_KEY;

const useFetch = (endpoint, query) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const options = {
        method: 'GET',
        url: `https://jsearch.p.rapidapi.com/${endpoint}`,
        headers: {
          'X-RapidAPI-Key': rapidapikey,
          'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
        },
        params: {...query}
    };
    
    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await axios.request (options);
            setData(response.data.data);
            setIsLoading(false);
        } catch (err) {
            setError(err);
            alert("There was an error fetching data");
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const refetch = () => {
        setIsLoading(true);
        fetchData();
    }

    return { data, isLoading, error, refetch };
}

export default useFetch;
        
