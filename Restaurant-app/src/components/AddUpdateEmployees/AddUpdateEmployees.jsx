import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useDispatch } from "react-redux";
import { addEmployee, updateEmployee } from "../../slices/EmployeeSlice";
import axios from "axios";
import "./AddUpdateEmployees.css";

export default function AddUpdateEmployees() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();
    const [image, setImage] = useState(null);
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        role: "employee",
        address: "",
        salary: "",
        joiningDate: "",
        shift: "",
    });
    const [loading, setLoading] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);

    // Fetch employee data if updating
    useEffect(() => {
        if (id) {
            setIsUpdate(true);
            axios.get(`http://localhost:3000/employees/${id}`)
                .then(res => {
                    const emp = res.data;
                    setForm({
                        firstName: emp.firstName || "",
                        lastName: emp.lastName || "",
                        email: emp.email || "",
                        password: emp.password || "",
                        role: emp.role || "employee",
                        address: emp.address || "",
                        salary: emp.salary || "",
                        joiningDate: emp.joiningDate || "",
                        shift: emp.shift || "",
                    });
                    setImage(emp.profileImage || null);
                })
                .catch(err => console.error(err));
        }
    }, [id]);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onload = (event) => setImage(event.target.result);
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!image) return alert("Please upload an image.");

        const employeeData = { ...form, salary: Number(form.salary), profileImage: image };

        try {
            setLoading(true);
            if (isUpdate) {
                await dispatch(updateEmployee({ id, employeeData })).unwrap();
                alert("Employee updated successfully!");
            } else {
                await dispatch(addEmployee(employeeData)).unwrap();
                alert("Employee added successfully!");
            }
            navigate("/manager-dashboard/employees");
        } catch (err) {
            console.error(err);
            alert("Error saving employee");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="add-update-employee">
            {/* Header */}
            <div className="employee-form-header">
                <div className="header-content">
                    <h1 className="page-title">{isUpdate ? "✏️ Update Employee" : "Add New Employee"}</h1>
                    <p className="page-subtitle">{isUpdate ? "Update employee details and information" : "Add a new team member to your restaurant"}</p>
                </div>
            </div>

            <div className="employee-form-container">
                {/* Image Upload */}
                <div className="image-upload-section">
                    <div className="image-upload-card">
                        <h3 className="upload-title">📷 Profile Picture</h3>
                        <p className="upload-subtitle">Upload a clear photo of the employee</p>

                        <div className="image-upload-area">
                            <label htmlFor="file-upload" className="upload-label">
                                {image ? (
                                    <div className="image-preview">
                                        <img src={image} alt="Preview" className="preview-image" />
                                        <div className="image-overlay"><span className="change-text">Change Image</span></div>
                                    </div>
                                ) : (
                                    <div className="upload-placeholder">
                                        <div className="upload-icon">📸</div>
                                        <p className="upload-text">Click to upload image</p>
                                        <p className="upload-hint">JPG, PNG, WEBP (Max 5MB)</p>
                                    </div>
                                )}
                            </label>
                            <input id="file-upload" type="file" accept="image/*" onChange={handleFileChange} className="file-input" />
                        </div>
                    </div>
                </div>

                {/* Form */}
                <div className="form-section">
                    <form className="employee-form" onSubmit={handleSubmit}>
                        {/* Personal Info */}
                        <div className="form-section-group">
                            <h3 className="section-title">👤 Personal Information</h3>
                            <div className="form-row">
                                <div className="form-group">
                                    <label className="form-label">First Name *</label>
                                    <input type="text" name="firstName" className="form-input" value={form.firstName} onChange={handleChange} required placeholder="Enter first name" />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Last Name</label>
                                    <input type="text" name="lastName" className="form-input" value={form.lastName} onChange={handleChange} placeholder="Enter last name" />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label className="form-label">Email Address *</label>
                                    <input type="email" name="email" className="form-input" value={form.email} onChange={handleChange} required placeholder="employee@restaurant.com" />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Password *</label>
                                    <input type="password" name="password" className="form-input" value={form.password} onChange={handleChange} required placeholder="Enter secure password" />
                                </div>
                            </div>

                            <div className="form-group full-width">
                                <label className="form-label">Address</label>
                                <input type="text" name="address" className="form-input" value={form.address} onChange={handleChange} placeholder="Enter complete address" />
                            </div>
                        </div>

                        {/* Employment Info */}
                        <div className="form-section-group">
                            <h3 className="section-title">💼 Employment Details</h3>
                            <div className="form-row">
                                <div className="form-group">
                                    <label className="form-label">Role</label>
                                    <select name="role" className="form-input" value={form.role} onChange={handleChange}>
                                        <option value="employee">Employee</option>
                                        <option value="manager">Manager</option>
                                        <option value="chef">Chef</option>
                                        <option value="waiter">Waiter</option>
                                        <option value="cashier">Cashier</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Salary (₹)</label>
                                    <input type="number" name="salary" className="form-input" value={form.salary} onChange={handleChange} placeholder="Enter monthly salary" />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label className="form-label">Shift Timing</label>
                                    <select name="shift" className="form-input" value={form.shift} onChange={handleChange}>
                                        <option value="">Select Shift</option>
                                        <option value="Morning (9AM-5PM)">Morning (9AM-5PM)</option>
                                        <option value="Evening (5PM-1AM)">Evening (5PM-1AM)</option>
                                        <option value="Night (10PM-6AM)">Night (10PM-6AM)</option>
                                        <option value="Flexible">Flexible</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Joining Date</label>
                                    <input type="date" name="joiningDate" className="form-input" value={form.joiningDate} onChange={handleChange} />
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="form-actions">
                            <button type="button" className="cancel-btn" onClick={() => navigate("/manager-dashboard/employees")}>Cancel</button>
                            <button type="submit" className="submit-btn" disabled={loading || !image}>
                                {loading ? (<>Processing...</>) : (<> {isUpdate ? "💾 Update Employee" : "➕ Add Employee"} </>)}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
