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

  const library = new Library("Библиотека им. Ленина");

library.addBook(new Book("Толстой", "Война и мир", 1869, 1225));
library.addBook(new Book("Достоевский", "Преступление и наказание", 1866, 430));
library.addBook(new Magazine("National Geographic", 2021, 120));
library.addBook(new Magazine("Forbes", 2021, 60));

console.log(library.findBookBy("name", "Война и мир")); 
console.log(library.findBookBy("releaseDate", 1919)); 

const book = new Book("Чехов", "Анна на шее", 1895, 300);
library.addBook(book);

const issuedBook = library.giveBookByName("Анна на шее");
console.log(issuedBook); 

issuedBook.state = 20;
console.log(issuedBook.state); 

issuedBook.fix();
console.log(issuedBook.state); 

library.addBook(issuedBook);
console.log(library.findBookBy("name", "Анна на шее")); 

class Student {
  constructor(name) {
    this.name = name;
    this.marks = {};
  }

  addMark(mark, subject) {
    if (mark < 2 || mark > 5) {
      console.log("Оценка должна быть от 2 до 5");
      return;
    }

    if (!this.marks[subject]) {
      this.marks[subject] = [];
    }

    this.marks[subject].push(mark);
  }

  getAverageBySubject(subject) {
    if (!this.marks[subject]) {
      return 0;
    }

    const sum = this.marks[subject].reduce((acc, cur) => acc + cur);
    return sum / this.marks[subject].length;
  }

  getAverage() {
    const subjects = Object.keys(this.marks);

    if (subjects.length === 0) {
      return 0;
    }

    const sum = subjects.reduce((acc, subject) => {
      return acc + this.getAverageBySubject(subject);
    }, 0);

    return sum / subjects.length;
  }
}