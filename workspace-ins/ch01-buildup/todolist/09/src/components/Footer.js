import yong from "../../../yong.js";

// 푸터 구성
function Footer(){
  return (
    yong.createElement('footer', null, 
      yong.createElement('p', null, '멋쟁이 사자처럼 FrontEnd BootCamp'))
  );
}

export default Footer;