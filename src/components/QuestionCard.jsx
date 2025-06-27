import React, { useState } from 'react';
import { CheckCircle, Circle, Code, AlertCircle } from 'lucide-react';

const QuestionCard = ({ question, onAnswer, currentAnswer }) => {
  const [textAnswer, setTextAnswer] = useState(currentAnswer || '');

  const handleMultipleChoice = (optionIndex) => {
    onAnswer(question.id, optionIndex);
  };

  const handleTextAnswer = (value) => {
    setTextAnswer(value);
    onAnswer(question.id, value);
  };

  const renderCodeBlock = (code) => {
    return (
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100 p-6 rounded-xl font-mono text-sm overflow-x-auto my-4 shadow-xl border border-gray-700">
        <pre className="whitespace-pre-wrap">{code}</pre>
      </div>
    );
  };

  const renderMultipleChoice = () => (
    <div className="space-y-4">
      {question.options.map((option, index) => (
        <button
          key={index}
          onClick={() => handleMultipleChoice(index)}
          className={`w-full text-right p-6 rounded-xl border-2 transition-all duration-300 hover:shadow-lg card-hover ${
            currentAnswer === index
              ? 'border-primary bg-gradient-to-r from-primary/10 to-accent/10 text-primary shadow-lg'
              : 'border-gray-200 hover:border-primary/50 bg-white hover:bg-gray-50'
          }`}
        >
          <div className="flex items-center space-x-4 space-x-reverse">
            {currentAnswer === index ? (
              <CheckCircle className="h-6 w-6 text-primary flex-shrink-0" />
            ) : (
              <Circle className="h-6 w-6 text-gray-400 flex-shrink-0" />
            )}
            <span className="text-base font-medium">{option}</span>
          </div>
        </button>
      ))}
    </div>
  );

  const renderTextInput = () => (
    <div className="space-y-6">
      {question.hasCode && (
        <div className="bg-gradient-to-r from-blue-50 to-accent/10 border border-blue-200 rounded-xl p-6 shadow-md">
          <div className="flex items-center space-x-3 space-x-reverse mb-4">
            <Code className="h-5 w-5 text-primary" />
            <span className="text-base font-semibold text-primary-dark">דוגמת קוד</span>
          </div>
          {renderCodeBlock(question.placeholder)}
        </div>
      )}
      
      <div>
        <label htmlFor="textAnswer" className="block text-base font-semibold text-gray-700 mb-3">
          תשובתך:
        </label>
        <textarea
          id="textAnswer"
          value={textAnswer}
          onChange={(e) => handleTextAnswer(e.target.value)}
          placeholder={question.placeholder || "הכנס את תשובתך כאן..."}
          className="w-full h-40 p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary resize-none transition-all duration-300"
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
    <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-4xl mx-auto border border-gray-100">
      {/* כותרת השאלה */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3 space-x-reverse">
            <span className="text-sm font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              {question.categoryTitle}
            </span>
            <span className="text-gray-300">|</span>
            <span className={`text-sm font-semibold ${getDifficultyColor(question.difficulty)} bg-${question.difficulty === 'easy' ? 'success' : question.difficulty === 'medium' ? 'warning' : 'error'}/10 px-3 py-1 rounded-full`}>
              {getDifficultyText(question.difficulty)}
            </span>
          </div>
          <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            {question.type === 'multiple' ? 'בחירה מרובה' : 'תשובה חופשית'}
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 leading-relaxed">
          {question.question}
        </h2>
      </div>

      {/* תוכן השאלה */}
      <div className="mb-8">
        {question.type === 'multiple' ? renderMultipleChoice() : renderTextInput()}
      </div>

      {/* הודעות עזרה */}
      {question.type === 'text' && (
        <div className="bg-gradient-to-r from-blue-50 to-accent/10 border border-blue-200 rounded-xl p-6">
          <div className="flex items-start space-x-3 space-x-reverse">
            <AlertCircle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
            <div className="text-base text-primary-dark">
              <p className="font-semibold mb-2">טיפים לתשובה:</p>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>השתמש בקוד ברור ומאורגן</li>
                <li>הסבר את הלוגיקה שלך</li>
                <li>כתוב תשובה מפורטת ומקצועית</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionCard; 