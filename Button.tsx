import * as React from 'react';
import './button.css';

const Button = ({ key, select, style, click }) => (
  <button className={style} key={key} onClick={() => click(select)}>
    {select.buttonLabel}
  </button>
);

export default Button;
