'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator.throw(value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }

      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };

exports.__esModule = true;
var react_1 = require('react');

function useFetch(arrData) {
  const [data, setData] = react_1.useState([]);

  async function fetchData() {
    try {
      const response = await fetch(arrData);

      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }

      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      // 에러 핸들링
      console.error('An error occurred while fetching data:', error);
    }
  }

  react_1.useEffect(() => {
    fetchData();
  }, [arrData]);

  return data;
}

exports.default = useFetch;
