import React from 'react';
import { Clock, User, BookOpen, Target, Award } from 'lucide-react';

const ExamHeader = ({ userInfo, timer, currentQuestionIndex, currentQuestion, totalQuestions, answeredQuestions }) => {
  const progressPercentage = Math.round((answeredQuestions / totalQuestions) * 100);
  
  return (
    <div className="bg-white/95 backdrop-blur-sm shadow-2xl border-b border-gray-200">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between py-4 space-y-4 xl:space-y-0">
          {/* מידע על המשתמש */}
          <div className="flex items-center justify-center xl:justify-start">
            <div className="flex items-center space-x-3 space-x-reverse bg-gradient-to-r from-blue-50 to-accent/10 rounded-lg p-3 border border-blue-200 shadow-sm">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
              <div>
                <span className="text-sm font-bold text-gray-900 block">
                  {userInfo?.fullName}
                </span>
                <span className="text-xs text-gray-600">
                  ת.ז: {userInfo?.idNumber}
                </span>
              </div>
            </div>
          </div>

          {/* כותרת המבחן */}
          <div className="text-center flex-1">
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-4 border border-primary/20 shadow-sm">
              <h1 className="text-lg font-bold text-gray-900 flex items-center justify-center">
                <Award className="h-5 w-5 mr-2 text-primary" />
                מבחן טכני - קבוצת דיגיטל
              </h1>
            </div>
          </div>

          {/* טיימר וסטטיסטיקות */}
          <div className="flex items-center justify-center xl:justify-end space-x-4 space-x-reverse">
            {/* שאלות שנענו */}
            <div className="bg-gradient-to-r from-success/10 to-green-50 rounded-lg p-3 border border-success/20 shadow-sm">
              <div className="flex items-center space-x-2 space-x-reverse">
                <div className="w-8 h-8 bg-gradient-to-br from-success to-green-600 rounded-lg flex items-center justify-center">
                  <BookOpen className="h-4 w-4 text-white" />
                </div>
                <div className="text-center">
                  <div className="text-sm font-bold text-gray-900">
                    {answeredQuestions} / {totalQuestions}
                  </div>
                  <div className="text-xs text-gray-600 font-medium">שאלות נענו</div>
                </div>
              </div>
            </div>

            {/* טיימר */}
            <div className="bg-gradient-to-r from-warning/10 to-yellow-50 rounded-lg p-3 border border-warning/20 shadow-sm">
              <div className="flex items-center space-x-2 space-x-reverse">
                <div className="w-8 h-8 bg-gradient-to-br from-warning to-yellow-600 rounded-lg flex items-center justify-center">
                  <Clock className="h-4 w-4 text-white" />
                </div>
                <div className="text-center">
                  <div className="text-sm font-mono font-bold text-gray-900">
                    {timer.formatTime()}
                  </div>
                  <div className="text-xs text-gray-600 font-medium">זמן נותר</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="pb-4">
          <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
            <span className="font-semibold flex items-center">
              <Target className="h-3 w-3 mr-1 text-primary" />
              התקדמות המבחן
            </span>
            <span className="font-bold text-primary">{progressPercentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-primary via-accent to-secondary h-2 rounded-full transition-all duration-500 ease-out shadow-lg"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* מידע על השאלה הנוכחית */}
        <div className="pb-4">
          <div className="flex items-center justify-between bg-gradient-to-r from-gray-50 to-blue-50/50 rounded-lg p-3 border border-gray-200 shadow-sm">
            <div className="text-sm font-semibold text-gray-900">
              שאלה {(typeof currentQuestionIndex === 'number' && !isNaN(currentQuestionIndex) ? currentQuestionIndex + 1 : 1)} מתוך {totalQuestions}
            </div>
            <div className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full shadow-sm">
              {currentQuestion?.categoryTitle || 'לא זמין'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamHeader; 