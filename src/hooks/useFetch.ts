import {useEffect, useState} from 'react';

import axios from 'axios';

axios.defaults.baseURL = 'https://api.unsplash.com/search/photos';
axios.defaults.headers.common['Authorization'] =
  'Client-ID SPjXoCwzg_HeO5U3O7MDy8mY6yGdhpN9t2ic098Pkp0';
axios.defaults.headers.common['Accept-Version'] = 'v1';

const useFetch = (search: string) => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    setPage(1);
  }, [search]);

  const fetch = () => {
    setIsLoading(true);
    axios({
      method: 'get',
      url: `?page=${page}&query=${search}`,
    })
      .then(function (response) {
        // Save spaces list with initial counts to Redux

        setIsLoading(false);
        setData(response.data.results);
        setPage(page + 1);
      })
      .catch(err => {
        setError(err.message);
        console.log(err.message);
        setIsLoading(false);
      });
  };

  return {data, error, isLoading, refetch: fetch, setError};
};

export default useFetch;
