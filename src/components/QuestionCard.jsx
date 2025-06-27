import React, { useState } from 'react';
import { CheckCircle, Circle, AlertCircle } from 'lucide-react';

const QuestionCard = ({ question, onAnswer, currentAnswer }) => {
  const [textAnswer, setTextAnswer] = useState(currentAnswer || '');

  const handleMultipleChoice = (optionIndex) => {
    onAnswer(question.id, optionIndex);
  };

  const handleTextAnswer = (value) => {
    setTextAnswer(value);
    onAnswer(question.id, value);
  };

  const renderMultipleChoice = () => (
    <div className="space-y-4">
      {question.options.map((option, index) => (
        <button
          key={index}
          onClick={() => handleMultipleChoice(index)}
          className={`w-full text-right p-3 sm:p-4 rounded-lg border-2 transition-all duration-300 hover:shadow-lg card-hover ${
            currentAnswer === index
              ? 'border-primary bg-gradient-to-r from-primary/10 to-accent/10 text-primary shadow-lg'
              : 'border-gray-200 hover:border-primary/50 bg-white hover:bg-gray-50'
          }`}
        >
          <div className="flex items-center space-x-2 sm:space-x-3 space-x-reverse">
            {currentAnswer === index ? (
              <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
            ) : (
              <Circle className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 flex-shrink-0" />
            )}
            <span className="text-xs sm:text-sm font-medium">{option}</span>
          </div>
        </button>
      ))}
    </div>
  );

  const renderTextInput = () => (
    <div className="space-y-3 sm:space-y-4">
      <div>
        <label htmlFor="textAnswer" className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
          התשובה שלך:
        </label>
        <textarea
          id="textAnswer"
          value={textAnswer}
          onChange={(e) => handleTextAnswer(e.target.value)}
          placeholder=""
          className="w-full h-28 sm:h-32 p-2 sm:p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary resize-none transition-all duration-300 text-sm"
        />
      </div>
    </div>
  );

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy':
        return 'text-success';
      case 'medium':
        return 'text-warning';
      case 'hard':
        return 'text-error';
      default:
        return 'text-gray-600';
    }
  };

  const getDifficultyText = (difficulty) => {
    switch (difficulty) {
      case 'easy':
        return 'קל';
      case 'medium':
        return 'בינוני';
      case 'hard':
        return 'קשה';
      default:
        return difficulty;
    }
  };

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-4 sm:p-6 w-full max-w-3xl border border-gray-100">
      {/* כותרת השאלה */}
      <div className="mb-4 sm:mb-6">
        <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 mb-3 sm:mb-4">
          <div className="flex items-center space-x-2 space-x-reverse justify-center sm:justify-start">
            <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
              {question.categoryTitle}
            </span>
            <span className="text-gray-300">|</span>
            <span className={`text-xs font-semibold ${getDifficultyColor(question.difficulty)} bg-${question.difficulty === 'easy' ? 'success' : question.difficulty === 'medium' ? 'warning' : 'error'}/10 px-2 py-1 rounded-full`}>
              {getDifficultyText(question.difficulty)}
            </span>
          </div>
          <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full text-center">
            {question.type === 'multiple' ? 'בחירה מרובה' : 'שאלה פתוחה'}
          </div>
        </div>
        <h2 className="text-base sm:text-lg font-bold text-gray-900 leading-relaxed text-center sm:text-right">
          {question.question}
        </h2>
      </div>

      {/* תוכן השאלה */}
      <div className="mb-4 sm:mb-6">
        {question.type === 'multiple' ? renderMultipleChoice() : renderTextInput()}
      </div>

      {/* הודעות עזרה */}
      {question.type === 'text' && (
        <div className="bg-gradient-to-r from-blue-50 to-accent/10 border border-blue-200 rounded-lg p-3 sm:p-4 shadow-sm">
          <div className="flex items-start space-x-2 space-x-reverse">
            <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-primary mt-1 flex-shrink-0" />
            <div className="text-xs sm:text-sm text-primary-dark">
              <p className="font-semibold mb-2">טיפ קטן:</p>
              <ul className="list-disc list-inside space-y-1 text-xs leading-relaxed">
                <li>תשובה ברורה, קצרה וממוקדת תמיד מנצחת</li>
                <li>אם צריך – אפשר להוסיף דוגמת קוד משלך</li>
                <li>אל תשכח/י להסביר את הלוגיקה שלך</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionCard; 