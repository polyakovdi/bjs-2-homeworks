function compareArrays(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        return false; // если массивы разной длины, они уже не могут быть одинаковыми
      }
      // сравниваем каждый элемент arr1 с соответствующим элементом arr2
      return arr1.every(function(item, index) {
      return item === arr2[index];
      });
    }

function getUsersNamesInAgeRange(users, gender) {
    const filteredUsers = users.filter((user) => user.gender === gender);
    const ages = filteredUsers.map((user) => user.age);
    const sumOfAges = ages.reduce((total, age) => total + age, 0);
    return sumOfAges / filteredUsers.length;
}