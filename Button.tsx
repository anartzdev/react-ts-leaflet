import * as React from 'react';
import './button.css';

const Button = ({ select, style, click }) => (
  <button className={style + ' recent-link'} onClick={() => click(select)}>
    {select.buttonLabel}
    {select.title ? (
      <span className="hovercard">
        <div className="tooltiptext">{select.title}</div>
      </span>
    ) : (
      ''
    )}
  </button>
);

export default Button;
