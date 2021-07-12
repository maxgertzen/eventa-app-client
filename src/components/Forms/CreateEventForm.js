import React from 'react';
import { Formik } from 'formik';
import { eventSchema } from '../../utils/EventFormValidation';
import SwitchButton from './FormSwitchButton/SwitchButton';


const CreateEventForm = () => {
    return (
        <Formik
            initialValues={{ name: '', description: '', price: '', isPublic: false, dateStart: new Date(), dateEnd: new Date() }}
            validationSchema={eventSchema}
            onSubmit={async (values, { setSubmitting }) => {
                // await addLogUser(values, formAction);
                // authorize()
                setSubmitting(false);
            }}
        >
            {formik => (
                <form className="m-auto row" style={{ width: '50vw' }} onSubmit={formik.handleSubmit}>
                    <div className="col-12 mb-2">
                        <label className="form-label" htmlFor="name">Name</label>
                        <input className={`form-control ${!formik.isValid ? 'is-invalid' : 'is-valid'}`} id="name" type="text" {...formik.getFieldProps('name')} />
                        {formik.touched.name && formik.errors.name ? (
                            <div class="invalid-feedback">{formik.errors.name}</div>
                        ) : null}
                    </div>
                    <div className="col-12 mb-2">
                        <label className="form-label" htmlFor="description">Description</label>
                        <textarea className="form-control" id="description" name="description" {...formik.getFieldProps('description')}></textarea>
                        {formik.touched.description && formik.errors.description ? (
                            <div class="invalid-feedback">{formik.errors.description}</div>
                        ) : null}
                    </div>
                    <div className="col-12 mb-2">
                        <label className="form-label" htmlFor="price">Price</label>
                        <input className="form-control" id="price" type="number" name="price" min="0" {...formik.getFieldProps('price')} />
                        {formik.touched.price && formik.errors.price ? (
                            <div class="invalid-feedback">{formik.errors.price}</div>
                        ) : null}
                    </div>
                    <div className="col-6 mb-2">
                        <label className="form-label" htmlFor="datestart">Date Start</label>
                        <input className="form-control" id="datestart" type="datetime-local" name="datestart" min="0" {...formik.getFieldProps('dateStart')} />
                        {formik.touched.price && formik.errors.price ? (
                            <div class="invalid-feedback">{formik.errors.dateStart}</div>
                        ) : null}
                    </div>
                    <div className="col-6 mb-2">
                        <label className="form-label" htmlFor="dateend">Date End</label>
                        <input className="form-control" id="dateend" type="datetime-local" name="dateend" min="0" {...formik.getFieldProps('dateStart')} />
                        {formik.touched.price && formik.errors.price ? (
                            <div class="invalid-feedback">{formik.errors.dateEnd}</div>
                        ) : null}
                    </div>
                    <div className="col-12 mb-2">
                        <label className="form-label" htmlFor="isPublic">Public</label>
                        <SwitchButton id="isPublic" type="checkbox" name="isPublic" {...formik.getFieldProps('isPublic')} />
                    </div>
                    <div className="col-12 mb-2 d-grid">
                        <button type="submit" className="btn btn-primary" disabled={!formik.isValid}>Create</button>
                    </div>
                </form>
            )}
        </Formik>
    );
}

export default CreateEventForm;