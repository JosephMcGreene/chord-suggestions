const noteNames = [
  'Cnatural', 'Csharp',
  'Dflat', 'Dnatural', 'Dsharp',
  'Eflat', 'Enatural',
  'Fnatural', 'Fsharp',
  'Gflat', 'Gnatural', 'Gsharp',
  'Aflat', 'Anatural', 'Asharp',
  'Bflat', 'Bnatural'
];

const sharpKeysMajor = ['Gnatural', 'Dnatural', 'Anatural', 'Enatural', 'Bnatural', 'Fsharp', 'Csharp'];
const flatKeysMajor = ['Fnatural', 'Bflat', 'Eflat', 'Aflat', 'Dflat', 'Gflat'];

const sharpKeysMinor = ['Enatural', 'Bnatural', 'Fsharp', 'Csharp', 'Gsharp', 'Dsharp', 'Asharp'];
const flatKeysMinor = ['Dnatural', 'Gnatural', 'Cnatural', 'Fnatural', 'Bflat', 'Eflat', 'Aflat'];

const cMajorAMinor = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];

const orderOfSharps = ['F', 'C', 'G', 'D', 'A', 'E', 'B'];
const orderOfFlats = ['B', 'E', 'A', 'D', 'G', 'C', 'F'];

const chordInput = document.querySelector('#chordInput');
const inputButton = document.querySelector('#chordInputButton');
const accidentalSelect = document.querySelector('#accidentalSelect');
const qualitySelect = document.querySelector('#qualitySelect');
let chordSuggestions = document.querySelector('#chordSuggestionList');
let key;
let tonic;
let tonicAccidentals;

  /**
   * Returns an array containing the appropriate number of sharps or flats for a given key and what those sharps are.
   * callback in esatblishKey()
   * @param [keysArray]         array of notes to pull from
   * @param [orderOfArray]      array orderOfSharps or orderOfFlats to use to know what sharps/flats to use
   * @param [accidentalHTML]    HTML hex code for the necessary accidental
   * @return  [Array]    an array containing the sharps/flats.
   */
function getKeyAccidentals(keysArray, orderOfArray, accidentalHTML) {
  let numOfAccidentals = keysArray.indexOf(tonic) + 1;
  tonicAccidentals = orderOfArray.filter( i => orderOfArray.indexOf(i) < numOfAccidentals );
  tonicAccidentals.forEach( (val, idx) => tonicAccidentals[idx] = `${val}${accidentalHTML}` );
  return tonicAccidentals;
}

  /**
   * Establishes the key used to suggest chords once the user presses the inputButton, or tells user to input something else.
   * @return  [Array]    an array containing the new key.
   */
function establishKey() {
  // for Major keys
  if ( noteNames.includes(chordInput.value.toUpperCase() + accidentalSelect.value) && qualitySelect.value === 'major' ) {
    tonic = chordInput.value.toUpperCase() + accidentalSelect.value;
    // If the user input is a key with sharps:
    if ( sharpKeysMajor.includes(tonic) ) {
      getKeyAccidentals(sharpKeysMajor, orderOfSharps, '&#9839;');
    } 
    // If the user input is a key with flats:
    else if ( flatKeysMajor.includes(tonic) ) {
      getKeyAccidentals(flatKeysMinor, orderOfFlats, '&#9837;')
    }
    else if ( tonic === 'Cnatural' ) {
      key = cMajorAMinor;
    }
  }

  // for minor keys
  if ( noteNames.includes(chordInput.value.toUpperCase() + accidentalSelect.value) && qualitySelect.value === 'minor' ) {
    let tonic = chordInput.value.toUpperCase() + accidentalSelect.value;
    // If the user input is a key with sharps:
    if ( sharpKeysMinor.includes(tonic) ) {
      getKeyAccidentals(sharpKeysMinor, orderOfSharps, '&#9839;')
    }

    else if ( flatKeysMinor.includes(tonic) ) {
      getKeyAccidentals(flatKeysMinor, orderOfFlats, '&#9837;')
    }

    else if ( tonic === 'Anatural' ) {
      key = cMajorAMinor.sort();
    }
  } 
  
  else {
    let callingBS = document.createElement('li');
    callingBS.innerHTML = `Umm... That key will make people hate you. Try again.`;
    chordSuggestions.appendChild(callingBS);
  }
}

/* 
============================== Event Listeners ==============================
*/

inputButton.addEventListener( 'click', () => {
  establishKey();
});