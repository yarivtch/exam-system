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
      <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto my-4">
        <pre className="whitespace-pre-wrap">{code}</pre>
      </div>
    );
  };

  const renderMultipleChoice = () => (
    <div className="space-y-3">
      {question.options.map((option, index) => (
        <button
          key={index}
          onClick={() => handleMultipleChoice(index)}
          className={`w-full text-right p-4 rounded-lg border-2 transition-all duration-200 hover:shadow-md ${
            currentAnswer === index
              ? 'border-primary bg-primary/5 text-primary'
              : 'border-gray-200 hover:border-primary/50'
          }`}
        >
          <div className="flex items-center space-x-3 space-x-reverse">
            {currentAnswer === index ? (
              <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
            ) : (
              <Circle className="h-5 w-5 text-gray-400 flex-shrink-0" />
            )}
            <span className="text-sm">{option}</span>
          </div>
        </button>
      ))}
    </div>
  );

  const renderTextInput = () => (
    <div className="space-y-4">
      {question.hasCode && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center space-x-2 space-x-reverse mb-2">
            <Code className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-800">דוגמת קוד</span>
          </div>
          {renderCodeBlock(question.placeholder)}
        </div>
      )}
      
      <div>
        <label htmlFor="textAnswer" className="block text-sm font-medium text-gray-700 mb-2">
          תשובתך:
        </label>
        <textarea
          id="textAnswer"
          value={textAnswer}
          onChange={(e) => handleTextAnswer(e.target.value)}
          placeholder={question.placeholder || "הכנס את תשובתך כאן..."}
          className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary resize-none"
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
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
      {/* כותרת השאלה */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2 space-x-reverse">
            <span className="text-sm font-medium text-gray-500">
              {question.categoryTitle}
            </span>
            <span className="text-gray-300">|</span>
            <span className={`text-sm font-medium ${getDifficultyColor(question.difficulty)}`}>
              {getDifficultyText(question.difficulty)}
            </span>
          </div>
          <div className="text-sm text-gray-500">
            שאלה מסוג: {question.type === 'multiple' ? 'בחירה מרובה' : 'תשובה חופשית'}
          </div>
        </div>
        
        <h2 className="text-xl font-bold text-gray-900 leading-relaxed">
          {question.question}
        </h2>
      </div>

      {/* תוכן השאלה */}
      <div className="mb-6">
        {question.type === 'multiple' ? renderMultipleChoice() : renderTextInput()}
      </div>

      {/* הודעות עזרה */}
      {question.type === 'text' && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start space-x-2 space-x-reverse">
            <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-yellow-800">
              <p className="font-medium mb-1">טיפים לתשובה:</p>
              <ul className="list-disc list-inside space-y-1 text-xs">
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