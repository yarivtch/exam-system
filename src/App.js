import React, { useEffect } from 'react';
import { useTimer } from './hooks/useTimer';
import { useExamState } from './hooks/useExamState';
import { useCSVExport } from './hooks/useCSVExport';
import LoginForm from './components/LoginForm';
import ExamHeader from './components/ExamHeader';
import QuestionCard from './components/QuestionCard';
import Navigation from './components/Navigation';
import ResultsPage from './components/ResultsPage';

function App() {
  const timer = useTimer();
  const examState = useExamState();
  const { exportExamResults } = useCSVExport();

  const {
    currentQuestionIndex,
    answers,
    examStarted,
    examCompleted,
    userInfo,
    allQuestions,
    startExam,
    answerQuestion,
    nextQuestion,
    prevQuestion,
    goToQuestion,
    completeExam,
    resetExam,
    getAnsweredQuestions,
    getCurrentQuestion,
    isQuestionAnswered
  } = examState;

  // התחלת טיימרמבחן מתחיל
  useEffect(() => {
    if (examStarted && !timer.isRunning) {
      timer.startTimer();
    }
  }, [examStarted, timer]);

  // עצירת טיימרמבחן מסתיים
  useEffect(() => {
    if (examCompleted && timer.isRunning) {
      timer.stopTimer();
    }
  }, [examCompleted, timer]);

  const handleLogin = (userData) => {
    startExam(userData);
  };

  const handleAnswerQuestion = (questionId, answer) => {
    answerQuestion(questionId, answer);
  };

  const handleCompleteExam = () => {
    timer.stopTimer();
    completeExam();
  };

  const handleExportResults = () => {
    exportExamResults(examState, userInfo, timer);
  };

  const handleResetExam = () => {
    timer.resetTimer();
    resetExam();
  };

  // אם המבחן לא התחיל - הצג טופס התחברות
  if (!examStarted) {
    return <LoginForm onLogin={handleLogin} />;
  }

  // אם המבחן הסתיים - הצג דף תוצאות
  if (examCompleted) {
    return (
      <ResultsPage
        userInfo={userInfo}
        examData={examState}
        timerData={timer}
        onExportResults={handleExportResults}
        onResetExam={handleResetExam}
      />
    );
  }

  // אם המבחן פעיל - הצג את המבחן
  const currentQuestion = getCurrentQuestion();
  const answeredQuestions = getAnsweredQuestions();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50">
      {/* כותרת המבחן */}
      <ExamHeader
        userInfo={userInfo}
        timer={timer}
        currentQuestionIndex={currentQuestionIndex}
        currentQuestion={currentQuestion}
        totalQuestions={allQuestions.length}
        answeredQuestions={answeredQuestions}
      />

      {/* תוכן המבחן */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex justify-center">
          {currentQuestion && (
            <QuestionCard
              question={currentQuestion}
              onAnswer={handleAnswerQuestion}
              currentAnswer={answers[currentQuestion.id]}
            />
          )}
        </div>
      </div>

      {/* ניווט */}
      <Navigation
        currentQuestionIndex={currentQuestionIndex}
        totalQuestions={allQuestions.length}
        onNext={nextQuestion}
        onPrev={prevQuestion}
        onGoToQuestion={goToQuestion}
        onCompleteExam={handleCompleteExam}
        answeredQuestions={answeredQuestions}
        isQuestionAnswered={(index) => isQuestionAnswered(allQuestions[index]?.id)}
      />
    </div>
  );
}

export default App;
