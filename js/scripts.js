// ========== Arrays for use in establishKey()
const sharpKeysMajor = ['Cnatural', 'Gnatural', 'Dnatural', 'Anatural', 'Enatural', 'Bnatural', 'Fsharp', 'Csharp'];
const flatKeysMajor = ['Cnatural', 'Fnatural', 'Bflat', 'Eflat', 'Aflat', 'Dflat', 'Gflat'];

const sharpKeysMinor = ['Anatural', 'Enatural', 'Bnatural', 'Fsharp', 'Csharp', 'Gsharp', 'Dsharp', 'Asharp'];
const flatKeysMinor = ['Anatural', 'Dnatural', 'Gnatural', 'Cnatural', 'Fnatural', 'Bflat', 'Eflat', 'Aflat'];

let scaleNotes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];

const orderOfSharps = ['F sharp', 'C sharp', 'G sharp', 'D sharp', 'A sharp', 'E sharp', 'B sharp'];
const orderOfFlats = ['B flat', 'E flat', 'A flat', 'D flat', 'G flat', 'C flat', 'F flat'];

// ========== DOM Selectors
const chordInput = document.querySelector('#chordInput');
const suggestButton1 = document.querySelector('#suggestButton1');
const accidentalSelect = document.querySelector('#accidentalSelect');
const qualitySelect = document.querySelector('#qualitySelect');
let chordSuggestionsList = document.querySelector('#chordSuggestionList');
const main = document.querySelector('main');

// ========== To be defined later on
let tonic; /** Will be the note put in by the user */
let tonicAccidentals; /** Will be an array containing the letter names of the accidentals in the user's key */
let key;  /** Will be an array of notes containing the notes of the key put in by the user */
let currentKey; /** Will be an object in the Key class whose properties are derived from key[] */

  /**
   * Uses tonicAccidentals[] made in establishKey() to finish constructing an array containing the notes necessary to return a key in establishKey();
   * @return  [Array]    an array containing the new key.
   */
function finishKey() {
  // This loop rearranges the notes in the scale to make tonic index 0 for Key instantation purposes;
  while ( chordInput.value.toUpperCase() !== scaleNotes[0] ) {
    let shiftNote = scaleNotes.shift();
    scaleNotes.push(shiftNote);
  }
  // This loop finds the appropriate note(s) to replace in scaleNotes[] from their corresponding note(s) in tonicAccidentals[];
  for (let i = 0; i < tonicAccidentals.length; i++) {
  scaleNotes.splice( scaleNotes.indexOf(tonicAccidentals[i].charAt(0)), 1, tonicAccidentals[i] );
  }
  // The following loops add the appropriate quality to the name of the chords, whether it be in Major or minor;
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
      if (i === 2 || i === 4 || i === 5 || i === 6) {
        scaleNotes.splice(i, 1, scaleNotes[i] + " Major");
      } else if (i === 0 || i === 3 ) {
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
  if ( 
    chordInput.value.toUpperCase() !== 'A' &&
    chordInput.value.toUpperCase() !== 'B' && 
    chordInput.value.toUpperCase() !== 'C' && 
    chordInput.value.toUpperCase() !== 'D' && 
    chordInput.value.toUpperCase() !== 'E' && 
    chordInput.value.toUpperCase() !== 'F' && 
    chordInput.value.toUpperCase() !== 'G'
    ) {
    return true;
  } else { return false; }
}

  /**
   * A logic statement checking for 'major' or 'minor' in qualitySelect.value
   * @param   majorMinor String containing 'major' or 'minor', aka the qualitySelect.value     
   * @return  Boolean    whether the user's input is major or minor.
   */
function isMajorOrMinor(majorMinor) {
  if ( sharpKeysMajor.concat(flatKeysMajor).includes(chordInput.value.toUpperCase() + accidentalSelect.value) && qualitySelect.value.toLowerCase() === majorMinor ) {
    return true; } 
  else { return false };
}

  /**
   * Establishes the key used to suggest chords once the user presses --suggestButton1--, or tells user to input something else.
   * Uses getKeyAccidentals(), finishKey(), and isAMusicNote().
   * @param   keysArray1  sharpKeysMajor[] or sharpKeysMinor[]
   * @param   keysArray2  flatKeysMajor[] or flatKeysMinor[]
   * @return  [Array]     an array containing the new key.
   */
function establishKey(keysArray1, keysArray2) {
  tonic = chordInput.value.toUpperCase() + accidentalSelect.value;
  // If the user input is a key with sharps:
  if ( keysArray1.includes(tonic) ) {
    let numOfAccidentals = keysArray1.indexOf(tonic);
    // This filter makes tonicAccidentals[] a list, in order of Sharps/Flats, of the accidentals the tonic key contains;
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
suggestButton1.addEventListener('click', () => {
  scaleNotes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
  // for major keys:
  if ( isMajorOrMinor('major') ) {
    establishKey(sharpKeysMajor, flatKeysMajor);

    let hr = document.createElement('hr');
    let chordSuggestion1 = document.createElement('button');
    let chordSuggestion2 = document.createElement('button');
    chordSuggestion1.className = "round-border box-shadow suggestions-button";
    chordSuggestion2.className = "round-border box-shadow suggestions-button";
    chordSuggestion1.innerHTML = `${currentKey.subdominant}`;
    chordSuggestion2.innerHTML = `${currentKey.dominant}`;
    hr = hr + document.querySelector('body').insertBefore(hr, main);
    chordSuggestionsList.appendChild(chordSuggestion1);
    chordSuggestionsList.appendChild(chordSuggestion2);

  }
  // for minor keys:
  else if ( isMajorOrMinor('minor') ) {
    establishKey(sharpKeysMinor, flatKeysMinor);

    console.log(currentKey);

  }
  // Errors
  else if ( isAMusicNote() ) {
    let callingBS = document.createElement('p');
    callingBS.innerHTML = `That letter is not used in music. Try a letter A-G.`;
    chordSuggestionsList.appendChild(callingBS);
    chordSuggestionsList.removeChild(callingBS.previousSibling);
  }
  else if ( ! sharpKeysMajor.concat(flatKeysMajor).includes(chordInput.value.toUpperCase() + accidentalSelect.value) ) {
    let callingBS = document.createElement('p');
    callingBS.innerHTML = `Umm... That key will make people hate you. Make sure you chose the right accidental (&#9839;, &#9838;, or &#9837;).`;
    chordSuggestionsList.appendChild(callingBS);
    chordSuggestionsList.removeChild(callingBS.previousSibling);
  }
});