import React, { useState } from 'react';
import { 
  Menu, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Check, 
  Circle,
  Clock,
  User
} from 'lucide-react';

const CleanLayout = ({
  userInfo,
  timer,
  allQuestions,
  currentQuestionIndex,
  currentQuestion,
  totalQuestions,
  answeredQuestions,
  answers,
  onAnswer,
  onNext,
  onPrev,
  onGoToQuestion,
  onCompleteExam,
  isQuestionAnswered
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(true); // ברירת מחדל פתוח

  // Group questions by category
  const categorizeQuestions = () => {
    const categories = {};
    
    allQuestions.forEach((question, index) => {
      const category = question.category;
      if (!categories[category]) {
        categories[category] = {
          title: question.categoryTitle,
          questions: [],
          completed: 0,
          total: 0
        };
      }
      categories[category].questions.push({ ...question, questionIndex: index });
      categories[category].total++;
      
      if (isQuestionAnswered(question.id)) {
        categories[category].completed++;
      }
    });
    
    return categories;
  };

  const categories = categorizeQuestions();
  const categoryKeys = Object.keys(categories);

  const getCategoryIcon = (categoryKey) => {
    const icons = {
      frontend: '⚛️',
      backend: '🔧', 
      sql: '🗄️',
      architecture: '🏗️',
      devtools: '🛠️'
    };
    return icons[categoryKey] || '📝';
  };

  const getCurrentCategory = () => {
    return currentQuestion?.category;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen">
        
        {/* Desktop Sidebar */}
        <div className={`
          bg-white border-r border-gray-200 transition-all duration-300 ease-in-out flex-shrink-0
          ${sidebarOpen ? 'w-1/4' : 'w-0'}
          hidden lg:block h-full overflow-hidden
        `}>
          <div className="w-full h-full flex flex-col">
            
            {/* Sidebar Header */}
            <div className="p-6 border-b border-gray-100 flex-shrink-0">
              <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold text-gray-900">
                  מבחן טכני
                </h1>
              </div>
              
              {/* User Info */}
              <div className="mt-4 flex items-center space-x-3 space-x-reverse">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {userInfo?.fullName}
                  </p>
                  <p className="text-xs text-gray-500">
                    {userInfo?.idNumber}
                  </p>
                </div>
              </div>
            </div>

            {/* Categories */}
            <div className="flex-1 overflow-y-auto p-4">
              <div className="space-y-4">
                {categoryKeys.map((categoryKey) => {
                  const category = categories[categoryKey];
                  const isActive = getCurrentCategory() === categoryKey;
                  const progress = Math.round((category.completed / category.total) * 100);
                  
                  return (
                    <div key={categoryKey}>
                      {/* Category Header */}
                      <div className={`
                        p-4 rounded-lg border transition-colors cursor-pointer
                        ${isActive ? 'bg-blue-50 border-blue-200' : 'bg-white border-gray-200 hover:bg-gray-50'}
                      `}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3 space-x-reverse">
                            <span className="text-xl">{getCategoryIcon(categoryKey)}</span>
                            <div>
                              <p className={`text-sm font-medium ${
                                isActive ? 'text-blue-900' : 'text-gray-900'
                              }`}>
                                {category.title.split('(')[0].trim()}
                              </p>
                              <p className="text-xs text-gray-500">
                                {category.completed}/{category.total} שאלות
                              </p>
                            </div>
                          </div>
                          <span className={`text-sm font-medium ${
                            isActive ? 'text-blue-600' : 'text-gray-600'
                          }`}>
                            {progress}%
                          </span>
                        </div>
                      </div>

                      {/* Questions in Category */}
                      {isActive && (
                        <div className="mt-2 ml-6 space-y-1">
                          {category.questions.map((question) => {
                            const isAnswered = isQuestionAnswered(question.id);
                            const isCurrent = question.questionIndex === currentQuestionIndex;
                            
                            return (
                              <button
                                key={question.id}
                                onClick={() => onGoToQuestion(question.questionIndex)}
                                className={`
                                  w-full text-right p-3 rounded-md transition-colors text-sm
                                  flex items-center justify-between
                                  ${isCurrent 
                                    ? 'bg-blue-100 text-blue-900 font-medium' 
                                    : isAnswered
                                    ? 'bg-green-50 text-green-800 hover:bg-green-100'
                                    : 'text-gray-600 hover:bg-gray-100'
                                  }
                                `}
                              >
                                <span>שאלה {question.questionIndex + 1}</span>
                                {isAnswered ? (
                                  <Check className="h-4 w-4 text-green-600" />
                                ) : (
                                  <Circle className="h-4 w-4 text-gray-400" />
                                )}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Sidebar Footer */}
            <div className="p-4 border-t border-gray-100 flex-shrink-0">
              <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                <span>זמן נותר</span>
                <span className="font-mono font-medium">{timer.formatTime()}</span>
              </div>
              <button
                onClick={onCompleteExam}
                className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition-colors text-sm font-medium"
              >
                סיים מבחן
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className={`${sidebarOpen ? 'w-3/4' : 'w-full'} flex flex-col min-w-0`}>
          
          {/* Top Header */}
          <header className="bg-white border-b border-gray-200 px-6 py-4 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 space-x-reverse">
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="lg:hidden p-2 rounded-md hover:bg-gray-100"
                >
                  <Menu className="h-5 w-5" />
                </button>
                
                {/* כפתור להצגה/הסתרה במחשב */}
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="hidden lg:block p-2 rounded-md hover:bg-gray-100 text-sm"
                >
                  {sidebarOpen ? 'הסתר תפריט' : 'הצג תפריט'}
                </button>
                
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    שאלה {currentQuestionIndex + 1} מתוך {totalQuestions}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {currentQuestion?.categoryTitle}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4 space-x-reverse">
                <div className="hidden sm:flex items-center space-x-2 space-x-reverse text-sm text-gray-600">
                  <Clock className="h-4 w-4" />
                  <span className="font-mono">{timer.formatTime()}</span>
                </div>
                
                <div className="text-sm text-gray-500">
                  {answeredQuestions}/{totalQuestions} נענו
                </div>
                
                <div className="text-xs text-gray-400">
                  {sidebarOpen ? 'תפריט פתוח' : 'תפריט סגור'}
                </div>
              </div>
            </div>
          </header>

          {/* Question Content */}
          <main className="flex-1 overflow-y-auto">
            <div className="max-w-4xl mx-auto p-6 lg:p-8">
              {currentQuestion && (
                <QuestionDisplay
                  question={currentQuestion}
                  onAnswer={onAnswer}
                  currentAnswer={answers[currentQuestion.id]}
                />
              )}
            </div>
          </main>

          {/* Bottom Navigation */}
          <div className="bg-white border-t border-gray-200 px-6 py-4 flex-shrink-0">
            <div className="flex items-center justify-between">
              <button
                onClick={onPrev}
                disabled={currentQuestionIndex === 0}
                className={`
                  flex items-center space-x-2 space-x-reverse px-4 py-2 rounded-lg transition-colors
                  ${currentQuestionIndex === 0
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-gray-700 hover:bg-gray-100'
                  }
                `}
              >
                <ChevronRight className="h-4 w-4" />
                <span>הקודמת</span>
              </button>
              
              <div className="text-sm font-medium text-gray-600">
                {currentQuestionIndex + 1} / {totalQuestions}
              </div>
              
              <button
                onClick={onNext}
                disabled={currentQuestionIndex === totalQuestions - 1}
                className={`
                  flex items-center space-x-2 space-x-reverse px-4 py-2 rounded-lg transition-colors
                  ${currentQuestionIndex === totalQuestions - 1
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                  }
                `}
              >
                <span>הבאה</span>
                <ChevronLeft className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Sidebar */}
        <div className={`
          bg-white border-r border-gray-200 transition-all duration-300 ease-in-out
          ${sidebarOpen ? 'w-80' : 'w-0'}
          fixed lg:hidden h-full z-50 overflow-hidden
        `}>
          <div className="w-80 h-full flex flex-col">
            
            {/* Mobile Sidebar Header */}
            <div className="p-6 border-b border-gray-100 flex-shrink-0">
              <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold text-gray-900">
                  מבחן טכני
                </h1>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-1 rounded-md hover:bg-gray-100"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              {/* User Info */}
              <div className="mt-4 flex items-center space-x-3 space-x-reverse">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {userInfo?.fullName}
                  </p>
                  <p className="text-xs text-gray-500">
                    {userInfo?.idNumber}
                  </p>
                </div>
              </div>
            </div>

            {/* Mobile Categories */}
            <div className="flex-1 overflow-y-auto p-4">
              <div className="space-y-4">
                {categoryKeys.map((categoryKey) => {
                  const category = categories[categoryKey];
                  const isActive = getCurrentCategory() === categoryKey;
                  const progress = Math.round((category.completed / category.total) * 100);
                  
                  return (
                    <div key={categoryKey}>
                      {/* Category Header */}
                      <div className={`
                        p-4 rounded-lg border transition-colors cursor-pointer
                        ${isActive ? 'bg-blue-50 border-blue-200' : 'bg-white border-gray-200 hover:bg-gray-50'}
                      `}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3 space-x-reverse">
                            <span className="text-xl">{getCategoryIcon(categoryKey)}</span>
                            <div>
                              <p className={`text-sm font-medium ${
                                isActive ? 'text-blue-900' : 'text-gray-900'
                              }`}>
                                {category.title.split('(')[0].trim()}
                              </p>
                              <p className="text-xs text-gray-500">
                                {category.completed}/{category.total} שאלות
                              </p>
                            </div>
                          </div>
                          <span className={`text-sm font-medium ${
                            isActive ? 'text-blue-600' : 'text-gray-600'
                          }`}>
                            {progress}%
                          </span>
                        </div>
                      </div>

                      {/* Questions in Category */}
                      {isActive && (
                        <div className="mt-2 ml-6 space-y-1">
                          {category.questions.map((question) => {
                            const isAnswered = isQuestionAnswered(question.id);
                            const isCurrent = question.questionIndex === currentQuestionIndex;
                            
                            return (
                              <button
                                key={question.id}
                                onClick={() => {
                                  onGoToQuestion(question.questionIndex);
                                  setSidebarOpen(false); // סגירת התפריט במובייל
                                }}
                                className={`
                                  w-full text-right p-3 rounded-md transition-colors text-sm
                                  flex items-center justify-between
                                  ${ isCurrent 
                                    ? 'bg-blue-100 text-blue-900 font-medium' 
                                    : isAnswered
                                    ? 'bg-green-50 text-green-800 hover:bg-green-100'
                                    : 'text-gray-600 hover:bg-gray-100'
                                  }
                                `}
                              >
                                <span>שאלה {question.questionIndex + 1}</span>
                                {isAnswered ? (
                                  <Check className="h-4 w-4 text-green-600" />
                                ) : (
                                  <Circle className="h-4 w-4 text-gray-400" />
                                )}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Mobile Sidebar Footer */}
            <div className="p-4 border-t border-gray-100 flex-shrink-0">
              <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                <span>זמן נותר</span>
                <span className="font-mono font-medium">{timer.formatTime()}</span>
              </div>
              <button
                onClick={onCompleteExam}
                className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition-colors text-sm font-medium"
              >
                סיים מבחן
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

// Question Display Component
const QuestionDisplay = ({ question, onAnswer, currentAnswer }) => {
  const [textAnswer, setTextAnswer] = React.useState(currentAnswer || '');

  React.useEffect(() => {
    setTextAnswer(currentAnswer || '');
  }, [currentAnswer]);

  const handleMultipleChoice = (optionIndex) => {
    onAnswer(question.id, optionIndex);
  };

  const handleTextAnswer = (value) => {
    setTextAnswer(value);
    onAnswer(question.id, value);
  };

  return (
    <div className="space-y-8">
      {/* Question Header */}
      <div>
        <div className="flex items-center space-x-3 space-x-reverse mb-6">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            {question.categoryTitle}
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {question.type === 'multiple' ? 'בחירה מרובה' : 'שאלה פתוחה'}
          </span>
        </div>
        
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 leading-relaxed">
          {question.question}
        </h1>
      </div>

      {/* Question Content */}
      <div>
        {question.type === 'multiple' ? (
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleMultipleChoice(index)}
                className={`
                  w-full text-right p-4 rounded-xl border-2 transition-all duration-200
                  ${currentAnswer === index
                    ? 'border-blue-500 bg-blue-50 text-blue-900'
                    : 'border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50'
                  }
                `}
              >
                <div className="flex items-center space-x-4 space-x-reverse">
                  <div className={`
                    w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center
                    ${currentAnswer === index
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-gray-300'
                    }
                  `}>
                    {currentAnswer === index && (
                      <Check className="h-3 w-3 text-white" />
                    )}
                  </div>
                  <span className="text-lg">{option}</span>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div>
            <label className="block text-lg font-medium text-gray-900 mb-4">
              תשובתך:
            </label>
            <textarea
              value={textAnswer}
              onChange={(e) => handleTextAnswer(e.target.value)}
              placeholder="כתוב את תשובתך כאן..."
              className="w-full h-48 p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none text-lg"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CleanLayout;