// Arrays for use in establishKey()
// const noteNames = [
//            'Cnatural', 'Csharp',
//   'Dflat', 'Dnatural', 'Dsharp',
//   'Eflat', 'Enatural',
//            'Fnatural', 'Fsharp',
//   'Gflat', 'Gnatural', 'Gsharp',
//   'Aflat', 'Anatural', 'Asharp',
//   'Bflat', 'Bnatural'
// ];
const sharpKeysMajor = ['Cnatural', 'Gnatural', 'Dnatural', 'Anatural', 'Enatural', 'Bnatural', 'Fsharp', 'Csharp'];
const flatKeysMajor = ['Cnatural', 'Fnatural', 'Bflat', 'Eflat', 'Aflat', 'Dflat', 'Gflat'];

const sharpKeysMinor = ['Anatural', 'Enatural', 'Bnatural', 'Fsharp', 'Csharp', 'Gsharp', 'Dsharp', 'Asharp'];
const flatKeysMinor = ['Anatural', 'Dnatural', 'Gnatural', 'Cnatural', 'Fnatural', 'Bflat', 'Eflat', 'Aflat'];

let scaleNotes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];

const orderOfSharps = ['F&#9839;', 'C&#9839;', 'G&#9839;', 'D&#9839;', 'A&#9839;', 'E&#9839;', 'B&#9839;'];
const orderOfFlats = ['B&#9837;', 'E&#9837;', 'A&#9837;', 'D&#9837;', 'G&#9837;', 'C&#9837;', 'F&#9837;'];

// DOM Selectors
const chordInput = document.querySelector('#chordInput');
const inputButton = document.querySelector('#chordInputButton');
const accidentalSelect = document.querySelector('#accidentalSelect');
const qualitySelect = document.querySelector('#qualitySelect');
let chordSuggestionsList = document.querySelector('#chordSuggestionList');
let keyAnnounce = document.createElement('h2');
let chordSuggest1 = document.createElement('h3');
let li = document.querySelector('li');
let startOtherButton = document.createElement('button');
let suggestOtherButton = document.createElement('button');
// To be defined later
let tonic;
let tonicAccidentals;
let key;
let currentKey;

  /**
   * Uses array from getKeyAccidentals() to finish constructing an array containing the notes necessary to return a key in establishKey();
   * @return  [Array]    an array containing the new key.
   */
function finishKey() {
  while ( chordInput.value.toUpperCase() !== scaleNotes[0] ) {
    let shiftNote = scaleNotes.shift(); scaleNotes.push(shiftNote);
  }
  // This loop finds the appropriate note(s) to replace in scaleNotes[] from the corresponding note(s) in tonicAccidentals[].
  for (let i = 0; i < tonicAccidentals.length; i++) {
  scaleNotes.splice( scaleNotes.indexOf(tonicAccidentals[i].charAt(0)) , 1, tonicAccidentals[i]);
  }
  if (qualitySelect.value === 'Major') {
    for (let i = 0; i < scaleNotes.length; i++) {
      if (i === 0 || i === 3 || i === 4) {
        scaleNotes.splice(i, 1, scaleNotes[i] + " Major");
      } else if (i === 1 || i === 2 || i === 5) {
        scaleNotes.splice(i, 1, scaleNotes[i] + " minor");
      } else if (i === 6) {
        scaleNotes.splice(i, 1, scaleNotes[i] + " diminished");
      }
    }
  } 
  else if (qualitySelect.value === 'minor') {
    for (let i = 0; i < scaleNotes.length; i++) {
      if (i === 2 || i === 4 || i === 5) {
        scaleNotes.splice(i, 1, scaleNotes[i] + " Major");
      } else if (i === 0 || i === 3 || i === 6) {
        scaleNotes.splice(i, 1, scaleNotes[i] + " minor");
      } else if (i === 1) {
        scaleNotes.splice(i, 1, scaleNotes[i] + " diminished");
      }
    }
  }
  return scaleNotes;
}

  /**
   * A logic statement checking to make sure the user inputs a letter A through G. Used in error messages in establishKey()
   * @return  Boolean    whether the user's input is a music note or not.
   */
