// Simple Past-Tense Click Game
// Author: teacher Abeer webhe

const verbs = [
  {base: 'be', past: 'was/were'},
  {base: 'become', past: 'became'},
  {base: 'begin', past: 'began'},
  {base: 'break', past: 'broke'},
  {base: 'bring', past: 'brought'},
  {base: 'build', past: 'built'},
  {base: 'buy', past: 'bought'},
  {base: 'catch', past: 'caught'},
  {base: 'choose', past: 'chose'},
  {base: 'come', past: 'came'},
  {base: 'do', past: 'did'},
  {base: 'drink', past: 'drank'},
  {base: 'drive', past: 'drove'},
  {base: 'eat', past: 'ate'},
  {base: 'fall', past: 'fell'},
  {base: 'feel', past: 'felt'},
  {base: 'find', past: 'found'},
  {base: 'get', past: 'got'},
  {base: 'give', past: 'gave'},
  {base: 'go', past: 'went'},
  {base: 'have', past: 'had'},
  {base: 'hear', past: 'heard'},
  {base: 'hold', past: 'held'},
  {base: 'know', past: 'knew'},
  {base: 'leave', past: 'left'},
  {base: 'leave', past: 'left'},
  {base: 'make', past: 'made'},
  {base: 'meet', past: 'met'},
  {base: 'pay', past: 'paid'},
  {base: 'read', past: 'read'},
  {base: 'run', past: 'ran'},
  {base: 'say', past: 'said'},
  {base: 'see', past: 'saw'},
  {base: 'sell', past: 'sold'},
  {base: 'send', past: 'sent'},
  {base: 'sing', past: 'sang'},
  {base: 'sit', past: 'sat'},
  {base: 'speak', past: 'spoke'},
  {base: 'stand', past: 'stood'},
  {base: 'take', past: 'took'},
  {base: 'teach', past: 'taught'},
  {base: 'tell', past: 'told'},
  {base: 'think', past: 'thought'},
  {base: 'understand', past: 'understood'},
  {base: 'write', past: 'wrote'}
];

const scoreEl = document.getElementById('score');
const qnumEl = document.getElementById('qnum');
const baseEl = document.getElementById('base');
const optionsEl = document.getElementById('options');
const nextBtn = document.getElementById('nextBtn');
const resetBtn = document.getElementById('resetBtn');

let score = 0;
let qnum = 0;
let current = null;
const totalQuestions = 25; // game length

function shuffle(arr){
  for(let i = arr.length-1;i>0;i--){
    const j = Math.floor(Math.random()*(i+1));
    [arr[i],arr[j]] = [arr[j],arr[i]];
  }
  return arr;
}

function nextQuestion(){
  // If we've already reached the total, show results
  if(qnum >= totalQuestions){
    showResults();
    return;
  }

  optionsEl.innerHTML = '';
  nextBtn.disabled = true;
  qnum++;
  qnumEl.textContent = qnum;

  // pick a random verb
  current = verbs[Math.floor(Math.random()*verbs.length)];
  baseEl.textContent = current.base;

  // update Next button label when on last question
  nextBtn.textContent = qnum === totalQuestions ? 'See results' : 'Next';

  // create options: include correct and 3 distractors
  const distractors = shuffle(verbs.filter(v=>v.past !== current.past)).slice(0,3).map(v=>v.past);
  const choices = shuffle([current.past, ...distractors]);

  for(const choice of choices){
    const btn = document.createElement('button');
    btn.className = 'opt';
    btn.type = 'button';
    btn.setAttribute('role','listitem');
    btn.textContent = choice;
    btn.setAttribute('aria-pressed','false');
    btn.addEventListener('click', onChoice);
    optionsEl.appendChild(btn);
  }
}

function showResults(){
  // Clear options and show a results summary
  optionsEl.innerHTML = '';
  nextBtn.disabled = true;
  nextBtn.textContent = 'Next';

  const resultWrap = document.createElement('div');
  resultWrap.className = 'result';
  resultWrap.innerHTML = `
    <div class="result-title">Round complete</div>
    <div class="result-score">You scored <strong>${score}</strong> out of <strong>${totalQuestions}</strong></div>
    <div class="result-actions">
      <button id="playAgain" class="btn">Play Again</button>
    </div>
  `;

  optionsEl.appendChild(resultWrap);

  const playAgainBtn = document.getElementById('playAgain');
  playAgainBtn.addEventListener('click', ()=>{
    resetGame();
  });
}

function onChoice(e){
  const btn = e.currentTarget;
  const val = btn.textContent;
  // disable further clicks
  const all = Array.from(optionsEl.querySelectorAll('.opt'));
  all.forEach(b=>b.disabled = true);

  if(val === current.past){
    btn.classList.add('correct');
    score++;
    scoreEl.textContent = score;
    announce('Correct!');
  } else {
    btn.classList.add('wrong');
    // highlight the correct one
    const correctBtn = all.find(b=>b.textContent === current.past);
    if(correctBtn) correctBtn.classList.add('correct');
    announce('Wrong — the correct answer is ' + current.past);
  }

  // If this was the final question, change nextBtn label to show results
  if(qnum >= totalQuestions){
    nextBtn.textContent = 'See results';
  }

  nextBtn.disabled = false;
}

function announce(text){
  // simple visual alert via aria-live container (game section already has aria-live)
  // fallback: console
  console.log(text);
}

nextBtn.addEventListener('click', ()=>{
  nextQuestion();
});

resetBtn.addEventListener('click', ()=>{
  resetGame();
});

// start first question on load
document.addEventListener('DOMContentLoaded', ()=>{
  // small shuffle to vary order
  shuffle(verbs);
  nextQuestion();
});

function resetGame(){
  score = 0; qnum = 0; current = null;
  scoreEl.textContent = score;
  qnumEl.textContent = qnum;
  nextBtn.disabled = true;
  nextBtn.textContent = 'Next';
  optionsEl.innerHTML = '';
  // small shuffle and begin
  shuffle(verbs);
  nextQuestion();
}
