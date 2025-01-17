import Dates from '../../../components/forms/dates/Dates';
import Inputs from '../../../components/forms/input/Inputs';
import Selects from '../../../components/forms/select/Selects';
import Tiles from '../../../components/title/Tiles';
import { TaskStatus } from '../../../types/DataSelect';
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
        <Dates
          labels="Start Date"
          required={true}
          name="startDate"
          defaultValue={formik.values.startDate}
          onChange={(date, dateString) => {
            formik.setFieldValue('startDate', dateString);
          }}
        />
        <Dates
          labels="End Date"
          required={true}
          name="endDate"
          defaultValue={formik.values.endDate}
          onChange={(date, dateString) => {
            formik.setFieldValue('endDate', dateString);
          }}
        />

        <Selects
          labels="Status"
          name="status"
          value={formik.values.status}
          required={true}
          options={TaskStatus}
          handleChange={(value) => {
            formik.setFieldValue('status', value);
          }}
        />
      </div>
    </div>
  );
}
