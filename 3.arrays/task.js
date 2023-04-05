function compareArrays(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        return false; 
      }
      return arr1.every(function(item, index) {
      return item === arr2[index];
      });
    }
    
 function getUsersNamesInAgeRange(users, gender) {
    const filteredUsers = users.filter(user => user.gender === gender);
    const ageArray = filteredUsers.map(user => user.age);
    const sumOfAges = ageArray.reduce((acc, cur) => acc + cur);
    return sumOfAges / filteredUsers.length;
    }