class PrintEditionItem {
    constructor(name, releaseDate, pagesCount) {
      this.name = name;
      this.releaseDate = releaseDate;
      this.pagesCount = pagesCount;
      this._state = 100;
      this.type = null;
    }
    
    get state() {
      return this._state;
    }
    
    set state(newState) {
      if (newState < 0) {
        this._state = 0;
      } else if (newState > 100) {
        this._state = 100;
      } else {
        this._state = newState;
      }
    }
    
    fix() {
      this.state *= 1.5;
    }
  }

  class Magazine extends PrintEditionItem {
    constructor(name, releaseDate, pagesCount) {
      super(name, releaseDate, pagesCount);
      this.type = 'magazine';
    }
  }

  class Book extends PrintEditionItem {
    constructor(author, name, releaseDate, pagesCount) {
      super(name, releaseDate, pagesCount);
      this.type = 'book';
      this.author = author;
    }
  }

  class NovelBook extends Book {
    constructor(author, name, releaseDate, pagesCount) {
      super(author, name, releaseDate, pagesCount);
      this.type = 'novel';
    }
  }

  class FantasticBook extends Book {
    constructor(author, name, releaseDate, pagesCount) {
      super(author, name, releaseDate, pagesCount);
      this.type = 'fantastic';
    }
  }

  class DetectiveBook extends Book {
    constructor(author, name, releaseDate, pagesCount) {
      super(author, name, releaseDate, pagesCount);
      this.type = 'detective';
    }
  }

  class Library {
    constructor(name) {
      this.name = name;
      this.books = [];
    }
  
    addBook(book) {
      if (book.state > 30) {
        this.books.push(book);
      }
    }
  
    findBookBy(type, value) {
      for (let i = 0; i < this.books.length; i++) {
        if (this.books[i][type] === value) {
          return this.books[i];
        }
      }
      return null;
    }
  
    giveBookByName(bookName) {
      for (let i = 0; i < this.books.length; i++) {
        if (this.books[i].name === bookName) {
          const book = this.books[i];
          this.books.splice(i, 1);
          return book;
        }
      }
      return null;
    }
  }

let library = new Library('Городская библиотека') 

library.addBook(new Book('1984', 'Джордж Оруэлл', 1949, 50, 'Огонек'));
library.addBook(new Book('Преступление и наказание', 'Федор Достоевский', 1866, 35, 'ЭКСМО'));
library.addBook(new Magazine('National Geographic', 'National Geographic', 2021, 90, 4));
library.addBook(new Magazine('Forbes', 'Steve Forbes', 2021, 70, 6));

let book1919 = library.findBookBy('year', 1919);
if (!book1919) {
  book1919 = new Book('Новая книга', 'Неизвестный автор', 1919, 70, 'Неизвестное издание');
  library.addBook(book1919);
}

let book = library.giveBookByName('1984');

book.state = 20;
book.state = 50;
library.addBook(book); 

// реализация класса StudentReport
class StudentReport {
    constructor(name) {
      this.name = name;
      this.marks = {};
    }
  
    addMark(subject, mark) {
      if (mark < 2 || mark > 5) {
        console.log(`Оценка должна быть в диапазоне от 2 до 5! Ошибка при добавлении оценки ${mark} для предмета ${subject} студента ${this.name}`);
        return;
      }
      if (!this.marks.hasOwnProperty(subject)) {
        this.marks[subject] = [];
      }
      this.marks[subject].push(mark);
      console.log(`Оценка ${mark} для предмета ${subject} студента ${this.name} успешно добавлена!`);
    }
  
    getAverageBySubject(subject) {
      if (!this.marks.hasOwnProperty(subject)) {
        console.log(`Предмет ${subject} отсутствует в журнале студента ${this.name}`);
        return 0;
      }
      let sum = this.marks[subject].reduce((acc, mark) => acc + mark);
      let average = sum / this.marks[subject].length;
      return average;
    }
  
    getAverage() {
      let subjects = Object.keys(this.marks);
      if (subjects.length === 0) {
        console.log(`Журнал студента ${this.name} пуст!`);
        return 0;
      }
      let sum = subjects.reduce((acc, subject) => acc + this.getAverageBySubject(subject), 0);
      let average = sum / subjects.length;
      return average;
    }
  }
  
  // создаем журнал студента и добавляем оценки по предметам
  let student = new StudentReport('Иван Иванов');
  student.addMark('Математика', 4);
  student.addMark('Физика', 5);
  student.addMark('Математика', 3);
  student.addMark('Информатика', 2);
  student.addMark('Физика', 3);
  student.addMark('Астрономия', 5);
  
  // получаем среднюю оценку по предмету
  console.log(`Средняя оценка по предмету "Физика" у студента ${student.name}: ${student.getAverageBySubject('Физика')}`);
  
  // получаем общую среднюю оценку
  console.log(`Общая средняя оценка студента ${student.name}: ${student.getAverage()}`);