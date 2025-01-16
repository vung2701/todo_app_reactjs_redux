import Inputs from '../../../components/forms/input/Inputs';
import Tiles from '../../../components/title/Tiles';
import styles from './eventsTask.module.css';

export default function FormTask(props: any) {
  const { formik } = props;
  return (
    <div className={`${styles.formEmployee} form`}>
      <div className={`${styles.basic} ${styles.information}`}>
        <Tiles texts="Basic Information" fontSize={22} fontWeight={500} customClass={styles.titles} />
        <Inputs
          labels="Title"
          required={true}
          type="text"
          name="title"
          placeholder={'Title'}
          value={formik.values.title}
          onChange={formik.handleChange}
          touched={formik.touched.title}
          errors={formik.errors.title}
        />
      </div>
    </div>
  );
}
