import Footer from "@components/Footer";
import Header from "@components/Header";
import TodoContainer from '@pages/TodoContainer';

function App(){
  return (
    <div id="todo">
      <Header />
      <TodoContainer />
      <Footer />
    </div>
  );
}

export default App
