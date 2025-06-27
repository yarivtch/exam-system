import React from 'react';
import { Clock, User, BookOpen, Target, Award } from 'lucide-react';

const ExamHeader = ({ userInfo, timer, currentQuestion, totalQuestions, answeredQuestions }) => {
  const progressPercentage = Math.round((answeredQuestions / totalQuestions) * 100);
  
  return (
    <div className="bg-white shadow-2xl border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between py-6 space-y-6 lg:space-y-0">
          {/* מידע על המשתמש */}
          <div className="flex items-center space-x-6 space-x-reverse">
            <div className="flex items-center space-x-3 space-x-reverse bg-gradient-to-r from-blue-50 to-accent/10 rounded-xl p-4 border border-blue-200">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <User className="h-5 w-5 text-white" />
              </div>
              <div>
                <span className="text-base font-bold text-gray-900 block">
                  {userInfo?.fullName}
                </span>
                <span className="text-sm text-gray-600">
                  ת.ז: {userInfo?.idNumber}
                </span>
              </div>
            </div>
          </div>

          {/* כותרת המבחן */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-6 border border-primary/20">
              <h1 className="text-2xl font-bold text-gray-900 mb-2 flex items-center justify-center">
                <Award className="h-6 w-6 mr-2 text-primary" />
                מערכת מבחן טכני מקצועית
              </h1>
              <p className="text-base text-gray-600 font-medium">
                Full Stack Senior Developer
              </p>
            </div>
          </div>

          {/* טיימר וסטטיסטיקות */}
          <div className="flex items-center space-x-6 space-x-reverse">
            {/* שאלות שנענו */}
            <div className="bg-gradient-to-r from-success/10 to-green-50 rounded-xl p-4 border border-success/20">
              <div className="flex items-center space-x-3 space-x-reverse">
                <div className="w-10 h-10 bg-gradient-to-br from-success to-green-600 rounded-lg flex items-center justify-center">
                  <BookOpen className="h-5 w-5 text-white" />
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-900">
                    {answeredQuestions} / {totalQuestions}
                  </div>
                  <div className="text-sm text-gray-600 font-medium">שאלות נענו</div>
                </div>
              </div>
            </div>

            {/* טיימר */}
            <div className="bg-gradient-to-r from-warning/10 to-yellow-50 rounded-xl p-4 border border-warning/20">
              <div className="flex items-center space-x-3 space-x-reverse">
                <div className="w-10 h-10 bg-gradient-to-br from-warning to-yellow-600 rounded-lg flex items-center justify-center">
                  <Clock className="h-5 w-5 text-white" />
                </div>
                <div className="text-center">
                  <div className="text-lg font-mono font-bold text-gray-900">
                    {timer.formatTime()}
                  </div>
                  <div className="text-sm text-gray-600 font-medium">זמן נותר</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="pb-6">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
            <span className="font-semibold flex items-center">
              <Target className="h-4 w-4 mr-2 text-primary" />
              התקדמות המבחן
            </span>
            <span className="font-bold text-primary">{progressPercentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-primary via-accent to-secondary h-3 rounded-full transition-all duration-500 ease-out shadow-lg"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* מידע על השאלה הנוכחית */}
        <div className="pb-6">
          <div className="flex items-center justify-between bg-gray-50 rounded-xl p-4 border border-gray-200">
            <div className="text-base font-semibold text-gray-900">
              שאלה {currentQuestion + 1} מתוך {totalQuestions}
            </div>
            <div className="text-base font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
              {currentQuestion && currentQuestion.categoryTitle}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamHeader; 