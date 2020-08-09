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

const sharpKeys = [0, 'Gnatural', 'Dnatural', 'Anatural', 'Enatural', 'Bnatural', 'Fsharp', 'Csharp'];
const flatKeys = [0, 'Fnatural', 'Bflat', 'Eflat', 'Aflat', 'Dflat', 'Gflat'];
const cMajor = [0, 'C', 'D', 'E', 'F', 'G', 'A', 'B'];

const orderOfSharps = [0, 'F', 'C', 'G', 'D', 'A', 'E', 'B'];
const orderOfFlats = [0, 'B', 'E', 'A', 'D', 'G', 'C', 'F'];

const accidentals = ['sharp', 'natural', 'flat'];
const accidentalsHTML = ['&#9839;', '&#9838;', '&#9837;']

const chordInput = document.querySelector('#chordInput');
const inputButton = document.querySelector('#chordInputButton');
const accidentalSelect = document.querySelector('#accidentalSelect');
const qualitySelect = document.querySelector('#qualitySelect');
let ul = document.querySelector('#chordSuggestionList');

    /**
     * Establishes the key used to suggest chords once the user presses the inputButton. Two stages: (1)rearrange noteNames and noteNamesHTML then (2)construct a new Key to use to suggest chords.
     * @return  [Array]    an array containing the new key.
     */

function establishKey() {
  // Stage 1:
  if ( noteNames.includes(chordInput.value.toUpperCase() + accidentalSelect.value) ) {
    let tonic = chordInput.value.toUpperCase() + accidentalSelect.value;
    let key;

    if ( sharpKeys.includes(tonic) ) {
      let numOfSharps = sharpKeys.indexOf(tonic); /** 1 for Gnatural, 2 for Dnatural, etc. */
      let tonicSharps = orderOfSharps.filter( (i) => orderOfSharps.indexOf(i) <= numOfSharps );
      
      

      // key = [];
    } 

    // else if ( flatKeys.includes(tonic) ) {

    // }
    // else if ( tonic === 'Cnatural' ) {
    //   key = cMajor;
    // }

    // }
  }

  // Stage 2:

  // let keyTonicList = document.createElement('li');
  // keyTonicList.innerHTML = ``;
  // keyTonicList.parentNode = ul;
  // ul.appendChild(keyTonicList);

  // console.log(noteNames);
  // // console.log(keyTonicList);
  // return key;
}

/* 
============================== Event Listeners ==============================
*/

inputButton.addEventListener( 'click', () => establishKey() );