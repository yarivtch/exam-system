import React, { useState } from 'react';
import { FileText, Map, BarChart3, Flag } from 'lucide-react';

const TabNavigation = ({ 
  currentQuestionIndex, 
  totalQuestions, 
  onNext, 
  onPrev, 
  onGoToQuestion, 
  onCompleteExam,
  answeredQuestions,
  isQuestionAnswered,
  timer,
  currentQuestion,
  onAnswer,
  currentAnswer
}) => {
  const [activeTab, setActiveTab] = useState('question');

  const tabs = [
    { id: 'question', label: 'שאלה', icon: FileText },
    { id: 'navigation', label: 'ניווט', icon: Map },
    { id: 'progress', label: 'התקדמות', icon: BarChart3 },
    { id: 'finish', label: 'סיום', icon: Flag }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'question':
        return <QuestionTab 
          question={currentQuestion}
          onAnswer={onAnswer}
          currentAnswer={currentAnswer}
          currentQuestionIndex={currentQuestionIndex}
          totalQuestions={totalQuestions}
          onNext={onNext}
          onPrev={onPrev}
        />;
      case 'navigation':
        return <NavigationTab 
          currentQuestionIndex={currentQuestionIndex}
          totalQuestions={totalQuestions}
          onGoToQuestion={onGoToQuestion}
          isQuestionAnswered={isQuestionAnswered}
        />;
      case 'progress':
        return <ProgressTab 
          answeredQuestions={answeredQuestions}
          totalQuestions={totalQuestions}
          timer={timer}
        />;
      case 'finish':
        return <FinishTab 
          onCompleteExam={onCompleteExam}
          answeredQuestions={answeredQuestions}
          totalQuestions={totalQuestions}
        />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white/95 backdrop-blur-sm shadow-lg border-t border-gray-200">
      <div className="max-w-5xl mx-auto">
        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center space-x-2 space-x-reverse py-4 px-2 text-sm font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'border-b-2 border-primary text-primary bg-primary/5'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="p-4 sm:p-6">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

// Question Tab Component
const QuestionTab = ({ question, onAnswer, currentAnswer, currentQuestionIndex, totalQuestions, onNext, onPrev }) => {
  if (!question) return null;

  return (
    <div className="space-y-4">
      {/* Question info */}
      <div className="flex items-center justify-between text-sm text-gray-600">
        <span>שאלה {currentQuestionIndex + 1} מתוך {totalQuestions}</span>
        <span className="bg-primary/10 text-primary px-3 py-1 rounded-full">
          {question.categoryTitle}
        </span>
      </div>

      {/* Navigation buttons */}
      <div className="flex items-center justify-between">
        <button
          onClick={onPrev}
          disabled={currentQuestionIndex === 0}
          className="btn-outline px-4 py-2 text-sm disabled:opacity-50"
        >
          ← הקודמת
        </button>
        <button
          onClick={onNext}
          disabled={currentQuestionIndex === totalQuestions - 1}
          className="btn-outline px-4 py-2 text-sm disabled:opacity-50"
        >
          הבאה →
        </button>
      </div>
    </div>
  );
};

// Navigation Tab Component  
const NavigationTab = ({ currentQuestionIndex, totalQuestions, onGoToQuestion, isQuestionAnswered }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-gray-900">מפת שאלות</h3>
      <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-2">
        {Array.from({ length: totalQuestions }, (_, index) => {
          const isAnswered = isQuestionAnswered(index);
          const isCurrent = index === currentQuestionIndex;
          
          return (
            <button
              key={index}
              onClick={() => onGoToQuestion(index)}
              className={`w-10 h-10 rounded-lg text-sm font-bold transition-all duration-200 ${
                isCurrent 
                  ? 'bg-primary text-white scale-110' 
                  : isAnswered
                  ? 'bg-success/20 text-success border border-success/40'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {index + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
};

// Progress Tab Component
const ProgressTab = ({ answeredQuestions, totalQuestions, timer }) => {
  const progressPercentage = Math.round((answeredQuestions / totalQuestions) * 100);
  
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-bold text-gray-900">התקדמות המבחן</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-primary/10 to-blue-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-primary">{answeredQuestions}</div>
          <div className="text-sm text-gray-600">שאלות נענו</div>
        </div>
        
        <div className="bg-gradient-to-br from-success/10 to-green-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-success">{progressPercentage}%</div>
          <div className="text-sm text-gray-600">התקדמות</div>
        </div>
        
        <div className="bg-gradient-to-br from-warning/10 to-yellow-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-warning">{timer.formatTime()}</div>
          <div className="text-sm text-gray-600">זמן נותר</div>
        </div>
      </div>

      {/* Progress bar */}
      <div>
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>התקדמות כללית</span>
          <span>{progressPercentage}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-primary to-secondary h-3 rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>
    </div>
  );
};

// Finish Tab Component
const FinishTab = ({ onCompleteExam, answeredQuestions, totalQuestions }) => {
  const unansweredCount = totalQuestions - answeredQuestions;
  
  return (
    <div className="space-y-6 text-center">
      <h3 className="text-lg font-bold text-gray-900">סיום המבחן</h3>
      
      <div className="bg-gray-50 rounded-lg p-6">
        <div className="space-y-4">
          <div className="text-lg">
            <span className="font-bold text-primary">{answeredQuestions}</span> מתוך {' '}
            <span className="font-bold">{totalQuestions}</span> שאלות נענו
          </div>
          
          {unansweredCount > 0 && (
            <div className="bg-warning/10 text-warning p-3 rounded-lg">
              עדיין נותרו {unansweredCount} שאלות ללא תשובה
            </div>
          )}
          
          <button
            onClick={onCompleteExam}
            className="btn-error px-8 py-3 text-lg font-semibold w-full sm:w-auto"
          >
            סיים מבחן
          </button>
        </div>
      </div>
      
      <div className="text-sm text-gray-500">
        לאחר סיום המבחן לא תוכל לחזור ולערוך תשובות
      </div>
    </div>
  );
};

export default TabNavigation;