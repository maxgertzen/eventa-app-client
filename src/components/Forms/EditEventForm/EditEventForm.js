import React from 'react';
import SwitchButton from '../FormSwitchButton/SwitchButton';
import VenueSelect from '../CreateEventForm/VenueSelect';


const EditEventForm = ({ formik }) => {
    return (
        <form id="edit-event" className="m-auto row" onSubmit={formik.handleSubmit}>
            <div className="col-md-12 col-12 mb-2">
                <label className="form-label" htmlFor="name">Name</label>
                <input className={`form-control ${formik.isValid && formik.touched.name ? 'is-valid' : formik.errors.name ? 'is-invalid' : ''}`} id="name" type="text" {...formik.getFieldProps('name')} placeholder="Event Name Here" />
                {formik.touched.name && formik.errors.name ? (
                    <div className="invalid-feedback">{formik.errors.name}</div>
                ) : null}
            </div>
            <div className="col-md-6 col-12 mb-2">
                <label className="form-label" htmlFor="category">Category</label>
                <select className="form-select" id="category" name="category" {...formik.getFieldProps('category')}>
                    <option>Select Category</option>
                    <option value="1">Music</option>
                    <option value="2">Visual Arts</option>
                    <option value="3">Theatre</option>
                    <option value="4">Film</option>
                    <option value="5">Technology</option>
                    <option value="6">Parties</option>
                </select>
                {formik.touched.category && formik.errors.category ? (
                    <div className="invalid-feedback">{formik.errors.category}</div>
                ) : null}
            </div>
            <div className="col-md-5 col-10 mb-2">
                <label className="form-label" htmlFor="price">Price</label>
                <input className="form-control" id="price" type="number" name="price" min="0" {...formik.getFieldProps('price')} />
                {formik.touched.price && formik.errors.price ? (
                    <div className="invalid-feedback">{formik.errors.price}</div>
                ) : null}
            </div>
            <div className="col-md-1 col-2 d-flex flex-column align-items-center justify-items-center mb-2">
                <label className="form-label" htmlFor="isPublic">Public</label>
                <SwitchButton id="isPublic" type="checkbox" name="isPublic" checked={formik.values.isPublic} {...formik.getFieldProps('isPublic')} />
            </div>
            <div className="col-md-12 col-12 mb-2">
                <label className="form-label" htmlFor="description">Description</label>
                <textarea className="form-control" id="description" name="description" {...formik.getFieldProps('description')}></textarea>
                {formik.touched.description && formik.errors.description ? (
                    <div className="invalid-feedback">{formik.errors.description}</div>
                ) : null}
            </div>
            <div className="col-md-12 col-12 mb-2">
                <label className="form-label" htmlFor="datestart">Start Date</label>
                <input className="form-control" id="datestart" type="datetime-local" name="dateStart" {...formik.getFieldProps('dateStart')} />
                {formik.touched.price && formik.errors.price ? (
                    <div className="invalid-feedback">{formik.errors.dateStart}</div>
                ) : null}
            </div>
            <div className="col-md-12 col-12 mb-2">
                <label className="form-label" htmlFor="dateend">End Date</label>
                <input className="form-control" id="dateend" type="datetime-local" name="dateEnd" {...formik.getFieldProps('dateEnd')} />
                {formik.touched.price && formik.errors.price ? (
                    <div className="invalid-feedback">{formik.errors.dateEnd}</div>
                ) : null}
            </div>
            <div className="col-md-12 col-12 mb-2">
                <label htmlFor="formFile" className="form-label">Upload Image</label>
                <input type="file" id="formFile" className="form-control" name="imageupload" onChange={event => formik.setFieldValue('imageupload', event.target.files[0])} />
            </div>
            <fieldset>
                <legend>Venue Details</legend>
                <VenueSelect formik={formik} />
            </fieldset>
        </form>
    )
}

export default EditEventForm;