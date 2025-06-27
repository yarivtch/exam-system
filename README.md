# מערכת מבחן טכני מקצועית

מערכת מבחן טכני מתקדמת למפתחי Full Stack Senior, בנויה ב-React ו-JavaScript עם עיצוב מודרני ותמיכה מלאה בעברית.

## 🌟 תכונות עיקריות

- **ממשק משתמש מתקדם** - עיצוב מודרני עם Tailwind CSS ותמיכה מלאה ב-RTL
- **ניהול זמן חכם** - טיימר מתקדם עם התראות ויזואליות
- **ניווט מתקדם** - מפת שאלות אינטראקטיבית עם סטטוס זמן אמת
- **שמירת נתונים** - שמירה אוטומטית של התקדמות המבחן
- **ייצוא תוצאות** - ייצוא CSV מפורט עם ניתוח מפורט
- **תמיכה בשאלות מגוונות** - שאלות בחירה יחידה, בחירה מרובה וטקסט חופשי
- **ולידציה מתקדמת** - בדיקות תקינות מקיפות לכל סוגי השאלות

## 🚀 התקנה והרצה

### דרישות מקדימות
- Node.js (גרסה 14 ומעלה)
- npm או yarn

### התקנה
```bash
# שכפול הפרויקט
git clone https://github.com/yarivtch/exam-system.git
cd exam-system

# התקנת תלויות
npm install

# הרצת הפרויקט בפיתוח
npm start
```

הפרויקט ייפתח אוטומטית בדפדפן בכתובת `http://localhost:3000`

## 📦 בנייה לייצור

```bash
# בניית הפרויקט לייצור
npm run build

# הרצת הפרויקט מה-build
npm run serve
```

## 🌐 דיפלוי

### GitHub Pages
הפרויקט מוכן לדיפלוי אוטומטי ל-GitHub Pages:

```bash
# דיפלוי ל-GitHub Pages
npm run deploy
```

המערכת תהיה זמינה בכתובת: `https://yarivtch.github.io/exam-system`

### Netlify
1. העלה את תיקיית `build` ל-Netlify
2. הגדר את Base directory ל-`build`
3. הגדר את Publish directory ל-`build`

### Vercel
1. חבר את הפרויקט ל-Vercel
2. Vercel יזהה אוטומטית שזה פרויקט React
3. הדיפלוי יתבצע אוטומטית בכל push

## 📁 מבנה הפרויקט

```
exam-system/
├── public/                 # קבצים סטטיים
├── src/
│   ├── components/         # קומפוננטות React
│   │   ├── ExamHeader.jsx  # כותרת המבחן עם טיימר
│   │   ├── LoginForm.jsx   # טופס התחברות
│   │   ├── Navigation.jsx  # ניווט ומפת שאלות
│   │   ├── QuestionCard.jsx # כרטיס שאלה
│   │   └── ResultsPage.jsx # דף תוצאות
│   ├── hooks/              # Custom Hooks
│   │   ├── useExamState.js # ניהול מצב המבחן
│   │   ├── useTimer.js     # ניהול טיימר
│   │   └── useCSVExport.js # ייצוא CSV
│   ├── data/               # נתונים
│   │   └── questionsBank.json # בנק השאלות
│   ├── utils/              # פונקציות עזר
│   │   └── helpers.js      # פונקציות עזר כלליות
│   ├── App.js              # קומפוננטה ראשית
│   ├── index.js            # נקודת כניסה
│   └── index.css           # סגנונות גלובליים
├── package.json            # תלויות וסקריפטים
└── README.md              # תיעוד הפרויקט
```

## 🎯 שימוש במערכת

### 1. התחברות
- הכנס שם מלא ואימייל
- המערכת תבדוק תקינות הנתונים
- לחץ על "התחל מבחן"

### 2. ביצוע המבחן
- השתמש בכפתורי הניווט למעבר בין שאלות
- ענה על כל השאלות (חובה לענות על לפחות 80%)
- השתמש בטיימר לניהול זמן
- המערכת תשמור אוטומטית את התקדמותך

### 3. סיום המבחן
- לחץ על "סיים מבחן" כשסיימת
- המערכת תציג סיכום מפורט
- תוכל לייצא את התוצאות ל-CSV

## 📊 פורמט קובץ השאלות

המערכת תומכת בקובץ JSON עם המבנה הבא:

```json
{
  "examInfo": {
    "title": "מבחן Full Stack Senior",
    "duration": 120,
    "passingScore": 80
  },
  "questions": [
    {
      "id": 1,
      "type": "single",
      "question": "מהי הדרך הטובה ביותר לניהול state ב-React?",
      "options": [
        "useState hook",
        "useReducer hook", 
        "Context API",
        "Redux"
      ],
      "correctAnswer": 0,
      "explanation": "useState הוא ה-hook הבסיסי והפשוט ביותר לניהול state מקומי"
    }
  ]
}
```

### סוגי שאלות נתמכים:
- **single**: שאלה עם תשובה נכונה אחת
- **multiple**: שאלה עם מספר תשובות נכונות
- **text**: שאלה פתוחה עם תשובה טקסטואלית

## 🛠️ פיתוח

