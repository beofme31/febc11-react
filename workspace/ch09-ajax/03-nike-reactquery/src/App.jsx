import { useCallback, useEffect, useState } from "react";
import Product from "./Product";
import Shipping from "./Shipping";
import { DotLoader } from 'react-spinners';
import useAxiosInstance from "@hooks/useAxiosInstance";
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useMutation, useQuery } from '@tanstack/react-query';

function App() {
  const axios = useAxiosInstance();

  // const [data, setData] = useState(); // 1(마운트)
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(null);

  // const fetchData = async (_id) => {
  //   setIsLoading(true);
  //   try{
  //     // const res = await axios.get(`/products/${_id}`, { params: { delay: 1000 } });
  //     const res = await axios.get(`/products/${_id}`);
  //     setData(res.data.item); // 4번(마운트 후)
  //     setError(null);
  //   }catch(err){ // network 에러, 4xx, 5xx 응답일 경우
  //     setError(err);
  //     setData(null);
  //   }finally{
  //     setIsLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchData(7); // 3번(마운트 후)
  // }, []); // 마운트 된 이후에 최초 한번만 실행

  // 상품 상세 조회
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['상품상세조회번호는두번째요소에', 7], // 캐시에 사용할 키값을 지정(7번 상품)
    queryFn: () => axios.get(`/products/7`), // 서버에 ajax 요청 코드(Promise 반환)
    select: res => res.data.item,
    // refetchInterval: 1000*3,
  });

  // 상품 구매
  const orderProduct = useMutation({
    // useMutation() 반환한 객체의 mutate() 호출하면 mutationFn 호출됨
    mutationFn: (products) => axios.post(`/orders`, products),
    onSuccess: () => {
      toast.success('주문이 완료되었습니다.');
      refetch(); // 상품 상세 조회를 다시 호출
    }, // mutationFn 실행이 정상적으로 완료될 경우
    onError: err => { // mutationFn 실행 중 에러가 발생할 경우
      console.error(err);
    },
  });

  console.log('isLoading', isLoading);
  console.log('error', error);
  console.log('data', data);

  const basicShippingFees = 3000;

  const [quantity, setQuantity] = useState(1);
  const [shippingFees, setShippingFees] = useState(basicShippingFees);

  // 수량이 변경되면 배송비 다시 계산
  const handleQuantityChange = (e) => {
    const newQuantity = Number(e.target.value);
    setShippingFees(basicShippingFees * Math.ceil(newQuantity / 5));
    setQuantity(newQuantity);
  };

  const handlePayment = () => {
    const ok = confirm(`배송비 ${ shippingFees }원이 추가됩니다. 상품을 결제하시겠습니까?`);
    if(ok){
      // mutateFn() 호출
      orderProduct.mutate({
        products: [{ _id: 7, quantity }]
      });
    }
  };

  // return <h1></h1> // 2번(마운트)
  return (
    <>
      <h1>03 Nike 상품 상세 조회 - React Query</h1>
      { isLoading && <DotLoader /> }
      { error && <p>{ error.message }</p> }
      { data && (
        <div>
          <Product product={ data } />
          <h2>수량 선택</h2>
          <div>
            가격: { data.price.toLocaleString() }원<br/>
            남은 수량: { data.quantity - data.buyQuantity }<br/>
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
