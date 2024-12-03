import axios from "axios";

function useAxiosInstance() {
  const instance = axios.create({
    baseURL: 'https://11.fesp.shop',
    timeout: 5000,
    headers: {
      'Content-Type': 'application/json', // request의 데이터 타입
      accept: 'application/json', // response의 데이터 타입
      'client-id': '00-nike',
    }
  });

  return instance;
}

export default useAxiosInstance;