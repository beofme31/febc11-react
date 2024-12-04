import useAxiosInstance from "@hooks/useAxiosInstance";
import TodoListItem from "@pages/TodoListItem";
import { useEffect, useRef, useState } from "react";
import { Link, Outlet, useSearchParams } from "react-router-dom";
import '../Pagination.css';
import Pagination from "@components/Pagination";
import { useQuery } from '@tanstack/react-query';

function TodoList() {

  
  const searchRef = useRef('');

  // 쿼리 스트링 정보를 읽거나 설정
  // /list?keyword=환승&page=3 => new URLSearchParams('keyword=환승&page=3')
  const [searchParams, setSearchParams] = useSearchParams();

  const params = {
    keyword: searchParams.get('keyword') || '',
    page: searchParams.get('page') || 1,
    limit: 5,
  };

  // axios 인스턴스
  const axios = useAxiosInstance();

  // const [data, setData] = useState();
  // // 컴포넌트 마운트 직후와 삭제 후에 목록 조회를 해야 하므로 함수로 만듬
  // const fetchList = async () => {
  //   const res = await axios.get('/todolist', { params });
  //   setData(res.data);
  // };
  // useEffect(() => {
  //   fetchList();
  // }, [searchParams]); // 최초 마운트 후에 호출

  const { data, refetch } = useQuery({
    queryKey: ['할일목록을 조회하는 쿼리'],
    queryFn: () => axios.get('/todolist', { params }),
    select: res => res.data,
  });

  // 삭제 작업
  const handleDelete = async (_id) => {
    try{
      // API 서버에 삭제 요청
      await axios.delete(`/todolist/${ _id }`);
      alert('할일이 삭제 되었습니다.');

      // 목록을 다시 조회
      refetch();
    }catch(err){
      console.error(err);
      alert('할일 삭제에 실패했습니다.');
    }
  };

  const itemList = data?.items.map(item => <TodoListItem key={ item._id } item={ item } handleDelete={ handleDelete } />);
  
  // 검색
  const handleSearch = (e) => {
    e.preventDefault();
    setSearchParams(new URLSearchParams(`keyword=${searchRef.current.value}`));
  };

  return (
    <div id="main">
      <h2>할일 목록</h2>
      <div className="todo">
        <Link to="/list/add">추가</Link>
        <br/>
        <form className="search" onSubmit={ handleSearch }>
          <input type="text" autoFocus defaultValue={ params.keyword } ref={ searchRef } />
          <button type="submit">검색</button>
        </form>
        <ul className="todolist">
          { itemList }
        </ul>
      </div>

      { data && <Pagination totalPages={ data.pagination.totalPages } current={ data.pagination.page }/> }

    </div>
  );
}

export default TodoList;