# Past Tense Click Game

Simple browser game that shows a base verb and asks the player to click the correct past tense form.

Author: teacher Abeer webhe

Files
- `index.html` — main page
- `style.css` — styles
- `script.js` — game logic and data

How to run
1. Open `index.html` in your browser (double-click or File > Open).

OR run a simple local server from the project folder (recommended) and open http://localhost:8000:

```bash
# macOS / Linux
python3 -m http.server 8000

# then open http://localhost:8000 in your browser
```

Notes
- The game runs for 25 questions by default and then shows a final score screen with a Play Again button.
- The game increments score for correct answers and shows feedback. Press Next to continue (or "See results" on the last question).
- To change verb data or the number of questions, edit `script.js` and modify the `verbs` array and the `totalQuestions` constant.
 - This version includes a school badge: **Al Karameh School** is shown on the page alongside the author credit (teacher Abeer webhe).

Design notes
- Kid-friendly fonts (Fredoka) and colorful accents were added to make the UI more playful and accessible for younger learners.
