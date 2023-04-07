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

  const library = new Library('Библиотека им. Пушкина');

const book1 = new Book('Гарри Поттер и философский камень', 'Роулинг', 1997, 350, 40);
const book2 = new Book('Мастер и Маргарита', 'Булгаков', 1967, 420, 50);
const journal = new Magazine('National Geographic', 2021, 4, 25);

library.addBook(book1);
library.addBook(book2);
library.addBook(journal);

const foundBook = library.findBookBy('year', 1919);
if (!foundBook) {
  const newBook = new Book('Новая книга', 'Автор', 1919, 200, 80);
  library.addBook(newBook);
}

const givenBook = library.giveBookByName('Мастер и Маргарита');
givenBook.markAsDamaged();
givenBook.repair();
library.addBook(givenBook); // книга успешно добавлена обратно в библиотеку

console.log(library.books); 
// [Book, Book, Magazine, Book] - журнал не удовлетворяет условию метода addBook, выдача и возврат повредившейся книги прошли успешно, затем книга была успешно добавлена обратно в библиотеку.