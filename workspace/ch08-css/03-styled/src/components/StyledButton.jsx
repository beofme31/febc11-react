import PropTypes from 'prop-types';
import styled from 'styled-components';

const BasicButtonStyle = styled.button`
  background-color: ${ (props) => props.bg || '#4CAF50' }; /* Green background */
  border: none; /* Remove borders */
  color: ${ (props) => props.color || 'white' }; /* White text */
  padding: 6px 18px; /* Padding */
  text-align: center; /* Center text */
  text-decoration: none; /* Remove underline */
  display: inline-block; /* Display as inline-block */
  font-size: ${ (props) => props.size || '16px' }; /* Font size */
  margin: 4px 2px; /* Margin */
  cursor: pointer; /* Cursor pointer */
  border-radius: 6px; /* Border radius */
`;

const BlueButton = styled(BasicButtonStyle)`
  background-color: blue;
`;

Button.propTypes = {
  children: PropTypes.string.isRequired,
};

Submit.propTypes = {
  children: PropTypes.string.isRequired,
};

export function Button({ children, ...rest }) {
  return <BasicButtonStyle type="button" { ...rest }>{ children }</BasicButtonStyle>
}

export function Submit({ children, ...rest }) {
  return <BlueButton type="submit" { ...rest }>{ children }</BlueButton>
}