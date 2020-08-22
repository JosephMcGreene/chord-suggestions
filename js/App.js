// @ts-nocheck

  /**
   * Uses React to render the chord suggestions derived from establishKey() to the DOM;
   */
function renderSuggestions() {
  const Section = () => {
    return (
      <section>
      <hr></hr>
        <h3>Key: { currentKey.tonic }<button className="round-border box-shadow">Different Starting Chord</button></h3>
  
        <SuggestionList1>
  
        </SuggestionList1>
      </section>
    );
  }
  
  const SuggestionList1 = () => {
    return (
      <ul className="suggestions">
        <li>
          <button className="first-suggestions round-border box-shadow">{ currentKey.subdominant }</button>
        </li>
  
        <li>
          <button className="first-suggestions round-border box-shadow">{ currentKey.dominant }</button>
        </li>
      </ul>
    );
  }
  
  ReactDOM.render(
    <Section />,
    document.querySelector('#chordSuggestionList')
  );
}