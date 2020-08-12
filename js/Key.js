class Key {
  constructor(tonic, supertonic, mediant, subdominant, dominant, submediant, leadingTone) {
    this.tonic = tonic,
    this.supertonic = supertonic,
    this.mediant = mediant,
    this.subdominant = subdominant,
    this.dominant = dominant,
    this.dominantSeventh = dominant + '7',
    this.submediant = submediant,
    this.leadingTone = leadingTone
  }
};
