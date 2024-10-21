import { Form, Input } from "antd";
import React from "react";
import "./Input.module.css";

const DefaultInput = ({
  type,
  name,
  label,
  rules,
  disabled,
  defaultValue,
  className,
  prefix,
}) => {
  return (
    <Form.Item
      name={name}
      rules={rules}
      label={label}
      className={` dashboard_content  ${className}`}
    >
      {type == "password" ? (
        <Input.Password
          type={type}
          size="large"
          className="input-password-felid"
          disabled={disabled}
          defaultValue={defaultValue}
          prefix={prefix}
        />
      ) : (
        <Input
          type={type}
          size="large"
          disabled={disabled}
          defaultValue={defaultValue}
          prefix={prefix}
        />
      )}
    </Form.Item>
  );
};

export default DefaultInput;
