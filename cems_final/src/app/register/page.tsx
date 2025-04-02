'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import '../../styles/register.css';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    contactNo: '',
    address: '',
    password: ''
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    const data = await res.json();

    if (res.ok) {
      alert('Registration successful! Redirecting to login...');
      router.push('/login');
    } else {
      alert(data.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="register-container">
      <div className="form-card">
        <h2 className="form-title">Create Account</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required />
          <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
          <input type="text" name="contactNo" placeholder="Contact Number" value={formData.contactNo} onChange={handleChange} required />
          <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
          <button type="submit" className="register-btn">Register</button>
        </form>
        <p className="login-link">
          Already have an account? <Link href="/login">Click for Login ...</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
