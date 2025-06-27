import { useState, useEffect, useCallback } from 'react';
import questionsData from '../data/questionsBank.json';

export const useExamState = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [examStarted, setExamStarted] = useState(false);
  const [examCompleted, setExamCompleted] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [allQuestions, setAllQuestions] = useState([]);

  // טעינת כל השאלות מכל הקטגוריות
  useEffect(() => {
    const questions = [];
    Object.keys(questionsData).forEach(category => {
      questionsData[category].questions.forEach(question => {
        questions.push({
          ...question,
          category,
          categoryTitle: questionsData[category].title
        });
      });
    });
    setAllQuestions(questions);
  }, []);

  // שמירה מקומית
  useEffect(() => {
    if (examStarted) {
      localStorage.setItem('examState', JSON.stringify({
        currentQuestionIndex,
        answers,
        examStarted,
        examCompleted,
        userInfo
      }));
    }
  }, [currentQuestionIndex, answers, examStarted, examCompleted, userInfo]);

  // טעינה מקומית
  useEffect(() => {
    const savedState = localStorage.getItem('examState');
    if (savedState) {
      const parsed = JSON.parse(savedState);
      setCurrentQuestionIndex(parsed.currentQuestionIndex || 0);
      setAnswers(parsed.answers || {});
      setExamStarted(parsed.examStarted || false);
      setExamCompleted(parsed.examCompleted || false);
      setUserInfo(parsed.userInfo || null);
    }
  }, []);

  const startExam = useCallback((userData) => {
    setUserInfo(userData);
    setExamStarted(true);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setExamCompleted(false);
  }, []);

  const answerQuestion = useCallback((questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  }, []);

  const nextQuestion = useCallback(() => {
    if (currentQuestionIndex < allQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  }, [currentQuestionIndex, allQuestions.length]);

  const prevQuestion = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  }, [currentQuestionIndex]);

  const goToQuestion = useCallback((index) => {
    if (index >= 0 && index < allQuestions.length) {
      setCurrentQuestionIndex(index);
    }
  }, [allQuestions.length]);

  const completeExam = useCallback(() => {
    setExamCompleted(true);
  }, []);

  const resetExam = useCallback(() => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setExamStarted(false);
    setExamCompleted(false);
    setUserInfo(null);
    localStorage.removeItem('examState');
  }, []);

  const getAnsweredQuestions = useCallback(() => {
    return Object.keys(answers).length;
  }, [answers]);

  const getCurrentQuestion = useCallback(() => {
    return allQuestions[currentQuestionIndex];
  }, [allQuestions, currentQuestionIndex]);

  const isQuestionAnswered = useCallback((questionId) => {
    return answers.hasOwnProperty(questionId);
  }, [answers]);

  return {
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
  };
}; 