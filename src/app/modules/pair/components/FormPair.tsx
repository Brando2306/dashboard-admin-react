import {useState} from 'react'
import {useFormik} from 'formik'
import {} from '../../../../_metronic/partials/widgets'
import {ModalPair} from './ModalPair'
import {ImageBlob} from './ImageBlob'
import {Attachment} from '../../attachment/interfaces/attachment.interface'
import clsx from 'clsx'
import {IPairModal} from '../interfaces/pair.interface'
import {useCreatePair} from '../hooks/useCreatePair'
import CustomTooltip from '../../../../_metronic/helpers/components/CustomTooltip'

export interface FormPairProps {
  initialValues: IPairModal
  onSubmit: (values: IPairModal) => void
  isCreateMode: boolean
  profileDetailsSchema: any
  // onSubmit: (values: IPairModal) => Promise<void>;
}

export const FormPair = ({
  initialValues,
  onSubmit,
  isCreateMode,
  profileDetailsSchema,
}: FormPairProps) => {
  const [attachment, setAttachment] = useState<Attachment | null>({
    location: initialValues.image_url,
  })
  const messageTooltip = 'Esta es la palabra que se escuchará en la aplicación móvil'

  const [isModalOpen, setIsModalOpen] = useState(false)

  const {isLoading} = useCreatePair()

  const onSubmitForm = async (values: IPairModal) => {
    const form = {
      ...values,
      image_url: attachment?.location ?? '',
    }
    onSubmit(form)
  }

  const formik = useFormik<IPairModal>({
    initialValues: initialValues,
    validationSchema: profileDetailsSchema,
    onSubmit: onSubmitForm,
  })

  const handleSelectedItem = (item: Attachment) => {
    setAttachment(item)
  }

  const handleModalOpen = () => {
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
  }

  const renderContent = () => {
    return (
      <>
        <div className='card-header border-0'>
          <div className='card-title m-0'>
            <h3 className='fw-bolder m-0'>Nuevo Par</h3>
          </div>
        </div>

        <div id='kt_account_profile_details' className='collapse show'>
          <form onSubmit={formik.handleSubmit} noValidate className='form'>
            <div className='card-body border-top p-9'>
              <div className='row mb-6'>
                <label className='col-lg-4 col-form-label fw-bold fs-6'>Imagen del par</label>

                <div className='col-lg-8 fv-row'>
                  <span className='btn btn-outline btn-outline-dashed p-4 mb-10'>
                    {attachment?.location !== '' ? (
                      <section className='img-container-one'>
                        <section className='images'>
                          <ImageBlob
                            urlImagen={attachment!.location!}
                            originalname={attachment!.originalname!}
                          />
                          <div className='delete-button'>
                            <button
                              type='button'
                              className='btn btn-danger '
                              onClick={() => setAttachment({location: ''})}
                            >
                              <i className={clsx('bi bi-archive fs-3 p-0')}></i>
                            </button>
                          </div>
                        </section>
                      </section>
                    ) : (
                      <button
                        // data-bs-toggle='modal'
                        // data-bs-target='#kt_custom_pair_create'
                        // id='kt_toolbar_primary_button'
                        type='button'
                        className='btn btn-primary'
                        onClick={handleModalOpen}
                      >
                        Seleccionar imagen
                      </button>
                    )}
                  </span>
                </div>
              </div>

              <div className='row mb-6'>
                <label className='col-lg-4 col-form-label required fw-bold fs-6'>
                  Nombre del par
                </label>

                <div className='col-lg-8 fv-row'>
                  <input
                    type='text'
                    className='form-control form-control-lg form-control-solid'
                    placeholder='Nombre del par'
                    {...formik.getFieldProps('name')}
                  />
                  {formik.touched.name && formik.errors.name && (
                    <div className='fv-plugins-message-container'>
                      <div className='fv-help-block'>{formik.errors.name}</div>
                    </div>
                  )}
                </div>
              </div>

              <div className='row mb-6'>
                <label className='col-lg-4 col-form-label required fw-bold fs-6'>
                  Nombre del sonido del par
                  <CustomTooltip title={messageTooltip} id='t-1'>
                    <i className='fas fa-question-circle text-primary ms-2'></i>
                  </CustomTooltip>
                </label>

                <div className='col-lg-8 fv-row'>
                  <input
                    type='text'
                    className='form-control form-control-lg form-control-solid'
                    placeholder='Nombre del sonido del par'
                    {...formik.getFieldProps('name_sound')}
                  />
                  {formik.touched.name_sound && formik.errors.name_sound && (
                    <div className='fv-plugins-message-container'>
                      <div className='fv-help-block'>{formik.errors.name_sound}</div>
                    </div>
                  )}
                </div>
              </div>

              <div className='row mb-6'>
                <label className='col-lg-4 col-form-label required fw-bold fs-6'>Descripción</label>

                <div className='col-lg-8 fv-row'>
                  <textarea
                    className='form-control form-control-lg form-control-solid'
                    rows={3}
                    data-kt-element='input'
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    name='description'
                    placeholder='Descripción del par'
                  ></textarea>
                  {formik.touched.description && formik.errors.description && (
                    <div className='fv-plugins-message-container'>
                      <div className='fv-help-block'>{formik.errors.description}</div>
                    </div>
                  )}
                </div>
              </div>

              {!isCreateMode && (
                <div className='row mb-6'>
                  <label className='col-lg-4 col-form-label required fw-bold fs-6'>Posición</label>

                  <div className='col-lg-8 fv-row'>
                    <input
                      type='number'
                      className='form-control form-control-lg form-control-solid'
                      placeholder='Posición del par'
                      {...formik.getFieldProps('position')}
                    />
                    {formik.touched.position && formik.errors.position && (
                      <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>{formik.errors.position}</div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className='row mb-6'>
                <label className='col-lg-4 col-form-label fw-bold fs-6'>Sintomatología</label>

                <div className='col-lg-8 fv-row'>
                  <input
                    type='text'
                    className='form-control form-control-lg form-control-solid'
                    placeholder='Sintomatología del par'
                    {...formik.getFieldProps('symptomatology')}
                  />
                </div>
              </div>

              <div className='row mb-6'>
                <label className='col-lg-4 col-form-label fw-bold fs-6'>Etiología</label>

                <div className='col-lg-8 fv-row'>
                  <input
                    type='text'
                    className='form-control form-control-lg form-control-solid'
                    placeholder='Etiología del par'
                    {...formik.getFieldProps('etiology')}
                  />
                </div>
              </div>

              <div className='row mb-6'>
                <label className='col-lg-4 col-form-label fw-bold fs-6'>Observación</label>

                <div className='col-lg-8 fv-row'>
                  <input
                    type='text'
                    className='form-control form-control-lg form-control-solid'
                    placeholder='Observación'
                    {...formik.getFieldProps('observation')}
                  />
                </div>
              </div>
            </div>

            <div className='card-footer d-flex justify-content-end py-6 px-9'>
              <button type='submit' className='btn btn-primary' disabled={isLoading}>
                {!isLoading && 'Guardar'}
                {isLoading && (
                  <span className='indicator-progress' style={{display: 'block'}}>
                    Cargando...{' '}
                    <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                  </span>
                )}
              </button>
            </div>
          </form>
        </div>
      </>
    )
  }

  return (
    <div className='card mb-5 mb-xl-10'>
      {renderContent()}
      <ModalPair
        handleSelectedItem={handleSelectedItem}
        isModalOpen={isModalOpen}
        handleModalClose={handleModalClose}
      />
    </div>
  )
}
