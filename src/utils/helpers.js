// פונקציות עזר למערכת המבחן

export const formatTime = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

export const validateIdNumber = (idNumber) => {
  if (!idNumber || idNumber.length !== 9) return false;
  
  // אלגוריתם בדיקת תעודת זהות ישראלית
  let sum = 0;
  for (let i = 0; i < 8; i++) {
    let digit = parseInt(idNumber[i]);
    if (i % 2 === 0) {
      sum += digit;
    } else {
      let doubled = digit * 2;
      sum += doubled > 9 ? doubled - 9 : doubled;
    }
  }
  
  const checkDigit = parseInt(idNumber[8]);
  return (sum + checkDigit) % 10 === 0;
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone) => {
  const phoneRegex = /^05\d{8}$/;
  return phoneRegex.test(phone);
};

export const getDifficultyColor = (difficulty) => {
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

export const getDifficultyText = (difficulty) => {
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

export const getPerformanceColor = (rate) => {
  if (rate >= 80) return 'text-success';
  if (rate >= 60) return 'text-warning';
  return 'text-error';
};

export const getCategoryIcon = (category) => {
  const icons = {
    frontend: '⚛️',
    backend: '🔧',
    sql: '🗄️',
    architecture: '🏗️',
    devtools: '🛠️'
  };
  return icons[category] || '📝';
};

export const calculateScore = (answers, questions) => {
  let correct = 0;
  let total = 0;
  
  questions.forEach(question => {
    if (answers[question.id] !== undefined) {
      total++;
      if (question.type === 'multiple' && answers[question.id] === question.correct) {
        correct++;
      }
    }
  });
  
  return {
    correct,
    total,
    percentage: total > 0 ? Math.round((correct / total) * 100) : 0
  };
};

export const groupQuestionsByCategory = (questions) => {
  const grouped = {};
  
  questions.forEach(question => {
    if (!grouped[question.category]) {
      grouped[question.category] = [];
    }
    grouped[question.category].push(question);
  });
  
  return grouped;
};

export const saveToLocalStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error('Error saving to localStorage:', error);
    return false;
  }
};

export const loadFromLocalStorage = (key) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return null;
  }
};

export const clearLocalStorage = (key) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error('Error clearing localStorage:', error);
    return false;
  }
};

export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const throttle = (func, limit) => {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}; 