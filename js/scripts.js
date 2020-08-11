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

let scaleNotes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];

const orderOfSharps = ['F&#9839;', 'C&#9839;', 'G&#9839;', 'D&#9839;', 'A&#9839;', 'E&#9839;', 'B&#9839;'];
const orderOfFlats = ['B&#9837;', 'E&#9837;', 'A&#9837;', 'D&#9837;', 'G&#9837;', 'C&#9837;', 'F&#9837;'];

const chordInput = document.querySelector('#chordInput');
const inputButton = document.querySelector('#chordInputButton');
const accidentalSelect = document.querySelector('#accidentalSelect');
const qualitySelect = document.querySelector('#qualitySelect');
let chordSuggestions = document.querySelector('#chordSuggestionList');
let key;
let tonic;
let tonicAccidentals;

  /**
   * Returns an array containing the appropriate number of sharps or flats for a given key and what those sharps or flats are.
   * callback in esatblishKey()
   * @param [keysArray]         array of notes to pull from
   * @param [orderOfArray]      array orderOfSharps or orderOfFlats to use to know what sharps/flats to use
   * @return  [Array]    an array containing the sharps/flats.
   */
function getKeyAccidentals(keysArray, orderOfArray) {
  let numOfAccidentals = keysArray.indexOf(tonic) + 1;
  tonicAccidentals = orderOfArray.filter( i => orderOfArray.indexOf(i) < numOfAccidentals );
  return tonicAccidentals;
}

  /**
   * Uses array from getKeyAccidentals() to finish constructing an array containing the notes necessary to return a key in establishKey();
   * @return  [Array]    an array containing the new key.
   */
function finishKey() {
  while ( chordInput.value.toUpperCase() !== scaleNotes[0] ) {
    let shiftNote = scaleNotes.shift();
    scaleNotes.push(shiftNote);
  }
  // This loop finds the appropriate note(s) to replace in scaleNotes[] from the corresponding note(s) in tonicAccidentals[].
  for ( let i = 0; i < tonicAccidentals.length; i++ ) {
  scaleNotes.splice( scaleNotes.indexOf(tonicAccidentals[i].charAt(0)) , 1, tonicAccidentals[i]);
  }
  return scaleNotes;
}

  /**
   * A logic statement checking to make sure the user inputs a letter A through G
   * @return  Boolean    whether the user's input is a music note or not.
   */
function notAMusicNote() {
  if ( chordInput.value.toUpperCase() !== 'A' && chordInput.value.toUpperCase() !== 'B' && chordInput.value.toUpperCase() !== 'C' && chordInput.value.toUpperCase() !== 'D' && chordInput.value.toUpperCase() !== 'E' && chordInput.value.toUpperCase() !== 'F' && chordInput.value.toUpperCase() !== 'G' ) {
    return true;
  } else { return false; }
}

  /**
   * Establishes the key used to suggest chords once the user presses --inputButton--, or tells user to input something else.
   * Uses both getKeyAccidentals() and finishKey().
   * @return  [Array]    an array containing the new key.
   */
function establishKey() {
  // for Major keys
  if ( noteNames.includes(chordInput.value.toUpperCase() + accidentalSelect.value) && qualitySelect.value.toLowerCase() === 'major' ) {
    tonic = chordInput.value.toUpperCase() + accidentalSelect.value;
    // If the user input is a key with sharps:
    if ( sharpKeysMajor.includes(tonic) ) {
      getKeyAccidentals(sharpKeysMajor, orderOfSharps);
      finishKey();
      key = scaleNotes;
    } 
    // If the user input is a key with flats:
    else if ( flatKeysMajor.includes(tonic) ) {
      getKeyAccidentals(flatKeysMajor, orderOfFlats);
      finishKey();
      key = scaleNotes;
    }
    else if ( tonic === 'Cnatural' ) {
      key = scaleNotes;
    }
  }
  // for minor keys
  if ( noteNames.includes(chordInput.value.toUpperCase() + accidentalSelect.value) && qualitySelect.value.toLowerCase() === 'minor' ) {
    tonic = chordInput.value.toUpperCase() + accidentalSelect.value;
    // If the user input is a key with sharps:
    if ( sharpKeysMinor.includes(tonic) ) {
      getKeyAccidentals(sharpKeysMinor, orderOfSharps);
      finishKey();
      key = scaleNotes;
    }
    // If the user input is a key with flats:
    else if ( flatKeysMinor.includes(tonic) ) {
      getKeyAccidentals(flatKeysMinor, orderOfFlats);
      finishKey();
      key = scaleNotes;
    }

    else if ( tonic === 'Anatural' ) {
      key = scaleNotes.sort();
    }
  }
  // Errors
  else if ( notAMusicNote() ) {
    let callingBS = document.createElement('li');
    callingBS.innerHTML = `That letter is not used in music. Try a letter A-G.`;
    chordSuggestions.appendChild(callingBS);
  }
  else if ( ! noteNames.includes(chordInput.value.toUpperCase() + accidentalSelect.value) ) {
    let callingBS = document.createElement('li');
    callingBS.innerHTML = `Umm... That key will make people hate you. Try again.`;
    chordSuggestions.appendChild(callingBS);
  }
}

/* 
============================== Event Listeners ==============================
*/

inputButton.addEventListener( 'click', () => {
  if ( scaleNotes === ['C', 'D', 'E', 'F', 'G', 'A', 'B'] ) {
    establishKey();
  }
  else if ( scaleNotes !== ['C', 'D', 'E', 'F', 'G', 'A', 'B'] ) {
    scaleNotes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
    establishKey();
  }

  let keyAnnounce = document.createElement('h2');
  let chordSuggest = document.createElement('h2');
  let startOtherButton = document.createElement('button');
  let suggestOtherButton = document.createElement('button');

  keyAnnounce.innerHTML = `Well, start with <strong>${chordInput.value.toUpperCase()} ${qualitySelect.value}</strong>`;
  startOtherButton.innerHTML = `Start on a different Chord`;
  chordSuggest.innerHTML = `then try ${key[3]} or ${key[4]}`;
  suggestOtherButton.innerHTML = `Try something different`;

  chordSuggestions.appendChild(keyAnnounce);
  keyAnnounce.appendChild(startOtherButton);
  chordSuggestions.appendChild(chordSuggest);
  chordSuggest.appendChild(suggestOtherButton);
});

