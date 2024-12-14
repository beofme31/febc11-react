import useAxiosInstance from "@hooks/useAxiosInstance";
import CommentList from "@pages/board/CommentList";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useUserStore from "@zustand/userStore";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function Detail() {

  const { user } = useUserStore();
  
  const axios = useAxiosInstance();
  const { type, _id } = useParams();

  const { data } = useQuery({
    queryKey: ['posts', _id],
    queryFn: () => axios.get(`/posts/${_id}`),
    select: res => res.data,
    staleTime: 1000*10,
  });

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const removeItem = useMutation({
    mutationFn: _id => axios.delete(`/posts/${_id}`),
    onSuccess: () => {
      alert('게시물이 삭제되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['posts', type] });
      navigate(`/${type}`);
    }
  });

  const onSubmit = (event) => {
    event.preventDefault();
    removeItem.mutate(_id);
  };

  if(!data){
    return <div>로딩중...</div>;
  }

  return (

    <>
      <Helmet>
        <title>{ data.item.title } - 멋사컴</title>
        <meta property="og:title" content={ data.item.title } />
        <meta property="og:description" content={ data.item.content } />
      </Helmet>

      <main className="container mx-auto mt-4 px-4">

        <section className="mb-8 p-4">
          <form onSubmit={ onSubmit }>
            <div className="font-semibold text-xl">제목 : { data.item.title }</div>
            <div className="text-right text-gray-400">작성자 : { data.item.user.name }</div>
            <div className="mb-4">
              <div>
                <pre className="font-roboto w-full p-2 whitespace-pre-wrap">{ data.item.content }</pre>
              </div>
              <hr/>
            </div>
            <div className="flex justify-end my-4">
              <Link to={`/${type}`} className="bg-orange-500 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded">목록</Link>

              { user?._id === data.item.user._id && (
                <>
                  <Link to={`/${type}/${_id}/edit`} className="bg-gray-900 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded">수정</Link>
                  <button type="submit" className="bg-red-500 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded">삭제</button>
                </>
              ) }

            </div>
          </form>
        </section>

        <CommentList data={ data.item.replies } />

      </main>
    </>
    
  );
}