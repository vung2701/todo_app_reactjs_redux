import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import Tiles from '../../../components/title/Tiles';
import styles from './eventsTask.module.css';
import FormTask from './FormTask';
import Buttons from '../../../components/button/Buttons';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { TODAY } from '../../../types/constant';
import { TaskStatus } from '../../../types/DataSelect';

export default function AddTask() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const initialValues = {
    title: '',
    startDate: TODAY,
    endDate: TODAY,
    status: TaskStatus[0].value
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('This field is required')
  });

  const onSubmit = async (values, actions) => {
    try {
    } catch (error) {
    } finally {
    }
  };
  return (
    <div className={`${styles.addTasks} page_container`}>
      <Tiles texts="Add Task" fontSize={23} fontWeight={700} />
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {(formik) => {
          return (
            <Form className={styles.forms}>
              <FormTask formik={formik} />
              <div className="buttonBox">
                <Buttons texts="Submit" types="submit" status="success" />
                <Buttons
                  texts="Cancel"
                  status="cancel"
                  handleClick={() => {
                    navigate(-1);
                  }}
                />
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
