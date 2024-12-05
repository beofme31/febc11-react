import FetchThenRender from "./02-FetchThenRender";
import FetchOnRender from "./01-FetchOnRender";
import axios from "axios";
import { useEffect, useState } from "react";

// 게시글 목록 조회 API 호출
function fetchPostList(){
  return axios.get('https://11.fesp.shop/posts?type=brunch&delay=4000', {
    headers: {
      'client-id': '00-brunch'
    }
  });
}

// 게시글 목록 조회 페이지
function PostList() {
  const [data, setData] = useState();

  useEffect(() => {
    fetchPostList().then(res => {
      setData(res.data);
    });
  }, []);

  if(!data){
    return <div>게시물 목록 로딩중...</div>;
  }

  return (
    <>
      <h2>게시물 { data.item.length }건이 있습니다.</h2>

      <h3>Fetch-on-render 방식</h3>
      <FetchOnRender />

      <h3>Fetch-then-render 방식</h3>
      <FetchThenRender />
    </>
  );
}

export default PostList;