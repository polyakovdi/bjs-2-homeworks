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
    const people = [];
    const filteredUsers = users.filter((people) => people.gender === gender);
    const ages = filteredUsers.map((people) => people.age);
    const sumOfAges = ages.reduce((total, age) => total + age, 0);
    return sumOfAges / filteredUsers.length;
}
console.log(getUsersNamesInAgeRange(people, "мужской")); // 32
console.log(getUsersNamesInAgeRange(people, "женский")); // 27.4
console.log(getUsersNamesInAgeRange([], "женский")); // 0
console.log(getUsersNamesInAgeRange(people, "инопланетянин")); // 0