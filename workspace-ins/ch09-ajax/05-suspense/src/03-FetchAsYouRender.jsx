import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';

// 게시글 조회 API 호출
function fetchPost(){
  return axios.get('https://11.fesp.shop/posts/1?delay=3000', {
    headers: {
      'client-id': '00-brunch'
    }
  });
}

// 게시글 상세 조회 페이지
function FetchAsYouRender(){
  const { data } = useSuspenseQuery({
    queryKey: ['posts', 1],
    queryFn: () => fetchPost(),
    select: res => res.data,
    staleTime: 1000*10,
  });

  return (
    <>
      <h4>{ data.item.title }</h4>
    </>
  );
}

// 댓글 목록 조회 API 호출
function fetchReplies(){
  return axios.get('https://11.fesp.shop/posts/1/replies?delay=4000', {
    headers: {
      'client-id': '00-brunch'
    }
  });
}

// 댓글 목록 페이지
export function Replies(){
  const { data } = useSuspenseQuery({
    queryKey: ['posts', 1, 'replies'],
    queryFn: () => fetchReplies(),
    select: res => res.data,
    staleTime: 1000*10,
  });

  const list = data.item.map(item => <li key={item._id}>{item.content}</li>);

  return (
    <>
      <ul>{ list }</ul>
    </>
  );
}

export default FetchAsYouRender;