import { useRef, useState } from "react";

const errorStyle = {
  fontSize: '12px',
  color: 'red',
  fontWeight: 'bold'
};

const emailExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const cellphoneExp = /^(01[016789]{1})[0-9]{3,4}[0-9]{4}$/;

function App() {

  // const [name, setName] = useState('');
  // const [email, setEmail] = useState('');
  // const [cellphone, setCellphone] = useState('010');

  // 사용자의 입력 데이터를 상태로 관리
  const [user, setUser] = useState({
    name: '',
    email: '',
    cellphone: '010',
  });

  const [errors, setErrors] = useState({});

  // DOM 객체에 직접 접근하려고 할때
  const nameElem = useRef(null);
  const emailElem = useRef(null);
  const cellphoneElem = useRef(null);

  // const handleNameChange = (event) => {
  //   setName(event.target.value);
  // };
  // const handleEmailChange = (event) => {
  //   setEmail(event.target.value);
  // };
  // const handleCellphoneChange = (event) => {
  //   setCellphone(event.target.value);
  // };

  const handleChange = (event) => {
    const newUser = { 
      ...user,
      [event.target.name]: event.target.value,
    };
    setUser(newUser);
  };

  const onSubmit = (event) => {
    // 브라우저의 기본 동작 취소(submit 동작 취소)
    event.preventDefault();

    let newErrors;
    // 입력 메세지 검증 작업
    if(user.name.trim() === ''){
      newErrors = {
        name: { message: '이름을 입력하세요.' }
      };
      nameElem.current.focus();
    }else if(user.name.trim().length < 2){
      newErrors = {
        name: { message: '2글자 이상 입력하세요.' }
      };
      nameElem.current.focus();
    }else if(user.email.trim() === ''){
      newErrors = {
        email: { message: '이메일을 입력하세요.' }
      };
      emailElem.current.focus();
    }else if(user.cellphone.trim() === ''){
      newErrors = {
        cellphone: { message: '휴대폰 번호를 입력하세요.' }
      };
      cellphoneElem.current.focus();
    }else if(emailExp.test(user.email) === false){
      newErrors = {
        email: { message: '이메일 양식에 맞지 않습니다.' }
      };
      emailElem.current.focus();
    }else if(cellphoneExp.test(user.cellphone) === false){
      newErrors = {
        cellphone: { message: '휴대폰 형식에 맞지 않습니다.' }
      };
      cellphoneElem.current.focus();
    }

    if(newErrors){ // 검증 실패
      setErrors(newErrors);
    }else{ // 검증 통과
      setErrors({});
      console.log('서버에 전송', user);
    }
  };

  return (
    <>
      <h1>05 회원가입 입력값 상태 관리</h1>

      <form onSubmit={ onSubmit }>
        <label htmlFor="name">이름</label>
        <input 
          id="name"
          name="name"
          value={ user.name }
          onChange={ handleChange }
          ref={ nameElem }
        /><br/>
        <div style={ errorStyle }>{ errors.name?.message }</div>

        <label htmlFor="email">이메일</label>
        <input 
          id="email"
          name="email"
          value={ user.email }
          onChange={ handleChange }
          ref={ emailElem }
        /><br/>
        <div style={ errorStyle }>{ errors.email?.message }</div>

        <label htmlFor="cellphone">휴대폰</label>
        <input 
          id="cellphone"
          name="cellphone"
          value={ user.cellphone }
          onChange={ handleChange }
          ref={ cellphoneElem }
        /><br/>
        <div style={ errorStyle }>{ errors.cellphone?.message }</div>

        <button type="submit">가입</button>
      </form>

      <p>
        이름: { user.name }<br/>
        이메일: { user.email }<br/>
        휴대폰: { user.cellphone }<br/>
      </p>
    </>
  );
}

export default App
