# מערכת מבחן טכני מקצועית - Full Stack Senior Developer

מערכת מבחן טכני מתקדמת לבחינת מפתחי Full Stack Senior, הכוללת שאלות ב-React, JavaScript, .NET Core, SQL, ארכיטקטורה ו-DevTools.

## 🌟 תכונות עיקריות

- ✅ **10 שאלות מקצועיות** (5 פרונט-אנד, 3 backend, 2 SQL, 1 ארכיטקטורה, 1 devtools)
- ✅ **שאלות multiple choice ושאלות טקסט** עם syntax highlighting
- ✅ **טיימר מתקדם** עם מעקב זמן מלא
- ✅ **שמירה אוטומטית** - מניעת איבוד נתונים
- ✅ **ייצוא CSV** - תוצאות מפורטות
- ✅ **עיצוב RTL** - תמיכה מלאה בעברית
- ✅ **Responsive Design** - עובד מושלם במובייל
- ✅ **ניווט חכם** - מפת שאלות אינטראקטיבית

## 🚀 התקנה והרצה

### דרישות מקדימות
- Node.js 16+ 
- npm או yarn

### הוראות התקנה

1. **Clone הפרויקט:**
```bash
git clone https://github.com/yarivtch/exam-system.git
cd exam-system
```

2. **התקנת תלויות:**
```bash
npm install
```

3. **הרצת שרת פיתוח:**
```bash
npm start
```

4. **פתיחת הדפדפן:**
```
http://localhost:3000
```

### בנייה לפרודקשן
```bash
npm run build
```

## 📁 מבנה הפרויקט

```
exam-system/
├── public/
├── src/
│   ├── components/          # קומפוננטות React
│   │   ├── LoginForm.jsx    # טופס התחברות
│   │   ├── ExamHeader.jsx   # כותרת המבחן
│   │   ├── QuestionCard.jsx # כרטיס שאלה
│   │   ├── Navigation.jsx   # ניווט
│   │   └── ResultsPage.jsx  # דף תוצאות
│   ├── hooks/               # Custom Hooks
│   │   ├── useTimer.js      # ניהול טיימר
│   │   ├── useExamState.js  # ניהול מצב המבחן
│   │   └── useCSVExport.js  # ייצוא CSV
│   ├── data/
│   │   └── questionsBank.json # בנק השאלות
│   ├── utils/
│   │   └── helpers.js       # פונקציות עזר
│   ├── App.js              # קומפוננטה ראשית
│   └── index.js            # נקודת כניסה
├── package.json
└── README.md
```

## 🎯 שימוש במערכת

### 1. התחברות
- הכנס שם מלא, תעודת זהות, אימייל וטלפון
- ולידציה מלאה עם הודעות שגיאה ידידותיות

### 2. המבחן
- 10 שאלות מקצועיות ב-5 קטגוריות
- ניווט חופשי בין שאלות
- שמירה אוטומטית של תשובות
- טיימר מתקדם

### 3. תוצאות
- סיכום מפורט לפי קטגוריות
- ייצוא לקובץ CSV
- אפשרות הדפסה
- סטטיסטיקות ביצועים

## 🛠️ טכנולוגיות

- **Frontend:** React 18+, JavaScript (ES6+)
- **Styling:** CSS3 עם תמיכה ב-RTL
- **State Management:** React Hooks
- **Data Export:** PapaParse (CSV)
- **Icons:** Lucide React
- **Build Tool:** Create React App

## 📊 מבנה השאלות

### פרונט-אנד (5 שאלות)
- React Hooks (useState, useEffect)
- Component Lifecycle
- State Management
- Performance Optimization
- Custom Hooks

### Backend (3 שאלות)
- REST API Design
- Async/Await Patterns
- Exception Handling

### SQL (2 שאלות)
- JOIN Operations
- Views and Performance

### ארכיטקטורה (1 שאלה)
- System Scaling
- Microservices Design

### DevTools (1 שאלה)
- Performance Debugging
- Chrome DevTools

## 🔧 התאמות

### הוספת שאלות חדשות
עדכן את `src/data/questionsBank.json`:

```json
{
  "category": {
    "title": "כותרת הקטגוריה",
    "questions": [
      {
        "id": "unique_id",
        "question": "תוכן השאלה",
        "type": "multiple|text",
        "options": ["אופציה 1", "אופציה 2"],
        "correct": 0,
        "difficulty": "easy|medium|hard",
        "hasCode": true,
        "placeholder": "דוגמת קוד..."
      }
    ]
  }
}
```

### שינוי עיצוב
עדכן את `src/index.css` - כל העיצובים ב-CSS רגיל.

## 🚀 Deployment

### Netlify
1. Connect repository to Netlify
2. Build command: `npm run build`
3. Publish directory: `build`

### Vercel
1. Import repository to Vercel
2. Framework preset: Create React App
3. Deploy

