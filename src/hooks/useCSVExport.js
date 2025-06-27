import { useCallback } from 'react';
import Papa from 'papaparse';

export const useCSVExport = () => {
  const exportExamResults = useCallback((examData, userInfo, timerData) => {
    const {
      answers,
      allQuestions
    } = examData;

    const {
      startTime,
      endTime,
      time: totalSeconds
    } = timerData;

    // יצירת נתונים לייצוא
    const exportData = {
      // פרטי משתמש
      fullName: userInfo?.fullName || '',
      idNumber: userInfo?.idNumber || '',
      email: userInfo?.email || '',
      phone: userInfo?.phone || '',
      
      // זמני מבחן
      startTime: startTime ? startTime.toISOString() : '',
      endTime: endTime ? endTime.toISOString() : '',
      totalTimeSeconds: totalSeconds,
      totalTimeFormatted: formatTime(totalSeconds),
      
      // סטטיסטיקות
      totalQuestions: allQuestions.length,
      answeredQuestions: Object.keys(answers).length,
      completionRate: `${Math.round((Object.keys(answers).length / allQuestions.length) * 100)}%`,
      
      // תאריך ייצוא
      exportDate: new Date().toISOString()
    };

    // הוספת תשובות לכל שאלה
    allQuestions.forEach((question, index) => {
      const answer = answers[question.id];
      const isCorrect = question.type === 'multiple' && answer === question.correct;
      
      exportData[`question_${index + 1}_id`] = question.id;
      exportData[`question_${index + 1}_category`] = question.category;
      exportData[`question_${index + 1}_question`] = question.question;
      exportData[`question_${index + 1}_answer`] = answer || '';
      exportData[`question_${index + 1}_correct`] = question.type === 'multiple' ? question.correct : '';
      exportData[`question_${index + 1}_is_correct`] = isCorrect ? 'כן' : 'לא';
      exportData[`question_${index + 1}_difficulty`] = question.difficulty;
    });

    // יצירת CSV
    const csv = Papa.unparse([exportData]);
    
    // יצירת קובץ להורדה
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `exam_results_${userInfo?.idNumber || 'unknown'}_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }, []);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return {
    exportExamResults
  };
}; 