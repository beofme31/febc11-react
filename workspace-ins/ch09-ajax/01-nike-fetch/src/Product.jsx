import PropTypes from "prop-types";
import { memo } from "react";

const Product = memo(function ProductFn({ product: { name, price, mainImages, content } }){
  // 복잡한 로직
  console.log('Product 렌더링.');

  return (
    <>
      <h2>상품 설명</h2>
      <p>상품명: { name }</p>
      <p>가격: { price.toLocaleString() }원</p>
      <p>상품 설명</p>
      <div>
        { mainImages && <img src={ `https://11.fesp.shop${ mainImages[0].path }` } width="600" /> }
        <p>{ content }</p>
      </div>
    </>
  );
});

Product.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    mainImages: PropTypes.array,
    content: PropTypes.string.isRequired,
  }).isRequired,
};

export default Product;
