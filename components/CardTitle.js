import React from 'react';

const CardTitle = ({ title, subtitle, extra, className }) => {
  return (
    <div className={`box_heading flex_heading ${className}`}>
      <div>
        <h2>{title}</h2>
        {subtitle ? <p>{subtitle}</p> : null}
      </div>
      {extra ? <div className='card_title_extra'>{extra}</div> : null}
    </div>
  );
};

export default CardTitle;
