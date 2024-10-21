import { Button } from 'antd';

import React from 'react';

const DefaultButton = ({
  title,
  htmlType,
  type,
  loading,
  icon,
  className,
  onClick,
  onChange,
  disabled
}) => {
  return (
    <Button
      loading={loading}
      icon={icon}
      htmlType={htmlType}
      type={type}
      onClick={onClick}
      onChange={onChange}
      disabled={disabled}
      className={`default_btn ${className ? className : ''}`}
      size='large'
    >
      {loading ? '' : title}
    </Button>
  );
};

export default DefaultButton;
