import { Form, Formik } from 'formik';
import styles from './auth.module.css';
import * as Yup from 'yup';
import Inputs from '../../components/forms/input/Inputs';
import Buttons from '../../components/button/Buttons';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../services/apiAuth';
import { login } from '../../redux/authSlice';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const initialValues = {
    email: '',
    password: ''
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').min(3, 'Email must be at least 3 characters'),
    password: Yup.string().required('Password is required')
    // .min(8, 'Password must be at least 8 characters')
    // .matches(/(?=.*[0-9])/, 'Password must contain a number')
    // .matches(/(?=.*[a-z])/, 'Password must contain a lowercase letter')
    // .matches(/(?=.*[A-Z])/, 'Password must contain an uppercase letter')
    // .matches(/(?=.*[!@#$%^&*])/, 'Password must contain a special character')
  });

  const onSubmit = async (values, actions) => {
    try {
      const response = await loginUser(values);
      const { user } = response?.user;
      localStorage.setItem('accessToken', response.accessToken); // Store token locally if needed
      dispatch(login(user));
      navigate('/');
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <div className={styles.loginWrapper}>
      <Formik
        enableReinitialize={true}
        initialValues={initialValues || {}}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        validateOnBlur={false}
        validateOnChange={false}
        validateOnMount={false}
      >
        {(formik) => {
          return (
            <Form className={styles.forms}>
              <div className={styles.formHeading}>
                <h2>Sign In</h2>
              </div>
              <div className={styles.contentBox}>
                <div className={styles.imgBox}>
                  <img src="/images/SignIn.png" alt="sign in" loading="lazy" />
                </div>
                <div className={styles.formBox}>
                  <Inputs
                    customClass={styles.loginInput}
                    wrap
                    labels="Email"
                    required={true}
                    type="text"
                    name="email"
                    placeholder={'Email'}
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
                  <div className={styles.buttonBox}>
                    <Buttons texts="Login" types="submit" status="success" />
                    <Buttons
                      texts="Register"
                      status="primary"
                      handleClick={() => {
                        navigate('/register');
                      }}
                    />
                  </div>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
