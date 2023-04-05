function compareArrays(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        return false; 
      }
      return arr1.every(function(item, index) {
      return item === arr2[index];
      });
    }

 function getUsersNamesInAgeRange(users, gender) {
  let result = users.filter((user) => user.gender === gender).reduce((acc, user) => acc + user.age, 0);
  return result;
    }