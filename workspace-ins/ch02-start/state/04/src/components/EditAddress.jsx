import { Fragment } from "react";

export default function EditAddress({ addressBook, handleAddressChange }){
  const list = addressBook.map(address => {
    return (
      <Fragment key={ address.id }>
        <label htmlFor={ address.id }>{ address.name }</label>
        <input
          id={ address.id }
          type="text"
          name={ address.name }
          value={ address.value }
          onChange={ handleAddressChange }
        />
        <br/>
      </Fragment>
    );
  });

  return list;
}