## 📝 רישיון

MIT License - חופשי לשימוש מסחרי ופרטי.

## 🤝 תרומה

1. Fork הפרויקט
2. צור branch חדש (`git checkout -b feature/amazing-feature`)
3. Commit השינויים (`git commit -m 'Add amazing feature'`)
4. Push ל-branch (`git push origin feature/amazing-feature`)
5. פתח Pull Request

## 📞 תמיכה

לשאלות ותמיכה:
- GitHub Issues: [https://github.com/yarivtch/exam-system/issues](https://github.com/yarivtch/exam-system/issues)

---

**נבנה עם ❤️ ב-React**

---

# Professional Technical Exam System - Full Stack Senior Developer

Advanced technical exam system for Full Stack Senior developers, including questions on React, JavaScript, .NET Core, SQL, Architecture and DevTools.

## 🌟 Key Features

- ✅ **10 Professional Questions** (5 frontend, 3 backend, 2 SQL, 1 architecture, 1 devtools)
- ✅ **Multiple choice and text questions** with syntax highlighting
- ✅ **Advanced timer** with full time tracking
- ✅ **Auto-save** - prevent data loss
- ✅ **CSV Export** - detailed results
- ✅ **RTL Design** - full Hebrew support
- ✅ **Responsive Design** - perfect mobile experience
- ✅ **Smart Navigation** - interactive question map

## 🚀 Installation & Setup

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation Instructions

1. **Clone the project:**
```bash
git clone https://github.com/yarivtch/exam-system.git
cd exam-system
```

2. **Install dependencies:**
```bash
npm install
```

3. **Start development server:**
```bash
npm start
```

4. **Open browser:**
```
http://localhost:3000
```

### Production Build
```bash
npm run build
```

## 📁 Project Structure

```
exam-system/
├── public/
├── src/
│   ├── components/          # React Components
│   │   ├── LoginForm.jsx    # Login Form
│   │   ├── ExamHeader.jsx   # Exam Header
│   │   ├── QuestionCard.jsx # Question Card
│   │   ├── Navigation.jsx   # Navigation
│   │   └── ResultsPage.jsx  # Results Page
│   ├── hooks/               # Custom Hooks
│   │   ├── useTimer.js      # Timer Management
│   │   ├── useExamState.js  # Exam State Management
│   │   └── useCSVExport.js  # CSV Export
│   ├── data/
│   │   └── questionsBank.json # Questions Bank
│   ├── utils/
│   │   └── helpers.js       # Helper Functions
│   ├── App.js              # Main Component
│   └── index.js            # Entry Point
├── package.json
└── README.md
```

## 🎯 System Usage

### 1. Login
- Enter full name, ID number, email and phone
- Full validation with friendly error messages

### 2. Exam
- 10 professional questions in 5 categories
- Free navigation between questions
- Automatic answer saving
- Advanced timer

### 3. Results
- Detailed summary by categories
- CSV export
- Print option
- Performance statistics

## 🛠️ Technologies

- **Frontend:** React 18+, JavaScript (ES6+)
- **Styling:** CSS3 with RTL support
- **State Management:** React Hooks
- **Data Export:** PapaParse (CSV)
- **Icons:** Lucide React
- **Build Tool:** Create React App

## 📊 Question Structure

### Frontend (5 questions)
- React Hooks (useState, useEffect)
- Component Lifecycle
- State Management
- Performance Optimization
- Custom Hooks

### Backend (3 questions)
- REST API Design
- Async/Await Patterns
- Exception Handling

### SQL (2 questions)
- JOIN Operations
- Views and Performance

### Architecture (1 question)
- System Scaling
- Microservices Design

### DevTools (1 question)
- Performance Debugging
- Chrome DevTools

## 🔧 Customization

### Adding New Questions
Update `src/data/questionsBank.json`:

```json
{
  "category": {
    "title": "Category Title",
    "questions": [
      {
        "id": "unique_id",
        "question": "Question content",
        "type": "multiple|text",
        "options": ["Option 1", "Option 2"],
        "correct": 0,
        "difficulty": "easy|medium|hard",
        "hasCode": true,
        "placeholder": "Code example..."
      }
    ]
  }
}
```

### Changing Design
Update `src/index.css` - all styles in regular CSS.

## 🚀 Deployment

### Netlify
1. Connect repository to Netlify
2. Build command: `npm run build`
3. Publish directory: `build`

### Vercel
1. Import repository to Vercel
2. Framework preset: Create React App
3. Deploy

## 📝 License

MIT License - free for commercial and private use.

## 🤝 Contributing

1. Fork the project
2. Create new branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📞 Support

For questions and support:
- GitHub Issues: [https://github.com/yarivtch/exam-system/issues](https://github.com/yarivtch/exam-system/issues)

---

**Built with ❤️ in React**
