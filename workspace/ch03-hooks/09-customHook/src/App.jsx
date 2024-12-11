import useFetch from "@hooks/useFetch";
import useAxios from "@hooks/useAxios";
import { PacmanLoader } from "react-spinners";

function App() {

  // const { data, error, isLoading } = useFetch({ url: '/todolist?delay=2000' });
  const { data, error, isLoading } = useAxios({ url: '/todolist?delay=1000' });

  return (
    <>
      <h1>09 Custom Hook - useFetch, useAxios 커스텀 훅 사용</h1>
      <h2>할일 목록</h2>
      { isLoading && 
        <PacmanLoader color="#5eeb34" size={18} />
      }
      { error && <p style={{ color: 'red' }}>{ error.message }</p> }
      { data && (
        <ul>
          { data.items.map(item => <li key={ item._id }>{ item.title }</li>) }
        </ul>
      ) }
    </>
  );
}

export default App
