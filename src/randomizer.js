const randomIndex = (array) => {
   const index = Math.floor(Math.random() * array.length);
   return array[index]
}

//geting 3 random keywords for the movieApi 
const randomThree = (array) => {
   let one = randomIndex(array);
   let two = randomIndex(array);
   let three = randomIndex(array);
   if (one === two || one === three) { one = randomIndex(array) }
   if (two === one || two === three) { two = randomIndex(array) }
   if (three === two || three === one) { three = randomIndex(array) }
   const newArray = []
   newArray.push(one, two, three)
   return newArray
}

export default randomThree;