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
  'C&#9838;', 'C&#9839;',
  'D&#9837;', 'D&#9838;',
  'E&#9837;', 'E&#9838;',
  'F&#9838;', 'F&#9839;',
  'G&#9837;', 'G&#9838;',
  'A&#9837;', 'A&#9838;',
  'B&#9837;', 'B&#9838;',
];
const noteNames = [
  'Cnatural', 'Csharp',
  'Dflat', 'Dnatural',
  'Eflat', 'Enatural',
  'Fnatural', 'Fsharp',
  'Gflat', 'Gnatural',
  'Aflat', 'Anatural',
  'Bflat', 'Bnatural'
];

const sharpKeys = ['Gnatural', 'Dnatural', 'Anatural', 'Enatural', 'Bnatural', 'Fsharp', 'Csharp'];
const flatKeys = ['Fnatural', 'Bflat', 'Eflat', 'Aflat', 'Dflat', 'Gflat'];
const cMajor = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];

const orderOfSharps = ['F', 'C', 'G', 'D', 'A', 'E', 'B'];
const orderOfFlats = ['B', 'E', 'A', 'D', 'G', 'C', 'F'];

const chordInput = document.querySelector('#chordInput');
const inputButton = document.querySelector('#chordInputButton');
const accidentalSelect = document.querySelector('#accidentalSelect');
const qualitySelect = document.querySelector('#qualitySelect');
let suggestionList = document.querySelector('#chordSuggestionList');

    /**
     * Establishes the key used to suggest chords once the user presses the inputButton.
     * @return  [Array]    an array containing the new key.
     */

function establishKey() {
  if ( noteNames.includes(chordInput.value.toUpperCase() + accidentalSelect.value) ) {
    let tonic = chordInput.value.toUpperCase() + accidentalSelect.value;
    let key;
    // If the user input is a key with sharps:
    if ( sharpKeys.includes(tonic) ) {
      let numOfSharps = sharpKeys.indexOf(tonic) + 1; /** 1 for Gnatural, 2 for Dnatural, etc. */
      let tonicSharps = orderOfSharps.filter( i => orderOfSharps.indexOf(i) < numOfSharps );
      tonicSharps.forEach( (val, idx) => tonicSharps[idx] = `${val}&#9839;` ); /** HTML Hex for sharp symbol */
    } 
    // If the user input is a key with flats:
    else if ( flatKeys.includes(tonic) ) {
      let numOfFlats = flatKeys.indexOf(tonic) + 1; /** 1 for Fnatural, 2 for Bflat, etc. */
      let tonicFlats = orderOfFlats.filter( i => orderOfFlats.indexOf(i) < numOfFlats );
    }
    else if ( tonic === 'Cnatural' ) {
      key = cMajor;
    }

  } else {
    let callingBS = document.createElement('li');
    callingBS.innerHTML = `Umm... that key will make people hate you. Try again.`;
    callingBS.className = 'suggestion-list';
    suggestionList = callingBS.parentNode;
    suggestionList.appendChild(callingBS);
  }
}

/* 
============================== Event Listeners ==============================
*/

inputButton.addEventListener( 'click', () => establishKey() );