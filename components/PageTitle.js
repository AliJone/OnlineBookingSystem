import React from 'react';

const PageTitle = ({ title, extra }) => {
  return (
    <div className='page-title box_heading flex_heading'>
      <h2>{title}</h2>
      {extra ? <div className='card_title_extra'>{extra}</div> : null}
    </div>
  );
};

export default PageTitle;
