import React, { useEffect } from 'react';
import { useTimer } from './hooks/useTimer';
import { useExamState } from './hooks/useExamState';
import { useCSVExport } from './hooks/useCSVExport';
import LoginForm from './components/LoginForm';
import SimpleLayout from './components/SimpleLayout';
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
    <SimpleLayout
      userInfo={userInfo}
      timer={timer}
      allQuestions={allQuestions}
      currentQuestionIndex={currentQuestionIndex}
      currentQuestion={currentQuestion}
      totalQuestions={allQuestions.length}
      answeredQuestions={answeredQuestions}
      answers={answers}
      onAnswer={handleAnswerQuestion}
      onNext={nextQuestion}
      onPrev={prevQuestion}
      onGoToQuestion={goToQuestion}
      onCompleteExam={handleCompleteExam}
      isQuestionAnswered={(questionId) => isQuestionAnswered(questionId)}
    />
  );
}

export default App;
