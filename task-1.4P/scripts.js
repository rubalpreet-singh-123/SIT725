function changeText(){
  const texts = ["Text 1", "Text 2", "Text 3", "Text 4", "Text 5"];
  const index = Math.floor(Math.random() * texts.length);
  document.getElementById("heading").innerHTML = texts[index];
}
