import { useState } from 'react';
import { Input } from 'antd';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import styles from './inputs.module.css';

export default function Inputs(props) {
  const {
    errors,
    value,
    name,
    onChange,
    touched,
    placeholder,
    labels,
    customClass,
    required,
    type,
    disabled = false,
    wrap = false
  } = props;

  const [showPassword, setShowPassword] = useState(false);

  // Toggle the visibility of the password
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className={`${styles.inputs} ${customClass} ${wrap ? styles.wrap : ''}`}>
      {labels && (
        <label>
          {labels}: {required && <span className={'red'}>*</span>}
        </label>
      )}
      <div className={styles.inputWrapper}>
        <Input
          onChange={onChange}
          status={touched && errors ? 'error' : ''}
          value={value}
          name={name}
          placeholder={placeholder}
          disabled={disabled}
          type={type === 'password' && showPassword ? 'text' : type} // Switch type based on showPassword state
          autoComplete="new-password" // Add autocomplete prop
          suffix={
            type === 'password' &&
            (showPassword ? (
              <EyeOutlined onClick={togglePasswordVisibility} />
            ) : (
              <EyeInvisibleOutlined onClick={togglePasswordVisibility} />
            ))
          }
        />
        {errors && <span className={'error'}>{errors}</span>}
      </div>
    </div>
  );
}
