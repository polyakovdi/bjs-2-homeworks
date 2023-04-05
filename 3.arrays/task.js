function compareArrays(arr1, arr2) {
    return arr1.every((element, index) => element === arr2[index]); 
}

function getUsersNamesInAgeRange(users, gender) {
    const filteredUsers = users.filter(user => user.gender === gender);
    const totalAge = filteredUsers.reduce((sum, { age }) => sum + age, 0);
    const averageAge = totalAge / filteredUsers.length;
    return averageAge;
}