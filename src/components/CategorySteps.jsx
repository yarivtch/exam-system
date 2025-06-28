import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, Check, Circle, Clock } from 'lucide-react';

const CategorySteps = ({ 
  allQuestions,
  currentQuestionIndex, 
  onGoToQuestion,
  answers,
  isQuestionAnswered
}) => {
  const [activeCategory, setActiveCategory] = useState(null);

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

  // Find current active category based on current question
  useEffect(() => {
    if (allQuestions[currentQuestionIndex]) {
      setActiveCategory(allQuestions[currentQuestionIndex].category);
    }
  }, [currentQuestionIndex, allQuestions]);

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

  const getCategoryProgress = (category) => {
    return Math.round((category.completed / category.total) * 100);
  };

  const getCategoryStatus = (categoryKey, category) => {
    if (categoryKey === activeCategory) return 'active';
    if (category.completed === category.total) return 'completed';
    if (category.completed > 0) return 'in-progress';
    return 'pending';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-success text-white border-success';
      case 'active': return 'bg-primary text-white border-primary';
      case 'in-progress': return 'bg-warning/20 text-warning border-warning';
      default: return 'bg-gray-100 text-gray-400 border-gray-200';
    }
  };

  const handleCategoryClick = (categoryKey, category) => {
    // Go to first question of this category
    const firstQuestion = category.questions[0];
    if (firstQuestion) {
      onGoToQuestion(firstQuestion.questionIndex);
      setActiveCategory(categoryKey);
    }
  };

  return (
    <div className="bg-white/95 backdrop-blur-sm shadow-lg border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
        
        {/* Category Steps Header */}
        <div className="mb-4">
          <h3 className="text-base font-bold text-gray-900 mb-3 text-center">
            נושאי המבחן
          </h3>
          
          {/* Desktop Stepper */}
          <div className="hidden md:flex items-center justify-between">
            {categoryKeys.map((categoryKey, index) => {
              const category = categories[categoryKey];
              const status = getCategoryStatus(categoryKey, category);
              const progress = getCategoryProgress(category);
              
              return (
                <React.Fragment key={categoryKey}>
                  {/* Step */}
                  <div 
                    className="flex flex-col items-center cursor-pointer group"
                    onClick={() => handleCategoryClick(categoryKey, category)}
                  >
                    {/* Step Circle */}
                    <div className={`
                      w-10 h-10 rounded-full border-2 flex items-center justify-center
                      transition-all duration-200 group-hover:scale-105
                      ${getStatusColor(status)}
                    `}>
                      {status === 'completed' ? (
                        <Check className="h-5 w-5" />
                      ) : (
                        <span className="text-base">{getCategoryIcon(categoryKey)}</span>
                      )}
                    </div>
                    
                    {/* Step Label */}
                    <div className="mt-2 text-center">
                      <div className="text-xs font-semibold text-gray-900">
                        {category.title.split('(')[0].trim()}
                      </div>
                      <div className="text-xs text-gray-500">
                        {progress}%
                      </div>
                    </div>
                  </div>
                  
                  {/* Connector Line */}
                  {index < categoryKeys.length - 1 && (
                    <div className={`
                      flex-1 h-0.5 mx-2 transition-colors duration-200
                      ${getCategoryProgress(category) === 100 ? 'bg-success' : 'bg-gray-200'}
                    `} />
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* Mobile Tabs */}
          <div className="md:hidden overflow-x-auto">
            <div className="flex space-x-2 min-w-max px-2">
              {categoryKeys.map((categoryKey) => {
                const category = categories[categoryKey];
                const status = getCategoryStatus(categoryKey, category);
                const progress = getCategoryProgress(category);
                
                return (
                  <button
                    key={categoryKey}
                    onClick={() => handleCategoryClick(categoryKey, category)}
                    className={`
                      flex items-center space-x-2 space-x-reverse px-3 py-2 rounded-lg
                      transition-all duration-200 whitespace-nowrap text-xs
                      ${status === 'active' 
                        ? 'bg-primary text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }
                    `}
                  >
                    <span className="text-sm">{getCategoryIcon(categoryKey)}</span>
                    <div className="text-left">
                      <div className="text-xs font-medium">
                        {category.title.split(' ')[0]}
                      </div>
                      <div className="text-xs opacity-75">
                        {progress}%
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Active Category Details - Compact */}
        {activeCategory && (
          <div className="bg-gradient-to-r from-primary/10 to-blue-50 rounded-lg p-3 border border-primary/20 mt-3">
            <div className="flex items-center justify-between">
              
              {/* Category Info */}
              <div className="flex items-center space-x-2 space-x-reverse">
                <span className="text-lg">{getCategoryIcon(activeCategory)}</span>
                <div>
                  <h4 className="text-sm font-bold text-gray-900">
                    {categories[activeCategory].title}
                  </h4>
                  <p className="text-xs text-gray-600">
                    {categories[activeCategory].completed}/{categories[activeCategory].total} שאלות
                  </p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-32">
                <div className="flex justify-between text-xs text-gray-600 mb-1">
                  <span>התקדמות</span>
                  <span>{getCategoryProgress(categories[activeCategory])}%</span>
                </div>
                <div className="w-full bg-white rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-500"
                    style={{ width: `${getCategoryProgress(categories[activeCategory])}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default CategorySteps;