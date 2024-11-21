import { Component } from "react";
import PropTypes from 'prop-types';

class ClickMe extends Component {

  handleClick = () => {
    this.setState({ count: this.state.count + (this.props.level || 1) });
  };

  // 1-1
  constructor(props){
    console.log('1-1 constructor 호출됨.');
    super(props); // 필수로 작성
    this.state = { count: props.level || 1 };
  }

  // 1-2/2-1
  static getDerivedStateFromProps(props, state){
    console.log('1-2/2-1 getDerivedStateFromProps 호출됨.');
    console.log('  props', props);
    console.log('  state', state);

    if(state.count > props.level * 5){
      return { count: 0 }; // 새로운 값으로 state 업데이트
    }
    return null; // state를 업데이트 하지 않음
  }

  // 2-2
  shouldComponentUpdate(nextProps, nextState){
    console.log('2-2 shouldComponentUpdate 호출됨.');
    console.log('현재값', this.props, this.state);
    console.log('다음값', nextProps, nextState);
    return nextState.count % 2 === 0;
  }

  // 1-3/2-3
  render(){
    console.log('1-3/2-3 render 호출됨.');
    return (
      <div>
        클릭 횟수 X { this.props.level || 1 }: { this.state.count % 2 === 0 }
        <button onClick={ this.handleClick }>클릭</button>
      </div>
    );
  }

  // 1-4
  componentDidMount(){
    console.log('1-4 componentDidMount 호출됨.');
  }

  // 2-4
  getSnapshotBeforeUpdate(prevProps, prevState){
    console.log('2-4 getSnapshotBeforeUpdate 호출됨.');
    return 'hello';
  }

  // 2-5
  componentDidUpdate(){
    console.log('2-5 componentDidUpdate 호출됨.');
  }

  // 3-1
  componentWillUnmount(){
    console.log('componentWillUnmount 호출됨.');
  }
}

ClickMe.propTypes = {
  level: PropTypes.number
};

class Parent extends Component {
  render(){
    return (
      <div>
        <h1>03 클래스 컴포넌트 - 컴포넌트의 라이프 사이클</h1>
        <ClickMe level={1} />
      </div>
    );
  }
}

export default Parent;