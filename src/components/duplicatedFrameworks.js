export const frameworks = [
  "angular2",
  "vue",
  "react",
  "grunt",
  "phantomjs",
  "ember",
  "babel",
  "ionic",
  "gulp",
  "meteor",
  // "yeoman",
  // "yarn",
  // "nodejs",
  // "bower",
  // "browserify",
];
export const duplicatedFrameworks = [...frameworks, ...frameworks];
export const shuffle = (array) => { // 20 tane dizi alıyor 
  console.log(array)
  let currentIndex = array.length
  let temporaryValue,randomIndex;;
  
// burası bi karıştırıcı rasgele dağıtıyor cartları ikili yer değiştiriyor 
    //console.log(currentIndex,temporaryValue,randomIndex)
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    console.log("currentIndex",currentIndex) // 20
    console.log("randomIndex",randomIndex) // 18
    currentIndex -= 1;  // 19
    temporaryValue = array[currentIndex]; // meteor js 
    //console.log( "temporaryValue",  temporaryValue)
    array[currentIndex] = array[randomIndex];  
    //console.log("array[currentIndex] = array[randomIndex]; ",array[currentIndex] = array[randomIndex] )
    array[randomIndex] = temporaryValue;   
    console.log("array[randomIndex]",array[randomIndex])   
  }
  return array;
};
