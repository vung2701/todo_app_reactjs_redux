import { Select } from 'antd';
import styles from './selects.module.css';
import { useState } from 'react';
import useDebounce from '../../../hooks/useDebounces';

export default function Selects(props: any) {
  const {
    labels,
    id,
    required = false,
    customerClass,
    options,
    name,
    handleChange,
    errors,
    wrap = false,
    value,
    show = 'value',
    mode = '',
    placeholder
  } = props;

  const [searchValue, setSearchValue] = useState('');

  const debouncedSearchValue = useDebounce(searchValue);

  const formatOption = (option: any) => {
    if (show === 'name') {
      return { label: option?.name, value: option?.id };
    }
    return option;
  };

  const handleSearch = (searchKey: string) => {
    setSearchValue(searchKey);
  };

  return (
    <div className={`${styles.selects} ${customerClass} ${wrap ? styles.wrap : ''}`}>
      {labels && (
        <label htmlFor={id}>
          {labels}: {required && <span className={styles.red}>*</span>}
        </label>
      )}
      <div className={styles.select}>
        <Select
          placeholder={placeholder}
          value={value}
          mode={mode}
          fieldNames={name}
          onChange={handleChange}
          options={options?.map((option) => formatOption(option))}
          showSearch
          onSearch={handleSearch}
          filterOption={(input, option) => option?.label.toLowerCase().includes(debouncedSearchValue.toLowerCase())}
          virtual
          optionFilterProp="label"
          maxTagCount="responsive"
        />
        {errors && <span className={styles.red}>{errors}</span>}
      </div>
    </div>
  );
}
