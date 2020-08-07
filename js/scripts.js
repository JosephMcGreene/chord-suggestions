class Key {
  constructor(tonic, supertonic, mediant, subdominant, dominant, submediant, leadingTone) {
    this.tonic = tonic,
    this.supertonic = supertonic,
    this.mediant = mediant,
    this.subdominant = subdominant,
    this.dominant = dominant,
    this.submediant = submediant,
    this.leadingTone = leadingTone
  }
};

const noteNamesHTML = [
  'C&#9837;', 'C&#9838;', 'C&#9839;',
  'D&#9837;', 'D&#9838;', 'D&#9839;',
  'E&#9837;', 'E&#9838;', 'E&#9839;',
  'F&#9837;', 'F&#9838;', 'F&#9839;',
  'G&#9837;', 'G&#9838;', 'G&#9839;',
  'A&#9837;', 'A&#9838;', 'A&#9837;',
  'B&#9837;', 'B&#9838;', 'B&#9839;'
];

const noteNames = [
  'Cflat', 'Cnatural', 'Csharp',
  'Dflat', 'Dnatural', 'Dsharp',
  'Eflat', 'Enatural', 'Esharp',
  'Fflat', 'Fnatural', 'Fsharp',
  'Gflat', 'Gnatural', 'Gsharp',
  'Aflat', 'Anatural', 'Asharp',
  'Bflat', 'Bnatural', 'Bsharp'
];

// const noteNames = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];

const chordInput = document.querySelector('#chordInput');
const inputButton = document.querySelector('#chordInputButton');
const accidentalSelect = document.querySelector('#accidentalSelect');
const qualitySelect = document.querySelector('#qualitySelect');
let ul = document.querySelector('#chordSuggestionList');

// function establishKey() {
//   if (chordInput) {
//     const initialKey = new Key( chordInput.nodeValue.toUpperCase() )
//   }
// }

inputButton.addEventListener('click', () => {
  if ( noteNames.includes(chordInput.value.toUpperCase() + accidentalSelect.value) ) {
    let newTonic = chordInput.value.toUpperCase() + accidentalSelect.value;
    while ( newTonic !== noteNames[0] ) {
      let shiftNoteHTML = noteNamesHTML.shift();
      let shiftNote = noteNames.shift();

      noteNamesHTML.push(shiftNoteHTML);
      noteNames.push(shiftNote);
    }
  }
  let quickTest = document.createElement('li');
  ul.appendChild(quickTest);
  console.log(noteNames);
  quickTest.innerHTML = `${noteNamesHTML}`;
});