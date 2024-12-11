import axios from "axios";
import { useEffect, useState } from "react";
// 껍데기 보여주고 데이터 받아오고 알멩이 채워서 리렌더링
// 기계적으로 저장할 상태 만들고 조회할 함수 만드는 걸 해야 함

// 게시글 조회 API 호출
function fetchPost() {
  // axios.get하면 promise 방식
  return axios.get("https://11.fesp.shop/posts/1?delay=3000", {
    headers: {
      "client-id": "00-brunch",
    },
  });
}

// 게시글 상세 조회 페이지
function FetchOnRender() {
  const [data, setData] = useState();

  useEffect(() => {
    fetchPost().then((res) => {
      setData(res.data);
    });
  }, []);

  // 데이터를 체크하는 로직 (데이터가 없으면 로딩중을 보여주기)
  if (!data) {
    return <div>게시물 로딩중...</div>;
  }

  return (
    <>
      <h4>{data.item.title}</h4>
      <Replies />
    </>
  );
}

// 댓글 목록 조회 API 호출
function fetchReplies() {
  // axios.get하면 promise 방식
  return axios.get("https://11.fesp.shop/posts/1/replies", {
    headers: {
      "client-id": "00-brunch",
    },
  });
}

// 댓글 목록 페이지
function Replies() {
  const [data, setData] = useState();

  useEffect(() => {
    fetchReplies().then((res) => {
      setData(res.data);
    });
  }, []);

  // 데이터를 체크하는 로직 (데이터가 없으면 로딩중을 보여주기)
  if (!data) {
    return <div>댓글 로딩중...</div>;
  }

  // 반복할때는 key값이 필요함
  const list = data.item.map((item) => <li key={item._id}>{item.content}</li>);

  return (
    <>
      <ul>{list}</ul>
    </>
  );
}

export default FetchOnRender;
