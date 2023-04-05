function Student(name, gender, age) {
    this.name = name;
    this.gender = gender;
    this.age = age;
    this.subject = null;
    this.marks = [];
  }
  
  Student.prototype.setSubject = function (subjectName) {
    this.subject = subjectName;
  };
  
  Student.prototype.addMarks = function (...marksToAdd) {
    if (!this.marks) {
      console.log("Student is excluded!");
      return;
    }
    this.marks.push(...marksToAdd);
  };
  
  Student.prototype.getAverage = function () {
    if (!this.marks || this.marks.length === 0) {
      return 0;
    }
    const sum = this.marks.reduce((acc, mark) => acc + mark, 0);
    return sum / this.marks.length;
  };
  
  Student.prototype.exclude = function (reason) {
    delete this.subject;
    delete this.marks;
    this.excluded = reason;
  };
  
  const student1 = new Student("Василиса", "женский", 19);
  const student2 = new Student("АртЁм", "мужской", 25);
  
  student1.setSubject("Algebra");
  student1.addMarks(4, 5, 4, 5);
  console.log(student1.getAverage());
  
  student2.exclude("Geometry");
  console.log(student2.excluded);
