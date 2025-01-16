"use client";
import { useState } from 'react';
import axios from 'axios';

const AccountManagementForm = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [admissionNo, setAdmissionNo] = useState('');
    const [className, setClassName] = useState('');
    const [subject, setSubject] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('student');
    const [deleteUsername, setDeleteUsername] = useState('');
    const [message, setMessage] = useState('');
    const [activeTab, setActiveTab] = useState('create');

    const handleCreateAccount = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('');
        try {
            const response = await axios.post('/api/admin/settings/add', {
                firstName,
                lastName,
                admissionNo,
                className,
                subject,
                username,
                password,
                role
            });
            setMessage(response.data.message);
            // Reset fields
            resetFields();
        } catch (error: any) {
            setMessage('Error creating account: ' + error.response?.data?.message || 'Unknown error occurred');
        }
    };

    const resetFields = (newRole = role) => {
        setFirstName('');
        setLastName('');
        setAdmissionNo('');
        setClassName('');
        setSubject('');
        setUsername('');
        setPassword('');
        setRole(newRole); // Use the newRole parameter to set the role
    };
    
    const handleUpdatePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('');
        try {
            const response = await axios.post('/api/update-pswd', { username, password });
            setMessage(response.data.msg);
            setUsername('');
            setPassword('');
        } catch (error: any) {
            setMessage('Error updating password: ' + error.response?.data?.message || 'Unknown error occurred');
        }
    };

    const handleDeleteAccount = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('');
        try {
            const response = await axios.post('/api/admin/settings/remove', { username: deleteUsername });
            setMessage(response.data.msg);
            setDeleteUsername('');
        } catch (error: any) {
            setMessage('Error removing account: ' + error.response?.data?.message || 'Unknown error occurred');
        }
    };

    const TabButton = ({ id, label }: { id: string; label: string }) => (
        <button
            onClick={() => setActiveTab(id)}
            className={`px-4 py-2 font-semibold rounded-t-lg ${
                activeTab === id
                    ? 'bg-white text-blue-600 border-t border-x border-gray-200'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
        >
            {label}
        </button>
    );

    return (
        <div className="w-full max-w-6xl mx-left mt-8 bg-white rounded-lg shadow-md overflow-hidden">
            <h2 className="text-2xl font-bold p-6 bg-gray-50 border-b border-gray-200">Account Management</h2>
            
            <div className="flex border-b border-gray-200">
                <TabButton id="create" label="Create Account" />
                <TabButton id="update" label="Update Password" />
                <TabButton id="delete" label="Remove Account" />
            </div>

            <div className="p-6">
                {activeTab === 'create' && (
                    <form onSubmit={handleCreateAccount} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {role === 'admin' && (
                                <>
                                    <div>
                                        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                                        <input
                                            type="text"
                                            id="username"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            required
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="password" className=" block text-sm font-medium text-gray-700 mb-1">Password</label>
                                        <input
                                            type="password"
                                            id="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </>
                            )}
                            {['student', 'teacher'].includes(role) && (
                                <>
                                    <div>
                                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                                        <input
                                            type="text"
                                            id="firstName"
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                            required
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                                        <input
                                            type="text"
                                            id="lastName"
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                            required
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    {role === 'student' && (
                                        <>
                                            <div>
                                                <label htmlFor="admissionNo" className="block text-sm font-medium text-gray-700 mb-1">Admission No</label>
                                                <input
                                                    type="text"
                                                    id="admissionNo"
                                                    value={admissionNo}
                                                    onChange={(e) => setAdmissionNo(e.target.value)}
                                                    required
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="className" className="block text-sm font-medium text-gray-700 mb-1">Class</label>
                                                <input
                                                    type="text"
                                                    id="className"
                                                    value={className}
                                                    onChange={(e) => setClassName(e.target.value)}
                                                    required
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                />
                                            </div>
                                        </>
                                    )}
                                    {role === 'teacher' && (
                                        <div>
                                            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                                            <input
                                                type="text"
                                                id="subject"
                                                value={subject}
                                                onChange={(e) => setSubject(e.target.value)}
                                                required
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                    )}
                                    <div>
                                        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                                        <input
                                            type="text"
                                            id="username"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            required
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                                        <input
                                            type="password"
                                            id="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </>
                            )}
                        </div>
                        <div>
                            <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                            <select
                                id="role"
                                value={role}
                                onChange={(e) => {
                                    const selectedRole = e.target.value;
                                    resetFields(selectedRole); // Reset fields when role changes
                                }}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus ```javascript
:ring-2 focus:ring-blue-500"
                            >
                                <option value="student">Student</option>
                                <option value="teacher">Teacher</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                        <button 
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                        >
                            Create Account
                        </button>
                    </form>
                )}

                {activeTab === 'update' && (
                    <form onSubmit={handleUpdatePassword} className="space-y-4">
                        <div>
                            <label htmlFor="updateUsername" className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                            <input
                                type="text"
                                id="updateUsername"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="updatePassword" className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                            <input
                                type="password"
                                id="updatePassword"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <button 
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                        >
                            Update Password
                        </button>
                    </form>
                )}

                {activeTab === 'delete' && (
                    <form onSubmit={handleDeleteAccount} className="space-y-4">
                        <div>
                            <label htmlFor="deleteUsername" className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                            <input
                                type="text"
                                id="deleteUsername"
                                value={deleteUsername}
                                onChange={(e) => setDeleteUsername(e.target.value)}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <button 
                            type="submit"
                            className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
                        >
                            Remove Account
                        </button>
                    </form>
                )}

                {message && (
                    <div className={`mt-4 p-3 rounded ${message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                        {message}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AccountManagementForm;