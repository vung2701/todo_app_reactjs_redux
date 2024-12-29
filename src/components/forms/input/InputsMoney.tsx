import CurrencyInput from 'react-currency-input-field';
import styles from './inputsMoney.module.css';

export default function InputsMoney(props: any) {
  const {
    errors,
    value,
    name,
    onChange,
    touched,
    placeholder = 'Please enter a number',
    labels,
    customClass = '',
    required = false,
    disabled = false,
    wrap = false,
    decimalPlaces = 0,
    suffix = ' VNĐ',
    groupSeparator = ',',
    decimalSeparator = '.'
  } = props;

  const handleChange = (value: string | undefined) => {
    if (onChange) {
      onChange({
        target: {
          name,
          value: value !== undefined ? value : ''
        }
      });
    }
  };

  return (
    <div className={`${styles.inputs} ${customClass} ${wrap ? styles.wrap : ''}`}>
      {labels && (
        <label htmlFor={name}>
          {labels}: {required && <span className={'red'}>*</span>}
        </label>
      )}
      <div className={styles.inputWrapper}>
        <CurrencyInput
          name={name}
          placeholder={placeholder}
          value={value}
          decimalsLimit={decimalPlaces}
          groupSeparator={groupSeparator}
          decimalSeparator={decimalSeparator}
          suffix={suffix}
          onValueChange={handleChange}
          disabled={disabled}
          className={styles.currencyInput}
        />
        {errors && touched && <span className={'error'}>{errors}</span>}
      </div>
    </div>
  );
}
