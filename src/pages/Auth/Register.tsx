import { Form, Formik } from 'formik';
import { toast } from 'react-toastify';
import styles from './auth.module.css';
import * as Yup from 'yup';
import Inputs from '../../components/forms/input/Inputs';
import Buttons from '../../components/button/Buttons';
import { regiterUser } from '../../services/apiAuth';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();
  const initialValues = {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required').min(3, 'Username must be at least 3 characters'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().required('Password is required'),
    // .min(8, 'Password must be at least 8 characters')
    // .matches(/(?=.*[0-9])/, 'Password must contain a number')
    // .matches(/(?=.*[a-z])/, 'Password must contain a lowercase letter')
    // .matches(/(?=.*[A-Z])/, 'Password must contain an uppercase letter')
    // .matches(/(?=.*[!@#$%^&*])/, 'Password must contain a special character'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required')
  });

  const onSubmit = async (values, actions) => {
    try {
      await regiterUser(values);
      toast.success('Registration successful!');
      navigate('/login');
    } catch (error) {
      toast.error('Registration error. Please try again.');
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <div className={styles.loginWrapper}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        validateOnBlur={false}
        validateOnChange={false}
        validateOnMount={false}
      >
        {(formik) => (
          <Form className={styles.forms}>
            <div className={styles.formHeading}>
              <h2>Sign Up</h2>
            </div>
            <div className={styles.contentBox}>
              <div className={styles.imgBox}>
                <img src="/images/SignIn.png" alt="sign in" loading="lazy" />
              </div>
              <div className={styles.formBox}>
                <Inputs
                  customClass={styles.loginInput}
                  wrap
                  labels="Username"
                  required={true}
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  touched={formik.touched.username}
                  errors={formik.errors.username}
                />
                <Inputs
                  customClass={styles.loginInput}
                  wrap
                  labels="Email"
                  required={true}
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  touched={formik.touched.email}
                  errors={formik.errors.email}
                />
                <Inputs
                  wrap
                  customClass={styles.loginInput}
                  labels="Password"
                  required={true}
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  touched={formik.touched.password}
                  errors={formik.errors.password}
                />
                <Inputs
                  wrap
                  customClass={styles.loginInput}
                  labels="Confirm Password"
                  required={true}
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  touched={formik.touched.confirmPassword}
                  errors={formik.errors.confirmPassword}
                />
                <div className={styles.buttonBox}>
                  <Buttons
                    texts="Register"
                    types="submit"
                    status={formik.isSubmitting ? 'loading' : 'success'}
                    disabled={formik.isSubmitting}
                  />
                  <Buttons
                    texts="Login"
                    status="primary"
                    handleClick={() => {
                      navigate('/login');
                    }}
                  />
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
