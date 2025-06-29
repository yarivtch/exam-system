import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Flag, AlertTriangle, Clock } from 'lucide-react';

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


  return (
    <div className="bg-white/95 backdrop-blur-sm shadow-lg border-t border-gray-200">
      <div className="max-w-5xl mx-auto px-6 py-4">
        {/* כפתורי ניווט בסיסיים */}
        <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
          <div className="flex items-center justify-center space-x-4 space-x-reverse">
            <button
              onClick={onPrev}
              disabled={currentQuestionIndex === 0}
              className="btn-outline flex items-center space-x-2 space-x-reverse px-4 py-2 text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="h-4 w-4" />
              <span>הקודמת</span>
            </button>
            
            <button
              onClick={onNext}
              disabled={currentQuestionIndex === totalQuestions - 1}
              className="btn-outline flex items-center space-x-2 space-x-reverse px-4 py-2 text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>הבאה</span>
              <ChevronLeft className="h-4 w-4" />
            </button>
          </div>

          <div className="flex flex-col space-y-3 lg:flex-row lg:items-center lg:space-y-0 lg:space-x-6 lg:space-x-reverse">
            {/* סטטיסטיקות */}
            <div className="bg-gradient-to-r from-blue-50 to-accent/10 rounded-lg p-3 border border-blue-200 shadow-sm">
              <div className="flex items-center justify-center space-x-2 space-x-reverse">
                <Clock className="h-4 w-4 text-primary" />
                <div className="text-xs text-center">
                  <span className="font-bold text-primary">{answeredQuestions}</span> מתוך <span className="font-bold text-gray-900">{totalQuestions}</span> שאלות נענו
                </div>
              </div>
            </div>

            {/* כפתור סיום מבחן */}
            <button
              onClick={handleCompleteExam}
              className="btn-error flex items-center justify-center space-x-2 space-x-reverse px-6 py-2 text-sm font-semibold w-full lg:w-auto"
            >
              <Flag className="h-4 w-4" />
              <span>סיים מבחן</span>
            </button>
          </div>
        </div>
      </div>

      {/* דיאלוג אישור סיום */}
      {showConfirmComplete && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 border border-gray-100">
            <div className="flex items-center space-x-3 space-x-reverse mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-warning to-yellow-600 rounded-xl flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">אישור סיום מבחן</h3>
            </div>
            
            <p className="text-base text-gray-600 mb-6 leading-relaxed">
              האם אתה בטוח שברצונך לסיים את המבחן? 
              {answeredQuestions < totalQuestions && (
                <span className="block mt-3 text-warning font-semibold bg-warning/10 px-3 py-2 rounded-lg">
                  ⚠️ עדיין לא ענית על {totalQuestions - answeredQuestions} שאלות.
                </span>
              )}
            </p>
            
            <div className="flex items-center justify-end space-x-4 space-x-reverse">
              <button
                onClick={cancelComplete}
                className="btn-ghost px-6 py-3 text-base font-semibold"
              >
                ביטול
              </button>
              <button
                onClick={confirmComplete}
                className="btn-error px-6 py-3 text-base font-semibold"
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