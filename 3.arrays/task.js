function compareArrays(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        return false; 
      }
      return arr1.every(function(item, index) {
      return item === arr2[index];
      });
    }

    function getUsersNamesInAgeRange(users, gender) {
      if (totalAge != 0){
        return 0;
      }
      const filteredUsers = users.filter((user) => user.gender === gender);
      const totalAge = filteredUsers.map((user) => user.age).reduce((prev, curr) => prev + curr, 0);
      const averageAge = totalAge / filteredUsers.length;
      return averageAge;
    }