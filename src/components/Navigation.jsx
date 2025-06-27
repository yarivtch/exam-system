import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, CheckCircle, Circle, Flag, AlertTriangle, Map, Clock } from 'lucide-react';

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
        className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold transition-all duration-300 card-hover shadow-md border-2 mx-1 my-1
          ${isCurrent ? 'bg-primary text-white border-primary scale-110 shadow-xl' :
            isAnswered ? 'bg-blue-50 text-primary border-primary/60' :
            'bg-white text-gray-700 border-blue-100 hover:bg-blue-50'}
        `}
        style={{ minWidth: 48 }}
      >
        {(isCurrent || !isAnswered) ? (
          <span>{index + 1}</span>
        ) : (
          <CheckCircle className="h-6 w-6 text-primary" />
        )}
      </button>
    );
  };

  return (
    <div className="bg-white shadow-2xl border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* אינדיקטורים לשאלות */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900 flex items-center">
              <Map className="h-5 w-5 mr-2 text-primary" />
              מפת שאלות
            </h3>
            <div className="flex items-center space-x-4 space-x-reverse text-sm text-gray-600">
              <div className="flex items-center space-x-2 space-x-reverse bg-success/10 px-3 py-1 rounded-full">
                <CheckCircle className="h-4 w-4 text-success" />
                <span className="font-medium">נענה</span>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse bg-gray-100 px-3 py-1 rounded-full">
                <Circle className="h-4 w-4 text-gray-400" />
                <span className="font-medium">לא נענה</span>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-blue-50 rounded-xl py-2" style={{ background: 'linear-gradient(90deg, #e0f2fe 0%, #f7fafc 100%)' }}>
            <div className="flex flex-nowrap gap-2 justify-center min-w-fit">
              {Array.from({ length: totalQuestions }, (_, index) => 
                renderQuestionIndicator(index)
              )}
            </div>
          </div>
        </div>

        {/* כפתורי ניווט */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 space-x-reverse">
            <button
              onClick={onPrev}
              disabled={currentQuestionIndex === 0}
              className="btn-outline flex items-center space-x-2 space-x-reverse px-6 py-3 text-base font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="h-5 w-5" />
              <span>הקודמת</span>
            </button>
            
            <button
              onClick={onNext}
              disabled={currentQuestionIndex === totalQuestions - 1}
              className="btn-outline flex items-center space-x-2 space-x-reverse px-6 py-3 text-base font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>הבאה</span>
              <ChevronLeft className="h-5 w-5" />
            </button>
          </div>

          <div className="flex items-center space-x-6 space-x-reverse">
            {/* סטטיסטיקות */}
            <div className="bg-gradient-to-r from-blue-50 to-accent/10 rounded-xl p-4 border border-blue-200">
              <div className="flex items-center space-x-2 space-x-reverse">
                <Clock className="h-5 w-5 text-primary" />
                <div className="text-sm">
                  <span className="font-bold text-primary">{answeredQuestions}</span> מתוך <span className="font-bold text-gray-900">{totalQuestions}</span> שאלות נענו
                </div>
              </div>
            </div>

            {/* כפתור סיום מבחן */}
            <button
              onClick={handleCompleteExam}
              className="btn-error flex items-center space-x-2 space-x-reverse px-8 py-3 text-base font-semibold"
            >
              <Flag className="h-5 w-5" />
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