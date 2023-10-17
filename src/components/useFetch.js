import {useState, useEffect} from 'react';

export default function useFetch(arrData) {
  const [data, setData] = useState([]);

  async function getData() {
    const response = await fetch(arrData);
    const data = await response.json();
    setData(data);
  }

  useEffect(() => {
    getData();
  }, [getData]);

  return data;
}
