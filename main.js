// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ["A", "T", "C", "G"];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};
// function factory to make multiple  P. aequor faster
const pAequorFactory = (number, dnaBaseArray) => {
  return {
    specimenNum: number,
    dna: dnaBaseArray,

    mutate() {
      let randomOldBase =
        dnaBaseArray[Math.floor(Math.random() * dnaBaseArray.length)]; //holds rand old base
      let randomNewBase = returnRandBase(); //holds rand new base
      if (randomNewBase === randomOldBase) {
        //if old base is = to new base reassign (which should essentially rerun random function)
        randomNewBase = returnRandBase();
      } else {
        // else if new base doesnot = old base replace old with new
        dnaBaseArray[
          Math.floor(Math.random() * dnaBaseArray.length)
        ] = randomNewBase;
      }
    }, //end of .mutate

    compareDNA(pAequorObject) {
      //pAequorObject.dna(passed in) vs dnaBaseArray(current)
      const intersection = pAequorObject.dna.filter((element, ind) => {
        if (dnaBaseArray.includes(element)) {
          if (dnaBaseArray[ind] === pAequorObject.dna[ind]) {
            return element;
          }
        }
        let commonDna = (intersection.length / 15) * 100;
        console.log(
          `specimen #1 and specimen #2 have ${commonDna}% DNA in common`
        );
      }); //ends .filter
    }, // ends compareDna

    willLikelySurvive() {
      const cOrG = this.dna.filter((el) => el === "C" || el === "G");
      return cOrG.length / this.dna.length >= 0.6;
    }, // ends willLikelySurvive
  }; //ending of what to return
}; //ending of pAequorFactory


const surviving = [];
let idCounter = 1;

while (surviving.length < 30) {
  let newOrg = pAequorFactory(idCounter, mockUpStrand());
  if (newOrg.willLikelySurvive()) {
    surviving.push(newOrg);
  }
  idCounter++;
}

//console.log(surviving)
//console.log(pAequorFactory(3, mockUpStrand()));