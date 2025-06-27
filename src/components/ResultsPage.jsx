import React from 'react';
import { 
  Download, 
  Printer, 
  Home, 
  CheckCircle, 
  Clock, 
  BarChart3,
  Trophy,
  AlertCircle
} from 'lucide-react';

const ResultsPage = ({ 
  userInfo, 
  examData, 
  timerData, 
  onExportResults, 
  onResetExam 
}) => {
  const { answers, allQuestions } = examData;
  const { time: totalSeconds } = timerData;

  const calculateResults = () => {
    const results = {
      total: allQuestions.length,
      answered: Object.keys(answers).length,
      correct: 0,
      byCategory: {}
    };

    allQuestions.forEach(question => {
      const category = question.category;
      if (!results.byCategory[category]) {
        results.byCategory[category] = {
          total: 0,
          answered: 0,
          correct: 0
        };
      }

      results.byCategory[category].total++;
      
      if (answers[question.id] !== undefined) {
        results.byCategory[category].answered++;
        
        if (question.type === 'multiple' && answers[question.id] === question.correct) {
          results.byCategory[category].correct++;
          results.correct++;
        }
      }
    });

    return results;
  };

  const results = calculateResults();
  const completionRate = Math.round((results.answered / results.total) * 100);
  const accuracyRate = results.answered > 0 ? Math.round((results.correct / results.answered) * 100) : 0;

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePrint = () => {
    window.print();
  };

  const getCategoryIcon = (category) => {
    const icons = {
      frontend: '⚛️',
      backend: '🔧',
      sql: '🗄️',
      architecture: '🏗️',
      devtools: '🛠️'
    };
    return icons[category] || '📝';
  };

  const getPerformanceColor = (rate) => {
    if (rate >= 80) return 'text-success';
    if (rate >= 60) return 'text-warning';
    return 'text-error';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* כותרת */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            תוצאות המבחן
          </h1>
          <p className="text-lg text-gray-600">
            סיכום ביצועים מפורט
          </p>
        </div>

        {/* כרטיס מידע כללי */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mx-auto mb-3">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">{results.answered}/{results.total}</h3>
              <p className="text-sm text-gray-600">שאלות נענו</p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-success/10 rounded-full mx-auto mb-3">
                <CheckCircle className="h-6 w-6 text-success" />
              </div>
              <h3 className={`text-lg font-semibold ${getPerformanceColor(accuracyRate)}`}>
                {accuracyRate}%
              </h3>
              <p className="text-sm text-gray-600">דיוק תשובות</p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-warning/10 rounded-full mx-auto mb-3">
                <Clock className="h-6 w-6 text-warning" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">{formatTime(totalSeconds)}</h3>
              <p className="text-sm text-gray-600">זמן כולל</p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mx-auto mb-3">
                <Trophy className="h-6 w-6 text-primary" />
              </div>
              <h3 className={`text-lg font-semibold ${getPerformanceColor(completionRate)}`}>
                {completionRate}%
              </h3>
              <p className="text-sm text-gray-600">השלמת מבחן</p>
            </div>
          </div>
        </div>

        {/* פרטי משתמש */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">פרטי משתתף</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">שם מלא</p>
              <p className="font-medium">{userInfo?.fullName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">תעודת זהות</p>
              <p className="font-medium">{userInfo?.idNumber}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">אימייל</p>
              <p className="font-medium">{userInfo?.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">טלפון</p>
              <p className="font-medium">{userInfo?.phone}</p>
            </div>
          </div>
        </div>

        {/* תוצאות לפי קטגוריות */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">תוצאות לפי קטגוריות</h2>
          <div className="space-y-4">
            {Object.entries(results.byCategory).map(([category, stats]) => {
              const categoryRate = stats.answered > 0 ? Math.round((stats.correct / stats.answered) * 100) : 0;
              const completionRate = Math.round((stats.answered / stats.total) * 100);
              
              return (
                <div key={category} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <span className="text-2xl">{getCategoryIcon(category)}</span>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {allQuestions.find(q => q.category === category)?.categoryTitle || category}
                      </h3>
                    </div>
                    <div className="text-right">
                      <p className={`text-lg font-bold ${getPerformanceColor(categoryRate)}`}>
                        {categoryRate}%
                      </p>
                      <p className="text-sm text-gray-600">דיוק</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{stats.answered}/{stats.total}</p>
                      <p className="text-sm text-gray-600">נענו</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-success">{stats.correct}</p>
                      <p className="text-sm text-gray-600">נכונות</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-primary">{completionRate}%</p>
                      <p className="text-sm text-gray-600">השלמה</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* כפתורי פעולה */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 sm:space-x-reverse">
            <button
              onClick={() => onExportResults(examData, userInfo, timerData)}
              className="flex items-center space-x-2 space-x-reverse px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors shadow-lg hover:shadow-xl"
            >
              <Download className="h-5 w-5" />
              <span>ייצא לקובץ CSV</span>
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center space-x-2 space-x-reverse px-6 py-3 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600 transition-colors shadow-lg hover:shadow-xl"
            >
              <Printer className="h-5 w-5" />
              <span>הדפס תוצאות</span>
            </button>

            <button
              onClick={onResetExam}
              className="flex items-center space-x-2 space-x-reverse px-6 py-3 bg-success text-white rounded-lg font-medium hover:bg-success/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-success transition-colors shadow-lg hover:shadow-xl"
            >
              <Home className="h-5 w-5" />
              <span>מבחן חדש</span>
            </button>
          </div>
        </div>

        {/* הודעת סיום */}
        {completionRate < 100 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
            <div className="flex items-start space-x-3 space-x-reverse">
              <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-medium text-yellow-800">הערה</h3>
                <p className="text-sm text-yellow-700 mt-1">
                  לא ענית על כל השאלות במבחן. התוצאות משקפות רק את השאלות שנענו.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultsPage; 