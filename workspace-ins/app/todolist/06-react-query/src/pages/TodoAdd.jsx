import useAxiosInstance from "@hooks/useAxiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

function TodoAdd() {

  const { register, handleSubmit, reset, setFocus, formState: { errors } } = useForm();

  const axios = useAxiosInstance();
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const addItem = useMutation({
    mutationFn: (item) => axios.post('/todolist', item), // handleSubmit에서 검증을 통과할 경우 호출됨
    onSuccess: () => {
      alert('할일이 추가 되었습니다.');
      // 지정한 키의 쿼리 캐시를 무효화
      queryClient.invalidateQueries({ queryKey: ['todolist'] });
      // 할일 목록으로 이동
      navigate(-1);
    },
    onError: (err) => {
      console.error('서버에서 에러 응답');
      alert(err?.message || '할일 추가에 실패했습니다.');
    },
  });

  // handleSubmit에서 검증을 통과할 경우 호출됨
  const onSubmit = (item) => {
    console.log('서버에 전송', item);

    const timer = setTimeout(() => {
      xhr.abort(); // 요청 취소
    }, 2000);

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://todo-api.fesp.shop/api/todolist?delay=100');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.responseType = 'json'; // xhr.response에 저장되는 응답 데이터가 JSON.parse() 결과로 저장됨

    // 서버로부터 응답이 도착하면 호출되는 함수
    xhr.onload = () => {
      
      clearTimeout(timer);

      if(xhr.status >= 200 && xhr.status < 300){
        console.log(xhr.response);
        alert('할일이 추가 되었습니다.');
        setFocus('title');
        reset();
      }else{ // 4xx, 5xx
        console.error('서버에서 에러 응답', xhr.status, xhr.response);
        alert(xhr.response.error?.message || '할일 추가에 실패했습니다.');
      }
    };

    xhr.onabort = () => {
      alert('타임 아웃');
    };

    xhr.onerror = () => {
      console.error('네트워크 오류');
      alert('할일 추가에 실패했습니다.');
    };

    xhr.send(JSON.stringify(item));
  };

  return (
    <div id="main">
      <h2>할일 추가</h2>
      <div className="todo">
        <form onSubmit={ handleSubmit(addItem.mutate) }>
          <label htmlFor="title">제목 :</label>
          <input 
            type="text" 
            id="title" 
            autoFocus
            { ...register('title', {
              required: '제목을 입력하세요.',
            }) }
          />
          <div className="input-error">{ errors.title?.message }</div>
          <br/>
          <label htmlFor="content">내용 :</label>
          <textarea 
            id="content" 
            cols="23" rows="5"
            { ...register('content', {
              required: '내용을 입력하세요.',
            }) }
          />
          <div className="input-error">{ errors.content?.message }</div>
          <br/>
          <button type="submit">추가</button>
          <Link to="/list">취소</Link>
        </form>
      </div>
    </div>
  );
}

export default TodoAdd;