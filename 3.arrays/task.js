function compareArrays(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        return false; 
      }
      return arr1.every(function(item, index) {
      return item === arr2[index];
      });
    }

function getUsersNamesInAgeRange(users, gender) {
    const filteredUsers = users.filter((people) => people.gender === gender);
    const ages = filteredUsers.map((people) => people.age);
    const sumOfAges = ages.reduce((total, age) => total + age, 0);
    return sumOfAges / filteredUsers.length;
}