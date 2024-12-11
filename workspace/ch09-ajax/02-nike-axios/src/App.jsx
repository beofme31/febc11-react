import { useCallback, useEffect, useState } from "react";
import Product from "./Product";
import Shipping from "./Shipping";
import { DotLoader } from 'react-spinners';
import useAxiosInstance from "@hooks/useAxiosInstance";
import { Slide, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [data, setData] = useState(); // 1(마운트)
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const axios = useAxiosInstance();

  const fetchData = async (_id) => {
    setIsLoading(true);
    try{
      // const res = await axios.get(`/products/${_id}`, { params: { delay: 1000 } });
      const res = await axios.get(`/products/${_id}`);
      setData(res.data.item); // 4번(마운트 후)
      setError(null);
    }catch(err){ // network 에러, 4xx, 5xx 응답일 경우
      setError(err);
      setData(null);
    }finally{
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(7); // 3번(마운트 후)
  }, []); // 마운트 된 이후에 최초 한번만 실행

  const basicShippingFees = 3000;

  const [quantity, setQuantity] = useState(1);
  const [shippingFees, setShippingFees] = useState(basicShippingFees);

  // 수량이 변경되면 배송비 다시 계산
  const handleQuantityChange = (e) => {
    const newQuantity = Number(e.target.value);
    setShippingFees(basicShippingFees * Math.ceil(newQuantity / 5));
    setQuantity(newQuantity);
  };

  const handlePayment = useCallback(() => {
    alert(`배송비 ${ shippingFees }원이 추가됩니다. 상품을 결제하시겠습니까?`);
  }, [shippingFees]);

  // return <h1></h1> // 2번(마운트)
  return (
    <>
      <h1>02 Nike 상품 상세 조회 - Axios</h1>
      { isLoading && <DotLoader /> }
      {/* { error && <p>{ error.message }</p> } */}
      { data && (
        <div>
          <Product product={ data } />
          <h2>수량 선택</h2>
          <div>
            가격: { data.price.toLocaleString() }원<br/>
            수량: <input type="number" min="1" max={ data.quantity - data.buyQuantity } 
                    value={ quantity } onChange={ handleQuantityChange } />
            (배송비는 5개당 { basicShippingFees.toLocaleString() }원씩 추가됩니다.)<br/>
            상품 금액: { (data.price * quantity).toLocaleString() }원
          </div>
          <Shipping fees={ shippingFees } handlePayment={ handlePayment } />
        </div>
      ) }
      <ToastContainer 
        position="top-center"
        autoClose={1000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Slide}
      />
    </>
  );
}

export default App
