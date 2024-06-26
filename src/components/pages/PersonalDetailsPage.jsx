import React, { useContext, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Label from '../layout/Label';
import "../styles/styles.css";
import { TempStorage } from '../TempStorage';
import { useNavigate } from 'react-router-dom';

const PersonalDetailsPage = () => {
    const { setPersonalDetails } = useContext(TempStorage);
    const navigate = useNavigate();

    const initialValues = {
        studentName: "",
        photoUpload: null,
        dob: "",
        gender: "",
        phoneNo: "",
        bloodGroup: "",
        email1: "",
        email2: "",
        tempAddress: "",
        permAddress: "",
        sameAsTempAddress: false,
        state: "",
        district: "",
        pincode: "",
        nationality: "",
        religion: "",
        fatherName: "",
        fatherPhone: "",
        fatherEmail: "",
        fatherOccupation: "",
        motherName: "",
        motherPhone: "",
        motherEmail: "",
        motherOccupation: "",
        siblingName: "",
        siblingPhone: "",
        siblingEmail: "",
        siblingOccupation: "",
    };

    const validationSchema = Yup.object().shape({
        studentName: Yup.string().required("Student Name is required").max(40, "Student Name should be up to 40 characters"),
        // photoUpload: Yup.mixed().required("Photo upload is required"),
        // dob: Yup.string().required("Date of birth is required"),
        // gender: Yup.string().required("Gender is required"),
        // phoneNo: Yup.string().matches(/^[0-9]+$/, "Please enter a valid phone number").required("Phone Number is mandatory")
        // .matches(/^\d{10}$/, "Phone number must be 10 digits"),
        // bloodGroup: Yup.string().required("Blood Group is required"),
        // email1: Yup.string().email("Invalid email format").required("Email is required"),
        // email2: Yup.string().email("Invalid email format").required("Email is required"),
        // tempAddress: Yup.string().required("Temporary Address is required"),
        // permAddress: Yup.string().required("Permanent Address is required"),
        // state: Yup.string().required("State is required"),
        // district: Yup.string().required("District is required"),
        // pincode: Yup.string().required("Pincode is required"),
        // nationality: Yup.string().required("Nationality is required"),
        // religion: Yup.string().required("Religion is required"),
        // fatherName: Yup.string().required("Father Name is required"),
        // fatherPhone: Yup.string()
        //     .required("Phone number is required")
        //     .matches(/^\d{10}$/, "Phone number must be 10 digits"),
        // fatherEmail: Yup.string().email("Invalid email format").required("Father Email is required"),
        // fatherOccupation: Yup.string().required("Father Occupation is required"),
        // motherName: Yup.string().required("Mother Name is required"),
        // motherPhone: Yup.string().required("Mother Phone is required"),
        // motherEmail: Yup.string().email("Invalid email format").required("Mother Email is required"),
        // motherOccupation: Yup.string().required("Mother Occupation is required"),
        // siblingName: Yup.string().required("Sibling Name is required"),
        // siblingPhone: Yup.string().required("Sibling Phone is required"),
        // siblingEmail: Yup.string().email("Invalid email format").required("Sibling Email is required"),
        // siblingOccupation: Yup.string().required("Sibling Occupation is required"),
    });


    const [uploadedPhoto, setUploadedPhoto] = useState(null);

    const handleSubmit = (values, { setSubmitting, resetForm }) => {
        try {
            console.log('Personal Details:', values);
            setPersonalDetails({ ...values, photo: uploadedPhoto }); // Include photo in personal details
            setUploadedPhoto(null);
            resetForm();
            navigate('/add-EducationalDetails');
        }
        catch (e) {
            console.log(e);
        }
        // axios.post("/api/formdata", values)
        //     .then(response => {
        //         resetForm();
        //     })
        //     .catch(error => {
        //         console.error("Error submitting form data:", error);
        //     })
        //     .finally(() => {
        //         setSubmitting(false);
        //     });

    };

    // const handleNumericInput = (e, maxLength) => {
    //     const input = e.target;
    //     let value = input.value.replace(/\D/g, ''); // Remove non-numeric characters
    //     if (value.length > maxLength) {
    //         value = value.slice(0, maxLength); // Limit to 10 digits
    //     }
    //     input.value = value;
    // };

    // Function to handle checkbox change
    const handleCheckboxChange = (event, setFieldValue, values) => {
        const isChecked = event.target.checked;
        if (isChecked) {
            setFieldValue('permAddress', values.tempAddress);
        } else {
            setFieldValue('permAddress', '');
        }
    };




    return (
        <div className="form-container">
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting, setFieldValue, values }) => (
                    <Form>
                        {/* Personal Details */}
                        <fieldset className='fieldset'>
                            <legend>
                                <h3>Personal Details</h3>
                            </legend>
                            <div className="form-row">
                                <Label required={true} htmlFor="studentName">Name of the Student:</Label>
                                <Field type="text" id="studentName" name="studentName" placeholder="Enter Student's Name" autoComplete='off' className="input-field-small" />
                                <ErrorMessage name="studentName" component="div" className="text-danger" />
                            </div>

                            <div>
                                <label htmlFor="photoUpload">Photo Upload:</label>
                                <input
                                    type="file"
                                    id="photoUpload"
                                    name="photoUpload"
                                    onChange={(event) => {
                                        const file = event.currentTarget.files[0];
                                        setUploadedPhoto(URL.createObjectURL(file));
                                        setFieldValue("photoUpload", file);
                                    }}
                                    className="input-field-small"
                                />
                                <ErrorMessage name="photoUpload" component="div" className="text-danger" />
                                {uploadedPhoto && <img src={uploadedPhoto} alt="Uploaded" style={{ maxWidth: '200px', maxHeight: '200px', marginLeft: '10px' }} />}
                            </div>

                            <div className="form-row">
                                <label htmlFor="dob">Date of Birth:</label>
                                <Field type="date" id="dob" name="dob" placeholder="Select Date of Birth" autoComplete='off' className="input-field" />
                                <ErrorMessage name="dob" component="div" className="text-danger" />
                            </div>

                            <div className="form-row">
                                <label htmlFor="gender">Gender:</label>
                                <div className="input-field" id="gender-radio-buttons">
                                    <Field type="radio" id="male" name="gender" value="Male" />
                                    <label htmlFor="male">Male</label>

                                    {/* Add space between male and female radio buttons */}
                                    <Field type="radio" id="female" name="gender" value="Female" style={{ marginLeft: '10px' }} />
                                    <label htmlFor="female" style={{ marginRight: '10px' }}>Female</label>

                                    {/* Add space between female and other radio buttons */}
                                    <Field type="radio" id="other" name="gender" value="Other" style={{ marginLeft: '10px' }} />
                                    <label htmlFor="other">Other</label>
                                </div>
                                <ErrorMessage name="gender" component="div" className="text-danger" />
                            </div>


                            <div className="form-row">
                                <label htmlFor="phoneNo">Phone Number:</label>
                                <Field type="text" id="phoneNo" name="phoneNo" placeholder="Enter Phone Number" autoComplete='off' className="input-field" />
                                <ErrorMessage name="phoneNo" component="div" className="text-danger" />
                            </div>

                            <div className="form-row">
                                <label htmlFor="bloodGroup">Blood Group:</label>
                                <Field as="select" id="bloodGroup" name="bloodGroup" placeholder="Select Blood Group" className="input-field">
                                    <option value="">-Select Blood Group-</option>
                                    <option value="A+">A+</option>
                                    <option value="A-">A-</option>
                                    <option value="B+">B+</option>
                                    <option value="B-">B-</option>
                                    <option value="AB+">AB+</option>
                                    <option value="AB-">AB-</option>
                                    <option value="O+">O+</option>
                                    <option value="O-">O-</option>
                                </Field>
                                <ErrorMessage name="bloodGroup" component="div" className="text-danger" />
                            </div>

                            <div className="form-row">
                                <label htmlFor="email1">Personal Email:</label>
                                <Field type="email" id="email1" name="email1" placeholder="Enter Personal Email" autoComplete='off' className="input-field" />
                                <ErrorMessage name="email1" component="div" className="text-danger" />
                            </div>

                            <div className="form-row">
                                <label htmlFor="email2">Official Email:</label>
                                <Field type="email" id="email2" name="email2" placeholder="Enter Official Email" autoComplete='off' className="input-field" />
                                <ErrorMessage name="email2" component="div" className="text-danger" />
                            </div>

                            <div className="form-row">
                                <label htmlFor="tempAddress">Permanent Address:</label>
                                <Field type="text" id="tempAddress" name="tempAddress" placeholder="Enter Permanent Address" autoComplete='off' className="input-field" />
                                <ErrorMessage name="tempAddress" component="div" className="text-danger" />
                            </div>

                            <div className="form-row">
                                <label htmlFor="sameAsTempAddress">Is Correspondence Address Same as Permanent Address</label>
                                <input
                                    type="checkbox"
                                    id="sameAsTempAddress"
                                    name="sameAsTempAddress"
                                    onChange={(event) => handleCheckboxChange(event, setFieldValue, values)}
                                />
                            </div>

                            <div className="form-row">
                                <label htmlFor="permAddress">Correspondence Address:</label>
                                <Field type="text" id="permAddress" name="permAddress" placeholder="Enter Correspondence Address" autoComplete='off' className="input-field" />
                                <ErrorMessage name="permAddress" component="div" className="text-danger" />
                            </div>

                            <div className="form-row">
                                <label htmlFor="state">State:</label>
                                <Field as="select" id="state" name="state" placeholder="Select State" className="input-field">
                                    <option value="">Select State</option>
                                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                                    <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                                    <option value="Assam">Assam</option>
                                    <option value="Bihar">Bihar</option>
                                    <option value="Chhattisgarh">Chhattisgarh</option>
                                    <option value="Goa">Goa</option>
                                    <option value="Gujarat">Gujarat</option>
                                    <option value="Haryana">Haryana</option>
                                    <option value="Himachal Pradesh">Himachal Pradesh</option>
                                    <option value="Jharkhand">Jharkhand</option>
                                    <option value="Karnataka">Karnataka</option>
                                    <option value="Kerala">Kerala</option>
                                    <option value="Madhya Pradesh">Madhya Pradesh</option>
                                    <option value="Maharashtra">Maharashtra</option>
                                    <option value="Manipur">Manipur</option>
                                    <option value="Meghalaya">Meghalaya</option>
                                    <option value="Mizoram">Mizoram</option>
                                    <option value="Nagaland">Nagaland</option>
                                    <option value="Odisha">Odisha</option>
                                    <option value="Punjab">Punjab</option>
                                    <option value="Rajasthan">Rajasthan</option>
                                    <option value="Sikkim">Sikkim</option>
                                    <option value="Tamil Nadu">Tamil Nadu</option>
                                    <option value="Telangana">Telangana</option>
                                    <option value="Tripura">Tripura</option>
                                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                                    <option value="Uttarakhand">Uttarakhand</option>
                                    <option value="West Bengal">West Bengal</option>
                                </Field>
                                <ErrorMessage name="state" component="div" className="text-danger" />
                            </div>

                            <div className="form-row">
                                <label htmlFor="district">District:</label>
                                <Field type="text" id="district" name="district" placeholder="Enter District" autoComplete='off' className="input-field" />
                                <ErrorMessage name="district" component="div" className="text-danger" />
                            </div>

                            <div className="form-row">
                                <label htmlFor="pincode">Pincode:</label>
                                <Field type="text" id="pincode" name="pincode" placeholder="Enter Pincode" autoComplete='off' className="input-field" />
                                <ErrorMessage name="pincode" component="div" className="text-danger" />
                            </div>

                            <div className="form-row">
                                <label htmlFor="nationality">Nationality:</label>
                                <Field type="text" id="nationality" name="nationality" placeholder="Enter Nationality" autoComplete='off' className="input-field" />
                                <ErrorMessage name="nationality" component="div" className="text-danger" />
                            </div>

                            <div className="form-row">
                                <label htmlFor="religion">Religion:</label>
                                <Field type="text" id="religion" name="religion" placeholder="Enter Religion" autoComplete='off' className="input-field" />
                                <ErrorMessage name="religion" component="div" className="text-danger" />
                            </div>
                        </fieldset>

                        <br />

                        {/* Family Details */}
                        <fieldset className='fieldset'>
                            <legend>
                                <h3>Family Details</h3>
                            </legend>
                            <div className="form-row">
                                <label htmlFor="fatherName">Father Name:</label>
                                <Field type="text" id="fatherName" name="fatherName" placeholder="Enter Father's Name" autoComplete='off' className="input-field" />
                                <ErrorMessage name="fatherName" component="div" className="text-danger" />
                            </div>

                            <div className="form-row">
                                <label htmlFor="fatherPhone">Father Phone:</label>
                                <Field type="text" id="fatherPhone" name="fatherPhone" placeholder="Enter Father's Phone" autoComplete='off' className="input-field" />
                                <ErrorMessage name="fatherPhone" component="div" className="text-danger" />
                            </div>

                            <div className="form-row">
                                <label htmlFor="fatherEmail">Father Email:</label>
                                <Field type="email" id="fatherEmail" name="fatherEmail" placeholder="Enter Father's Email" autoComplete='off' className="input-field" />
                                <ErrorMessage name="fatherEmail" component="div" className="text-danger" />
                            </div>

                            <div className="form-row">
                                <label htmlFor="fatherOccupation">Father Occupation:</label>
                                <Field type="text" id="fatherOccupation" name="fatherOccupation" placeholder="Enter Father's Occupation" autoComplete='off' className="input-field" />
                                <ErrorMessage name="fatherOccupation" component="div" className="text-danger" />
                            </div>

                            <div className="form-row">
                                <label htmlFor="motherName">Mother Name:</label>
                                <Field type="text" id="motherName" name="motherName" placeholder="Enter Mother's Name" autoComplete='off' className="input-field" />
                                <ErrorMessage name="motherName" component="div" className="text-danger" />
                            </div>

                            <div className="form-row">
                                <label htmlFor="motherPhone">Mother Phone:</label>
                                <Field type="text" id="motherPhone" name="motherPhone" placeholder="Enter Mother's Phone" autoComplete='off' className="input-field" />
                                <ErrorMessage name="motherPhone" component="div" className="text-danger" />
                            </div>

                            <div className="form-row">
                                <label htmlFor="motherEmail">Mother Email:</label>
                                <Field type="email" id="motherEmail" name="motherEmail" placeholder="Enter Mother's Email" autoComplete='off' className="input-field" />
                                <ErrorMessage name="motherEmail" component="div" className="text-danger" />
                            </div>

                            <div className="form-row">
                                <label htmlFor="motherOccupation">Mother Occupation:</label>
                                <Field type="text" id="motherOccupation" name="motherOccupation" placeholder="Enter Mother's Occupation" autoComplete='off' className="input-field" />
                                <ErrorMessage name="motherOccupation" component="div" className="text-danger" />
                            </div>

                            <div className="form-row">
                                <label htmlFor="siblingName">Sibling Name:</label>
                                <Field type="text" id="siblingName" name="siblingName" placeholder="Enter Sibling's Name" autoComplete='off' className="input-field" />
                                <ErrorMessage name="siblingName" component="div" className="text-danger" />
                            </div>

                            <div className="form-row">
                                <label htmlFor="siblingPhone">Sibling Phone:</label>
                                <Field type="text" id="siblingPhone" name="siblingPhone" placeholder="Enter Sibling's Phone" autoComplete='off' className="input-field" />
                                <ErrorMessage name="siblingPhone" component="div" className="text-danger" />
                            </div>

                            <div className="form-row">
                                <label htmlFor="siblingEmail">Sibling Email:</label>
                                <Field type="email" id="siblingEmail" name="siblingEmail" placeholder="Enter Sibling's Email" autoComplete='off' className="input-field" />
                                <ErrorMessage name="siblingEmail" component="div" className="text-danger" />
                            </div>

                            <div className="form-row">
                                <label htmlFor="siblingOccupation">Sibling Occupation:</label>
                                <Field type="text" id="siblingOccupation" name="siblingOccupation" placeholder="Enter Sibling's Occupation" autoComplete='off' className="input-field" />
                                <ErrorMessage name="siblingOccupation" component="div" className="text-danger" />
                            </div>
                        </fieldset> <br />

                        <button type="submit" className="submit-button">Save & Next</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default PersonalDetailsPage;
