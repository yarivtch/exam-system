import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, CheckCircle, Circle, Flag, AlertTriangle } from 'lucide-react';

const Navigation = ({ 
  currentQuestionIndex, 
  totalQuestions, 
  onNext, 
  onPrev, 
  onGoToQuestion, 
  onCompleteExam,
  answeredQuestions,
  isQuestionAnswered
}) => {
  const [showConfirmComplete, setShowConfirmComplete] = useState(false);

  const handleCompleteExam = () => {
    setShowConfirmComplete(true);
  };

  const confirmComplete = () => {
    onCompleteExam();
    setShowConfirmComplete(false);
  };

  const cancelComplete = () => {
    setShowConfirmComplete(false);
  };

  const renderQuestionIndicator = (index) => {
    const isAnswered = isQuestionAnswered(index);
    const isCurrent = index === currentQuestionIndex;
    
    return (
      <button
        key={index}
        onClick={() => onGoToQuestion(index)}
        className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200 ${
          isCurrent
            ? 'bg-primary text-white shadow-lg'
            : isAnswered
            ? 'bg-success text-white'
            : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
        }`}
      >
        {isAnswered ? (
          <CheckCircle className="h-5 w-5" />
        ) : (
          <span>{index + 1}</span>
        )}
      </button>
    );
  };

  return (
    <div className="bg-white shadow-lg border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* אינדיקטורים לשאלות */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-gray-700">מפת שאלות</h3>
            <div className="flex items-center space-x-2 space-x-reverse text-xs text-gray-500">
              <div className="flex items-center space-x-1 space-x-reverse">
                <CheckCircle className="h-3 w-3 text-success" />
                <span>נענה</span>
              </div>
              <div className="flex items-center space-x-1 space-x-reverse">
                <Circle className="h-3 w-3 text-gray-400" />
                <span>לא נענה</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 justify-center">
            {Array.from({ length: totalQuestions }, (_, index) => 
              renderQuestionIndicator(index)
            )}
          </div>
        </div>

        {/* כפתורי ניווט */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 space-x-reverse">
            <button
              onClick={onPrev}
              disabled={currentQuestionIndex === 0}
              className="flex items-center space-x-2 space-x-reverse px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="h-4 w-4" />
              <span>הקודמת</span>
            </button>
            
            <button
              onClick={onNext}
              disabled={currentQuestionIndex === totalQuestions - 1}
              className="flex items-center space-x-2 space-x-reverse px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <span>הבאה</span>
              <ChevronLeft className="h-4 w-4" />
            </button>
          </div>

          <div className="flex items-center space-x-3 space-x-reverse">
            {/* סטטיסטיקות */}
            <div className="text-sm text-gray-600">
              <span className="font-medium">{answeredQuestions}</span> מתוך <span className="font-medium">{totalQuestions}</span> שאלות נענו
            </div>

            {/* כפתור סיום מבחן */}
            <button
              onClick={handleCompleteExam}
              className="flex items-center space-x-2 space-x-reverse px-6 py-2 bg-error text-white rounded-md text-sm font-medium hover:bg-error/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-error transition-colors shadow-lg hover:shadow-xl"
            >
              <Flag className="h-4 w-4" />
              <span>סיים מבחן</span>
            </button>
          </div>
        </div>
      </div>

      {/* דיאלוג אישור סיום */}
      {showConfirmComplete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex items-center space-x-3 space-x-reverse mb-4">
              <AlertTriangle className="h-6 w-6 text-warning" />
              <h3 className="text-lg font-medium text-gray-900">אישור סיום מבחן</h3>
            </div>
            
            <p className="text-sm text-gray-600 mb-6">
              האם אתה בטוח שברצונך לסיים את המבחן? 
              {answeredQuestions < totalQuestions && (
                <span className="block mt-2 text-warning font-medium">
                  עדיין לא ענית על {totalQuestions - answeredQuestions} שאלות.
                </span>
              )}
            </p>
            
            <div className="flex items-center justify-end space-x-3 space-x-reverse">
              <button
                onClick={cancelComplete}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
              >
                ביטול
              </button>
              <button
                onClick={confirmComplete}
                className="px-4 py-2 bg-error text-white rounded-md text-sm font-medium hover:bg-error/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-error transition-colors"
              >
                סיים מבחן
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navigation; 