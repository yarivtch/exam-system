import React, { useState } from 'react';
import { User, Lock, Mail, Phone, CreditCard, Award, ArrowRight, CheckCircle } from 'lucide-react';

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Award className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">
              מערכת מבחן טכני
            </h2>
            <p className="text-blue-100 text-lg">
              Full Stack Senior Developer
            </p>
            <p className="text-blue-200 mt-2">
              אנא הכנס את פרטיך כדי להתחיל במבחן
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="bg-white rounded-2xl shadow-2xl p-8 space-y-6 border border-white/20">
            {/* שם מלא */}
            <div>
              <label htmlFor="fullName" className="block text-base font-semibold text-gray-700 mb-3">
                שם מלא
              </label>
              <div className="relative">
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                  <User className="h-3 w-3 text-white" />
                </div>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`block w-full pr-12 pl-4 py-4 border-2 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 text-base ${
                    errors.fullName ? 'border-error bg-error/5' : 'border-gray-200 hover:border-gray-300'
                  }`}
                  placeholder="הכנס שם מלא"
                />
              </div>
              {errors.fullName && (
                <p className="mt-2 text-sm text-error font-medium flex items-center">
                  <span className="w-1 h-1 bg-error rounded-full mr-2"></span>
                  {errors.fullName}
                </p>
              )}
            </div>

            {/* תעודת זהות */}
            <div>
              <label htmlFor="idNumber" className="block text-base font-semibold text-gray-700 mb-3">
                תעודת זהות
              </label>
              <div className="relative">
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center">
                  <CreditCard className="h-3 w-3 text-white" />
                </div>
                <input
                  id="idNumber"
                  name="idNumber"
                  type="text"
                  required
                  value={formData.idNumber}
                  onChange={handleChange}
                  maxLength="9"
                  className={`block w-full pr-12 pl-4 py-4 border-2 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 text-base ${
                    errors.idNumber ? 'border-error bg-error/5' : 'border-gray-200 hover:border-gray-300'
                  }`}
                  placeholder="הכנס 9 ספרות"
                />
              </div>
              {errors.idNumber && (
                <p className="mt-2 text-sm text-error font-medium flex items-center">
                  <span className="w-1 h-1 bg-error rounded-full mr-2"></span>
                  {errors.idNumber}
                </p>
              )}
            </div>

            {/* אימייל */}
            <div>
              <label htmlFor="email" className="block text-base font-semibold text-gray-700 mb-3">
                אימייל
              </label>
              <div className="relative">
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 bg-gradient-to-br from-success to-green-600 rounded-full flex items-center justify-center">
                  <Mail className="h-3 w-3 text-white" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className={`block w-full pr-12 pl-4 py-4 border-2 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 text-base ${
                    errors.email ? 'border-error bg-error/5' : 'border-gray-200 hover:border-gray-300'
                  }`}
                  placeholder="הכנס אימייל"
                />
              </div>
              {errors.email && (
                <p className="mt-2 text-sm text-error font-medium flex items-center">
                  <span className="w-1 h-1 bg-error rounded-full mr-2"></span>
                  {errors.email}
                </p>
              )}
            </div>

            {/* טלפון */}
            <div>
              <label htmlFor="phone" className="block text-base font-semibold text-gray-700 mb-3">
                מספר טלפון
              </label>
              <div className="relative">
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 bg-gradient-to-br from-warning to-yellow-600 rounded-full flex items-center justify-center">
                  <Phone className="h-3 w-3 text-white" />
                </div>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  maxLength="10"
                  className={`block w-full pr-12 pl-4 py-4 border-2 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 text-base ${
                    errors.phone ? 'border-error bg-error/5' : 'border-gray-200 hover:border-gray-300'
                  }`}
                  placeholder="05XXXXXXXX"
                />
              </div>
              {errors.phone && (
                <p className="mt-2 text-sm text-error font-medium flex items-center">
                  <span className="w-1 h-1 bg-error rounded-full mr-2"></span>
                  {errors.phone}
                </p>
              )}
            </div>

            {/* כפתור התחברות */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary flex items-center justify-center space-x-2 space-x-reverse py-4 text-lg font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="spinner w-5 h-5"></div>
                    <span>מתחבר...</span>
                  </>
                ) : (
                  <>
                    <span>התחל מבחן</span>
                    <ArrowRight className="h-5 w-5" />
                  </>
                )}
              </button>
            </div>
          </div>
        </form>

        {/* מידע נוסף */}
        <div className="text-center">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6">
            <div className="flex items-center justify-center space-x-2 space-x-reverse mb-3">
              <CheckCircle className="h-5 w-5 text-green-400" />
              <span className="text-blue-100 font-medium">מערכת מאובטחת</span>
            </div>
            <p className="text-blue-200 text-sm">
              הנתונים שלך מוגנים ומאובטחים במערכת
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm; 