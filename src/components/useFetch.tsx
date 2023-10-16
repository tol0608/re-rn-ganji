import {useState, useEffect} from 'react';

export default function useFetch(arrData: RequestInfo) {
  const [data, setData] = useState<any[]>([]); // 데이터의 타입을 적절히 정의해야 합니다.

  async function getData() {
    try {
      const response = await fetch(arrData);
      if (response.ok) {
        const data = await response.json();
        setData(data);
      } else {
        throw new Error('Network response was not ok.');
      }
    } catch (error) {
      // 에러 핸들링
      console.error('An error occurred while fetching data:', error);
    }
  }

  useEffect(() => {
    getData();
  }, [arrData, getData]); // arrData가 변경될 때마다 다시 요청하도록 변경

  return data;
}
