import React from 'react';
import { 
  Download, 
  Printer, 
  Home, 
  CheckCircle, 
  Clock, 
  BarChart3,
  Trophy,
  AlertCircle,
  Star,
  Award
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

  const getPerformanceMessage = (rate) => {
    if (rate >= 90) return 'מצוין! ביצועים יוצאי דופן';
    if (rate >= 80) return 'טוב מאוד! ביצועים מעולים';
    if (rate >= 70) return 'טוב! ביצועים טובים';
    if (rate >= 60) return 'מספק! יש מקום לשיפור';
    return 'נדרש שיפור משמעותי';
  };

  const getPerformanceIcon = (rate) => {
    if (rate >= 80) return <Trophy className="h-8 w-8 text-yellow-500" />;
    if (rate >= 60) return <Star className="h-8 w-8 text-blue-500" />;
    return <AlertCircle className="h-8 w-8 text-gray-500" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 p-4">
      <div className="max-w-6xl mx-auto">
        {/* כותרת */}
        <div className="text-center mb-12">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 mb-8">
            <h1 className="text-5xl font-bold text-blue-700 mb-4">
              תוצאות המבחן
            </h1>
            <p className="text-xl text-blue-600">
              סיכום ביצועים מפורט
            </p>
          </div>
        </div>

        {/* כרטיס ביצועים כללי */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8 border border-white/20">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              {getPerformanceIcon(accuracyRate)}
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {getPerformanceMessage(accuracyRate)}
            </h2>
            <p className="text-lg text-gray-600">
              דיוק כללי: {accuracyRate}%
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center bg-gradient-to-br from-blue-50 to-accent/10 rounded-xl p-6 border border-blue-200">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full mx-auto mb-4">
                <BarChart3 className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{results.answered}/{results.total}</h3>
              <p className="text-sm text-gray-600 font-medium">שאלות נענו</p>
            </div>

            <div className="text-center bg-gradient-to-br from-success/10 to-green-50 rounded-xl p-6 border border-success/20">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-success to-green-600 rounded-full mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
              <h3 className={`text-2xl font-bold ${getPerformanceColor(accuracyRate)} mb-2`}>
                {accuracyRate}%
              </h3>
              <p className="text-sm text-gray-600 font-medium">דיוק תשובות</p>
            </div>

            <div className="text-center bg-gradient-to-br from-warning/10 to-yellow-50 rounded-xl p-6 border border-warning/20">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-warning to-yellow-600 rounded-full mx-auto mb-4">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{formatTime(totalSeconds)}</h3>
              <p className="text-sm text-gray-600 font-medium">זמן כולל</p>
            </div>

            <div className="text-center bg-gradient-to-br from-primary/10 to-blue-50 rounded-xl p-6 border border-primary/20">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full mx-auto mb-4">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className={`text-2xl font-bold ${getPerformanceColor(completionRate)} mb-2`}>
                {completionRate}%
              </h3>
              <p className="text-sm text-gray-600 font-medium">השלמת מבחן</p>
            </div>
          </div>
        </div>

        {/* פרטי משתמש */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8 border border-white/20">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center mr-3">
              <span className="text-white font-bold">👤</span>
            </div>
            פרטי משתתף
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-sm text-gray-600 font-medium mb-1">שם מלא</p>
              <p className="font-semibold text-lg">{userInfo?.fullName}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-sm text-gray-600 font-medium mb-1">תעודת זהות</p>
              <p className="font-semibold text-lg">{userInfo?.idNumber}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-sm text-gray-600 font-medium mb-1">אימייל</p>
              <p className="font-semibold text-lg">{userInfo?.email}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-sm text-gray-600 font-medium mb-1">טלפון</p>
              <p className="font-semibold text-lg">{userInfo?.phone}</p>
            </div>
          </div>
        </div>

        {/* תוצאות לפי קטגוריות */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8 border border-white/20">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
            <div className="w-8 h-8 bg-gradient-to-br from-accent to-primary rounded-lg flex items-center justify-center mr-3">
              <span className="text-white font-bold">📊</span>
            </div>
            תוצאות לפי קטגוריות
          </h2>
          <div className="space-y-6">
            {Object.entries(results.byCategory).map(([category, stats]) => {
              const categoryRate = stats.answered > 0 ? Math.round((stats.correct / stats.answered) * 100) : 0;
              const completionRate = Math.round((stats.answered / stats.total) * 100);
              
              return (
                <div key={category} className="bg-gradient-to-r from-gray-50 to-blue-50 border border-gray-200 rounded-xl p-6 card-hover">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <span className="text-3xl">{getCategoryIcon(category)}</span>
                      <h3 className="text-xl font-bold text-gray-900">
                        {allQuestions.find(q => q.category === category)?.categoryTitle || category}
                      </h3>
                    </div>
                    <div className="text-right">
                      <p className={`text-2xl font-bold ${getPerformanceColor(categoryRate)}`}>
                        {categoryRate}%
                      </p>
                      <p className="text-sm text-gray-600 font-medium">דיוק</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <p className="text-2xl font-bold text-gray-900">{stats.answered}/{stats.total}</p>
                      <p className="text-sm text-gray-600 font-medium">נענו</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <p className="text-2xl font-bold text-success">{stats.correct}</p>
                      <p className="text-sm text-gray-600 font-medium">נכונות</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <p className="text-2xl font-bold text-primary">{completionRate}%</p>
                      <p className="text-sm text-gray-600 font-medium">השלמה</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* כפתורי פעולה */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-white/20">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onExportResults}
              className="btn-primary flex items-center justify-center space-x-2 space-x-reverse px-8 py-4 text-lg"
            >
              <Download className="h-5 w-5" />
              <span>ייצוא תוצאות ל-CSV</span>
            </button>
            
            <button
              onClick={handlePrint}
              className="btn-secondary flex items-center justify-center space-x-2 space-x-reverse px-8 py-4 text-lg"
            >
              <Printer className="h-5 w-5" />
              <span>הדפסת תוצאות</span>
            </button>
            
            <button
              onClick={onResetExam}
              className="btn-outline flex items-center justify-center space-x-2 space-x-reverse px-8 py-4 text-lg"
            >
              <Home className="h-5 w-5" />
              <span>מבחן חדש</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage; 