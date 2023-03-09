import * as React from 'react';
import './button.css';

const Button = ({ select, style, click }) => (
  <button className={style + ' recent-link'} onClick={() => click(select)}>
    {select.buttonLabel}
  </button>
);

export default Button;
