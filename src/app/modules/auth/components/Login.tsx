/* eslint-disable jsx-a11y/anchor-is-valid */
import {useState} from 'react'
import {useDispatch} from 'react-redux'
import * as Yup from 'yup'
import clsx from 'clsx'
// import {Link} from 'react-router-dom'
import {FormikHelpers, useFormik} from 'formik'
import * as auth from '../redux/AuthRedux'
import {login} from '../redux/AuthCRUD'
import { toast } from 'react-toastify'

interface ILoginModal {
  email: string;
  password: string;
}

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .min(3, 'Mínimo 3 caracteres')
    .max(50, 'Máximo 50 caracteres')
    .required('Nombre de usuario es requerido'),
  password: Yup.string()
    .min(3, 'Mínimo 3 caracteres')
    .max(50, 'Máximo 50 caracteres')
    .required('Contraseña es requerida'),
})

const initialValues: ILoginModal = {
  email: '',
  password: '',
}

export function Login() {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  const onSubmit = async ( values: ILoginModal, formikHelpers: FormikHelpers<ILoginModal> ) => {
    setLoading(true);
    try {
      const response = await login(values.email, values.password);
      setLoading(false);
      dispatch(auth.actions.login(response.data.token));
      toast.success('Bienvenido');
    } catch (error) {
      setLoading(false);
      formikHelpers.setSubmitting(false);
      formikHelpers.setStatus('Los datos de inicio de sesión son incorrectos.');
      toast.error('Los datos de inicio de sesión son incorrectos.');
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: onSubmit
  })

  return (
    <form
      className='form w-100'
      onSubmit={formik.handleSubmit}
      noValidate
      id='kt_login_signin_form'
    >
      {/* begin::Heading */}
      <div className='text-center mb-10'>
        <h1 className='text-dark mb-3'>Iniciar sesión en Core</h1>
        {/* <div className='text-gray-400 fw-bold fs-4'>
          New Here?{' '}
          <Link to='/auth/registration' className='link-primary fw-bolder'>
            Create an Account
          </Link>
        </div> */}
      </div>
      {/* end::Heading */}

      {/* begin::Status response */}
      {formik.status ? (
        <div className='mb-lg-15 alert alert-danger'>
          <div className='alert-text font-weight-bold'>{formik.status}</div>
        </div>
      ) : (
        <div className='mb-10 bg-light-info p-8 rounded'>
          <div className='text-info'>
            {/* Use account <strong>admin@demo.com</strong> and password <strong>demo</strong> to
            continue. */}
            Use su nombre de usuario y contraseña del <strong>sispao</strong> para continuar
          </div>
        </div>
      )}
      {/* end::Status response */}

      {/* begin::Form group */}
      <div className='fv-row mb-10'>
        <label className='form-label fs-6 fw-bolder text-dark'>Nombre de usuario</label>
        <input
          placeholder='Nombre de usuario'
          {...formik.getFieldProps('email')}
          className={clsx(
            'form-control form-control-lg form-control-solid',
            {'is-invalid': formik.touched.email && formik.errors.email},
            {
              'is-valid': formik.touched.email && !formik.errors.email,
            }
          )}
          type='text'
          name='email'
          autoComplete='off'
        />
        {formik.touched.email && formik.errors.email && (
          <div className='fv-plugins-message-container'>
            <span role='alert'>{formik.errors.email}</span>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Form group */}
      <div className='fv-row mb-10'>
        <div className='d-flex justify-content-between mt-n5'>
          <div className='d-flex flex-stack mb-2'>
            {/* begin::Label */}
            <label className='form-label fw-bolder text-dark fs-6 mb-0'>Contraseña</label>
            {/* end::Label */}
            {/* begin::Link */}
            {/* <Link
              to='/auth/forgot-password'
              className='link-primary fs-6 fw-bolder'
              style={{marginLeft: '5px'}}
            >
              Forgot Password ?
            </Link> */}
            {/* end::Link */}
          </div>
        </div>
        <input
          placeholder='Contraseña'
          type='password'
          autoComplete='off'
          {...formik.getFieldProps('password')}
          className={clsx(
            'form-control form-control-lg form-control-solid',
            {
              'is-invalid': formik.touched.password && formik.errors.password,
            },
            {
              'is-valid': formik.touched.password && !formik.errors.password,
            }
          )}
        />
        {formik.touched.password && formik.errors.password && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.password}</span>
            </div>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Action */}
      <div className='text-center'>
        <button
          type='submit'
          id='kt_sign_in_submit'
          className='btn btn-lg btn-primary w-100 mb-5'
          disabled={formik.isSubmitting || !formik.isValid}
        >
          {!loading && <span className='indicator-label'>Continuar</span>}
          {loading && (
            <span className='indicator-progress' style={{display: 'block'}}>
              Cargando...
              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </span>
          )}
        </button>

        {/* begin::Separator */}
        {/* <div className='text-center text-muted text-uppercase fw-bolder mb-5'>or</div> */}
        {/* end::Separator */}

        {/* begin::Google link */}
        {/* <a href='#' className='btn btn-flex flex-center btn-light btn-lg w-100 mb-5'>
          <img
            alt='Logo'
            src={toAbsoluteUrl('/media/svg/brand-logos/google-icon.svg')}
            className='h-20px me-3'
          />
          Continue with Google
        </a> */}
        {/* end::Google link */}

        {/* begin::Google link */}
        {/* <a href='#' className='btn btn-flex flex-center btn-light btn-lg w-100 mb-5'>
          <img
            alt='Logo'
            src={toAbsoluteUrl('/media/svg/brand-logos/facebook-4.svg')}
            className='h-20px me-3'
          />
          Continue with Facebook
        </a> */}
        {/* end::Google link */}

        {/* begin::Google link */}
        {/* <a href='#' className='btn btn-flex flex-center btn-light btn-lg w-100'>
          <img
            alt='Logo'
            src={toAbsoluteUrl('/media/svg/brand-logos/apple-black.svg')}
            className='h-20px me-3'
          />
          Continue with Apple
        </a> */}
        {/* end::Google link */}
      </div>
      {/* end::Action */}
    </form>
  )
}
