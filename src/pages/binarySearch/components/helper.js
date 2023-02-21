export default function generateRandArray(size) {
  var arr = []
  var numb = -1;
  for(var i = 0; i < size; i++) {
    numb += Math.floor(Math.random() * 5) + 1
    arr.push(numb)
  }

  return arr
}