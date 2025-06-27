import React from 'react';
import { Clock, User, BookOpen } from 'lucide-react';

const ExamHeader = ({ userInfo, timer, currentQuestion, totalQuestions, answeredQuestions }) => {
  return (
    <div className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between py-4 space-y-4 md:space-y-0">
          {/* מידע על המשתמש */}
          <div className="flex items-center space-x-4 space-x-reverse">
            <div className="flex items-center space-x-2 space-x-reverse">
              <User className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-gray-900">
                {userInfo?.fullName}
              </span>
            </div>
            <div className="text-sm text-gray-500">
              ת.ז: {userInfo?.idNumber}
            </div>
          </div>

          {/* כותרת המבחן */}
          <div className="text-center">
            <h1 className="text-xl font-bold text-gray-900">
              מערכת מבחן טכני מקצועית
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Full Stack Senior Developer
            </p>
          </div>

          {/* טיימר וסטטיסטיקות */}
          <div className="flex items-center space-x-6 space-x-reverse">
            {/* שאלות שנענו */}
            <div className="flex items-center space-x-2 space-x-reverse">
              <BookOpen className="h-5 w-5 text-success" />
              <div className="text-sm">
                <span className="font-medium text-gray-900">{answeredQuestions}</span>
                <span className="text-gray-500"> / {totalQuestions}</span>
              </div>
            </div>

            {/* טיימר */}
            <div className="flex items-center space-x-2 space-x-reverse bg-gray-50 px-3 py-2 rounded-lg">
              <Clock className="h-5 w-5 text-primary" />
              <span className="text-lg font-mono font-bold text-primary">
                {timer.formatTime()}
              </span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="pb-4">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
            <span>התקדמות המבחן</span>
            <span>{Math.round((answeredQuestions / totalQuestions) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-primary to-blue-600 h-2 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${(answeredQuestions / totalQuestions) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* מידע על השאלה הנוכחית */}
        <div className="pb-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              שאלה {currentQuestion + 1} מתוך {totalQuestions}
            </div>
            <div className="text-sm text-gray-600">
              {currentQuestion && currentQuestion.categoryTitle}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamHeader; 