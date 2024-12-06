import CommentList from "@pages/board/CommentList";
import { Link } from "react-router-dom";

export default function Detail() {
  return (
    <main className="container mx-auto mt-4 px-4">

      <section className="mb-8 p-4">
        <form action="/info">
          <div className="font-semibold text-xl">제목 : 좋은 소식이 있습니다.</div>
          <div className="text-right text-gray-400">작성자 : 제이지</div>
          <div className="mb-4">
            <div>
              <pre className="font-roboto w-full p-2 whitespace-pre-wrap">좋은 소식을 가지고 왔습니다.<br />오늘 드디어 최종 면접을 합니다.<br />많이 응원해 주세요^^</pre>
            </div>
            <hr/>
          </div>
          <div className="flex justify-end my-4">
            <Link to="/info" className="bg-orange-500 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded">목록</Link>
            <Link to="/info/1/edit" className="bg-gray-900 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded">수정</Link>
            <button type="submit" className="bg-red-500 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded">삭제</button>
          </div>
        </form>
      </section>
      
      <CommentList />

    </main>
  );
}