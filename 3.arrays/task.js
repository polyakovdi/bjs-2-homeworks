function compareArrays(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        return false; 
      }
      return arr1.every(function(item, index) {
      return item === arr2[index];
      });
    }
    
 function getUsersNamesInAgeRange(users, gender) {
    const result = arr.filter(user => user.gender === gender).map(user => user.age).reduce((acc, cur) => acc + cur)
    return result
    }