### הוספת תכונות חדשות
1. צור branch חדש: `git checkout -b feature/new-feature`
2. פיתוח התכונה
3. בדיקות מקיפות
4. Pull Request

### בדיקות
```bash
# הרצת בדיקות
npm test

# בדיקות עם כיסוי
npm test -- --coverage
```

## 📝 רישיון

פרויקט זה מוגן תחת רישיון MIT.

## 🤝 תרומה

תרומות יתקבלו בברכה! אנא:
1. Fork את הפרויקט
2. צור branch לתכונה חדשה
3. Commit את השינויים
4. Push ל-branch
5. פתח Pull Request

## 📞 תמיכה

לשאלות ותמיכה, אנא פנה ל:
- Issues: [GitHub Issues](https://github.com/yarivtch/exam-system/issues)
- Email: [your-email@example.com]

---

**נבנה עם ❤️ ב-React ו-JavaScript**

---

# Professional Technical Exam System

Advanced technical exam system for Full Stack Senior developers, built with React and JavaScript featuring modern design and full Hebrew support.

## 🌟 Key Features

- **Advanced UI** - Modern design with Tailwind CSS and full RTL support
- **Smart Time Management** - Advanced timer with visual notifications
- **Advanced Navigation** - Interactive question map with real-time status
- **Data Persistence** - Automatic exam progress saving
- **Results Export** - Detailed CSV export with comprehensive analysis
- **Diverse Question Support** - Single choice, multiple choice, and free text questions
- **Advanced Validation** - Comprehensive validation for all question types

## 🚀 Installation and Running

### Prerequisites
- Node.js (version 14 and above)
- npm or yarn

### Installation
```bash
# Clone the project
git clone https://github.com/yarivtch/exam-system.git
cd exam-system

# Install dependencies
npm install

# Run the project in development
npm start
```

The project will automatically open in the browser at `http://localhost:3000`

## 📦 Production Build

```bash
# Build the project for production
npm run build

# Run the project from build
npm run serve
```

## 🌐 Deployment

### GitHub Pages
The project is ready for automatic deployment to GitHub Pages:

```bash
# Deploy to GitHub Pages
npm run deploy
```

The system will be available at: `https://yarivtch.github.io/exam-system`

### Netlify
1. Upload the `build` folder to Netlify
2. Set Base directory to `build`
3. Set Publish directory to `build`

### Vercel
1. Connect the project to Vercel
2. Vercel will automatically detect it's a React project
3. Deployment will happen automatically on every push

## 📁 Project Structure

```
exam-system/
├── public/                 # Static files
├── src/
│   ├── components/         # React components
│   │   ├── ExamHeader.jsx  # Exam header with timer
│   │   ├── LoginForm.jsx   # Login form
│   │   ├── Navigation.jsx  # Navigation and question map
│   │   ├── QuestionCard.jsx # Question card
│   │   └── ResultsPage.jsx # Results page
│   ├── hooks/              # Custom Hooks
│   │   ├── useExamState.js # Exam state management
│   │   ├── useTimer.js     # Timer management
│   │   └── useCSVExport.js # CSV export
│   ├── data/               # Data
│   │   └── questionsBank.json # Questions bank
│   ├── utils/              # Helper functions
│   │   └── helpers.js      # General helper functions
│   ├── App.js              # Main component
│   ├── index.js            # Entry point
│   └── index.css           # Global styles
├── package.json            # Dependencies and scripts
└── README.md              # Project documentation
```

## 🎯 Using the System

### 1. Login
- Enter full name and email
- System will validate the data
- Click "Start Exam"

### 2. Taking the Exam
- Use navigation buttons to move between questions
- Answer all questions (must answer at least 80%)
- Use timer for time management
- System will automatically save your progress

### 3. Finishing the Exam
- Click "Finish Exam" when done
- System will show detailed summary
- You can export results to CSV

## 📊 Question File Format

The system supports a JSON file with the following structure:

```json
{
  "examInfo": {
    "title": "Full Stack Senior Exam",
    "duration": 120,
    "passingScore": 80
  },
  "questions": [
    {
      "id": 1,
      "type": "single",
      "question": "What is the best way to manage state in React?",
      "options": [
        "useState hook",
        "useReducer hook", 
        "Context API",
        "Redux"
      ],
      "correctAnswer": 0,
      "explanation": "useState is the basic and simplest hook for local state management"
    }
  ]
}
```

### Supported Question Types:
- **single**: Question with one correct answer
- **multiple**: Question with multiple correct answers
- **text**: Open question with textual answer

## 🛠️ Development

### Adding New Features
1. Create new branch: `git checkout -b feature/new-feature`
2. Develop the feature
3. Comprehensive testing
4. Pull Request

### Testing
```bash
# Run tests
npm test

# Tests with coverage
npm test -- --coverage
```

## 📝 License

This project is protected under MIT license.

## 🤝 Contributing

Contributions are welcome! Please:
1. Fork the project
2. Create a branch for new feature
3. Commit your changes
4. Push to the branch
5. Open Pull Request

## 📞 Support

For questions and support, please contact:
- Issues: [GitHub Issues](https://github.com/yarivtch/exam-system/issues)
- Email: [your-email@example.com]

---

**Built with ❤️ in React and JavaScript**
