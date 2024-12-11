import axios from "axios";
import { useSuspenseQuery } from "@tanstack/react-query";
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
function FetchAsYouRender() {
  const { data } = useSuspenseQuery({
    queryKey: ["posts", 1],
    queryFn: () => fetchPost(),
    select: (res) => res.data,
    staleTime: 1000 * 10,
  });

  return (
    <>
      <h4>{data.item.title}</h4>
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
export function Replies() {
  // useSuspenseQuery를 쓰면 data가 바로 리턴된다.
  const { data } = useSuspenseQuery({
    queryKey: ["posts", 1, "replies"],
    queryFn: () => fetchReplies(),
    select: (res) => res.data,
    staleTime: 1000 * 10,
  });

  // 반복할때는 key값이 필요함
  const list = data.item.map((item) => <li key={item._id}>{item.content}</li>);

  return (
    <>
      <ul>{list}</ul>
    </>
  );
}

export default FetchAsYouRender;
