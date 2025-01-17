import React, { useEffect, useState } from 'react';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import styles from './stylesDate.module.css';
import { DATE_FORMAT, MONTH_FORMAT } from '../../../types/constant';

export default function Dates(props: any) {
  const {
    defaultValue,
    onChange,
    labels,
    errors,
    customClass,
    required,
    wrap = false,
    show = 'date' // Default view is 'date'
  } = props;

  // Determine the format based on the 'show' prop
  const format = show === 'month' ? MONTH_FORMAT : DATE_FORMAT;

  // State to manage the date value
  const [value, setValue] = useState(() => {
    // Check if defaultValue is valid, otherwise set to current date +1
    const defaultDate = defaultValue ? dayjs(defaultValue, format) : dayjs().add(1, 'day');
    return defaultDate.isValid() ? defaultDate : dayjs().add(1, 'day'); // Ensure valid date
  });

  // Update the local state when the defaultValue prop changes
  useEffect(() => {
    const updatedValue = defaultValue ? dayjs(defaultValue, format) : dayjs().add(1, 'day');
    setValue(updatedValue.isValid() ? updatedValue : dayjs().add(1, 'day')); // Ensure valid date
  }, [defaultValue, format]);

  // Handle onChange to convert date to the specified format
  const handleChange = (date, dateString) => {
    if (date) {
      const formattedDate = dayjs(date).format(format);
      console.log(formattedDate);
      setValue(date); // Update local state
      onChange(date, formattedDate); // Send formatted date
    } else {
      setValue(null); // Handle invalid date if needed
      onChange(null, ''); // Handle invalid date if needed
    }
  };

  return (
    <div className={`${styles.dates} ${customClass} ${wrap ? styles.wrap : ''}`}>
      {labels && (
        <label htmlFor="label">
          {labels}: {required && <span>*</span>}
        </label>
      )}
      <DatePicker
        picker={show === 'month' ? 'month' : undefined}
        format={format}
        value={value}
        onChange={handleChange}
      />
      {errors && <span className={styles.red}>{errors}</span>}
    </div>
  );
}