function isAMusicNote() {
  if ( chordInput.value.toUpperCase() !== 'A' && chordInput.value.toUpperCase() !== 'B' && chordInput.value.toUpperCase() !== 'C' && chordInput.value.toUpperCase() !== 'D' && chordInput.value.toUpperCase() !== 'E' && chordInput.value.toUpperCase() !== 'F' && chordInput.value.toUpperCase() !== 'G' ) {
    return true;
  } else { return false; }
}

  /**
   * Establishes the key used to suggest chords once the user presses --inputButton--, or tells user to input something else.
   * Uses getKeyAccidentals(), finishKey(), and isAMusicNote().
   * @return  [Array]    an array containing the new key.
   */
function establishKey(keysArray1, keysArray2) {
  tonic = chordInput.value.toUpperCase() + accidentalSelect.value;
  // If the user input is a key with sharps:
  if ( keysArray1.includes(tonic) ) {
    let numOfAccidentals = keysArray1.indexOf(tonic);
    tonicAccidentals = orderOfSharps.filter( i => orderOfSharps.indexOf(i) < numOfAccidentals );
    finishKey();
    key = scaleNotes;
  } 
  // If the user input is a key with flats:
  else if ( keysArray2.includes(tonic) ) {
    let numOfAccidentals = keysArray2.indexOf(tonic);
    tonicAccidentals = orderOfFlats.filter( i => orderOfFlats.indexOf(i) < numOfAccidentals );
    finishKey();
    key = scaleNotes;
  }

  currentKey = new Key(key[0], key[1], key[2], key[3], key[4], key[5], key[6]);
  return currentKey;
}

/* 
============================== Event Listeners ==============================
*/

inputButton.addEventListener( 'click', () => {
    scaleNotes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
    // for a sharps key:
    if ( sharpKeysMajor.concat(flatKeysMajor).includes(chordInput.value.toUpperCase() + accidentalSelect.value) && qualitySelect.value.toLowerCase() === 'major' ) {
      establishKey(sharpKeysMajor, flatKeysMajor);
    }
    // for a flats key
    else if ( sharpKeysMajor.concat(flatKeysMajor).includes(chordInput.value.toUpperCase() + accidentalSelect.value) && qualitySelect.value.toLowerCase() === 'minor' ) {
      establishKey(sharpKeysMinor, flatKeysMinor);
    }
    // Errors
    else if ( isAMusicNote() ) {
      let callingBS = document.createElement('li');
      callingBS.innerHTML = `That letter is not used in music. Try a letter A-G.`;
      chordSuggestionsList.appendChild(callingBS);
    }
    else if ( ! sharpKeysMajor.concat(flatKeysMajor).includes(chordInput.value.toUpperCase() + accidentalSelect.value) ) {
      let callingBS = document.createElement('li');
      callingBS.innerHTML = `Umm... That key will make people hate you. Make sure you chose the right accidental (&#9839;, &#9838;, or &#9837;).`;
      chordSuggestionsList.appendChild(callingBS);
    }
  inputButton.textContent = "Start Over";

  keyAnnounce.innerHTML = `Start: <strong>${key[0]}</strong>`;
  startOtherButton.innerHTML = `Start with something else`;

  chordSuggest1.innerHTML = `Then: <button>${key[3]}</button> or <button>${key[4]}</button>`;
  suggestOtherButton.innerHTML = `What can I do instead?`;

  chordSuggestionsList.appendChild(keyAnnounce);
  keyAnnounce.appendChild(startOtherButton);
  chordSuggestionsList.appendChild(chordSuggest1);
  chordSuggest1.appendChild(suggestOtherButton);
});