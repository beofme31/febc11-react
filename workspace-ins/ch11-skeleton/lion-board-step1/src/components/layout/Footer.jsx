import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="p-4 pb-12 w-full border-t border-t-slate-200  dark:border-t-slate-500 dark:bg-gray-600 text-gray-600 dark:text-white transition-color duration-500 ease-in-out">
      <div className="min-w-[320px] flex flex-wrap gap-4 justify-center items-center text-sm text-slate-400">
        <Link to="#" className="hover:font-semibold dark:hover:text-gray-200">약관</Link>
        <Link to="#" className="hover:font-semibold dark:hover:text-gray-200">게시판 정책</Link>
        <Link to="#" className="hover:font-semibold dark:hover:text-gray-200">회사소개</Link>
        <Link to="#" className="hover:font-semibold dark:hover:text-gray-200">광고</Link>
        <Link to="#" className="hover:font-semibold dark:hover:text-gray-200">마이비즈니스</Link>
        <Link to="#" className="hover:font-semibold dark:hover:text-gray-200">제휴 제안</Link>
        <Link to="#" className="hover:font-semibold dark:hover:text-gray-200">이용약관</Link>
        <Link to="#" className="hover:font-semibold dark:hover:text-gray-200">개인정보취급방침</Link>
        <Link to="#" className="hover:font-semibold dark:hover:text-gray-200">청소년보호 정책</Link>
        <Link to="#" className="hover:font-semibold dark:hover:text-gray-200">고객센터</Link>
      </div>
    </footer>
  );
}