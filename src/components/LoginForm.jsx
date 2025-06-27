import React, { useState } from 'react';
import { User, Lock, Mail, Phone, CreditCard } from 'lucide-react';

const LoginForm = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    idNumber: '',
    email: '',
    phone: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    // שם מלא
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'שם מלא הוא שדה חובה';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'שם מלא חייב להכיל לפחות 2 תווים';
    }

    // תעודת זהות
    if (!formData.idNumber.trim()) {
      newErrors.idNumber = 'תעודת זהות היא שדה חובה';
    } else if (!/^\d{9}$/.test(formData.idNumber.trim())) {
      newErrors.idNumber = 'תעודת זהות חייבת להכיל 9 ספרות';
    }

    // אימייל
    if (!formData.email.trim()) {
      newErrors.email = 'אימייל הוא שדה חובה';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'אנא הכנס אימייל תקין';
    }

    // טלפון
    if (!formData.phone.trim()) {
      newErrors.phone = 'מספר טלפון הוא שדה חובה';
    } else if (!/^05\d{8}$/.test(formData.phone.trim())) {
      newErrors.phone = 'מספר טלפון חייב להתחיל ב-05 ולהכיל 10 ספרות';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    // סימולציה של עיכוב
    setTimeout(() => {
      onLogin({
        ...formData,
        password: formData.idNumber // סיסמא = תעודת זהות
      });
      setIsSubmitting(false);
    }, 1000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // ניקוי שגיאה כשהמשתמש מתחיל להקליד
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            מערכת מבחן טכני
          </h2>
          <p className="text-gray-600">
            אנא הכנס את פרטיך כדי להתחיל במבחן
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
            {/* שם מלא */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                שם מלא
              </label>
              <div className="relative">
                <User className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`block w-full pr-10 pl-3 py-3 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors ${
                    errors.fullName ? 'border-error' : 'border-gray-300'
                  }`}
                  placeholder="הכנס שם מלא"
                />
              </div>
              {errors.fullName && (
                <p className="mt-1 text-sm text-error">{errors.fullName}</p>
              )}
            </div>

            {/* תעודת זהות */}
            <div>
              <label htmlFor="idNumber" className="block text-sm font-medium text-gray-700 mb-2">
                תעודת זהות
              </label>
              <div className="relative">
                <CreditCard className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  id="idNumber"
                  name="idNumber"
                  type="text"
                  required
                  value={formData.idNumber}
                  onChange={handleChange}
                  maxLength="9"
                  className={`block w-full pr-10 pl-3 py-3 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors ${
                    errors.idNumber ? 'border-error' : 'border-gray-300'
                  }`}
                  placeholder="הכנס 9 ספרות"
                />
              </div>
              {errors.idNumber && (
                <p className="mt-1 text-sm text-error">{errors.idNumber}</p>
              )}
            </div>

            {/* אימייל */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                אימייל
              </label>
              <div className="relative">
                <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className={`block w-full pr-10 pl-3 py-3 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors ${
                    errors.email ? 'border-error' : 'border-gray-300'
                  }`}
                  placeholder="הכנס אימייל"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-error">{errors.email}</p>
              )}
            </div>

            {/* טלפון */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                מספר טלפון
              </label>
              <div className="relative">
                <Phone className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  maxLength="10"
                  className={`block w-full pr-10 pl-3 py-3 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors ${
                    errors.phone ? 'border-error' : 'border-gray-300'
                  }`}
                  placeholder="05XXXXXXXX"
                />
              </div>
              {errors.phone && (
                <p className="mt-1 text-sm text-error">{errors.phone}</p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            {isSubmitting ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                מתחבר...
              </div>
            ) : (
              <div className="flex items-center">
                <Lock className="ml-2 h-4 w-4" />
                התחל מבחן
              </div>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm; 