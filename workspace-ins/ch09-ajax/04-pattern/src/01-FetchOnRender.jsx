import axios from 'axios';
import { useEffect, useState } from 'react';

// 게시글 조회 API 호출
function fetchPost(){
  return axios.get('https://11.fesp.shop/posts/1', {
    headers: {
      'client-id': '00-brunch'
    }
  });
}

// 게시글 상세 조회 페이지
function FetchOnRender(){
  const [data, setData] = useState();

  useEffect(() => {
    fetchPost().then(res => {
      setData(res.data);
    });
  }, []);

  if(!data){
    return <div>게시물 로딩중...</div>;
  }

  return (
    <>
      <h4>{ data.item.title }</h4>
      <Replies />
    </>
  );
}

// 댓글 목록 조회 API 호출
function fetchReplies(){
  return axios.get('https://11.fesp.shop/posts/1/replies', {
    headers: {
      'client-id': '00-brunch'
    }
  });
}

// 댓글 목록 페이지
function Replies(){
  const [data, setData] = useState();

  useEffect(() => {
    fetchReplies().then(res => {
      setData(res.data);
    });
  }, []);

  if(!data){
    return <div>댓글 로딩중...</div>;
  }

  const list = data.item.map(item => <li key={item._id}>{item.content}</li>);

  return (
    <>
      <ul>{ list }</ul>
    </>
  );
}

export default FetchOnRender;