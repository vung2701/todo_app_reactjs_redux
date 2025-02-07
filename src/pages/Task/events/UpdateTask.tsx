import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import Tiles from '../../../components/title/Tiles';
import styles from './eventsTask.module.css';
import FormTask from './FormTask';
import Buttons from '../../../components/button/Buttons';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { TODAY } from '../../../types/constant';
import { TaskStatus } from '../../../types/DataSelect';
import { createTask } from '../../../services/apiTask';
import { loading, unLoading } from '../../../redux/loadingSlice';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';

export default function UpdateTask() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [task, setTask] = useState();

  useEffect(() => {}, [id]);
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
    dispatch(loading());
    try {
      await createTask(values);
      toast.success('Task uploaded successfully');
      navigate('/task');
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(unLoading());
    }
  };
  return (
    <div className={`${styles.addTasks} page_container`}>
      <Tiles texts="Update Task" fontSize={23} fontWeight={700} />
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
                <Buttons texts="Save" types="submit" status="success" />
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
