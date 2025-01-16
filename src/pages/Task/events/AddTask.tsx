import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import Tiles from '../../../components/title/Tiles';
import styles from './eventsTask.module.css';
import FormTask from './FormTask';
import Buttons from '../../../components/button/Buttons';
import { useNavigate } from 'react-router-dom';

export default function AddTask() {
  const navigate = useNavigate();
  const initialValues = {
    title: ''
  };

  const validationSchema = Yup.object().shape({
    // Basic Information Validation
    name: Yup.string().required('Name is required'),
    phone: Yup.string().required('Phone is required'),
    personal_email: Yup.string().email('Invalid email').required('Personal Email is required'),
    work_email: Yup.string().email('Invalid email').required('Work Email is required'),

    // Job Information Validation
    department: Yup.string().required('Department is required'),
    position: Yup.string().required('Position is required'),

    // Bank Information Validation
    bank_name: Yup.string().required('Bank name is required'),
    bank_number: Yup.string().required('Bank number is required'),
    bank_branch: Yup.string().required('Bank branch is required'),
    holder_name: Yup.string().required('Bank holder name is required')
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
