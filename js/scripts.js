// @ts-nocheck
const noteNames = [
  'C&#9837;', 'C', 'C&#9839;',
  'D&#9837;', 'D', 'D&#9839;',
  'E&#9837;', 'E', 'E&#9839;',
  'F&#9837;', 'F', 'F&#9839;',
  'G&#9837;', 'G', 'G&#9839;',
  'A&#9837;', 'A', 'A&#9837;',
  'B&#9837;', 'B', 'B&#9839;'];

const chordInput = document.querySelector('#chordInput');
const inputButton = document.querySelector('#chordInputButton');
const accidentalSelect = document.querySelector('#accidentalSelect')
const typeSelect = document.querySelector('#typeSelect');
let ul = document.querySelector('#chordSuggestionList');


inputButton.addEventListener('click', () => {
  if ( noteNames.includes(chordInput.value.toUpperCase()) ) {
    while ( (i = noteNames.shift()) !== chordInput.value.toUpperCase()) {
      noteNames.push(i);
      if (chordInput.value.toUpperCase() === noteNames[0]) {
        break;
      }
    }
  console.log(noteNames)
  });