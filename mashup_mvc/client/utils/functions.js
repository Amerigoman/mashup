export function cutString(text, maxStrLength){
  if(text.length > maxStrLength) {
    let prettyCut = text.slice(0, maxStrLength);
    prettyCut = prettyCut.slice(0, prettyCut.lastIndexOf(' ') - prettyCut.length);
    
    let prettyCutLength = prettyCut.length;
    
    if (prettyCut.lastIndexOf('.') === prettyCutLength - 1) {
      prettyCut = prettyCut.slice(0, -1);
    } else if (prettyCut.lastIndexOf(',') === prettyCutLength - 1) {
      prettyCut = prettyCut.slice(0, -1);
    }

    return prettyCut;
  }
  
  return text;
}
