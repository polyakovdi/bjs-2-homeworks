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

  // создаем библиотеку
let library = new Library('Городская библиотека');

// добавляем книги и журналы
library.addBook(new Book('1984', 'Джордж Оруэлл', 1949, 50, 'Огонек'));
library.addBook(new Book('Преступление и наказание', 'Федор Достоевский', 1866, 35, 'ЭКСМО'));
library.addBook(new Magazine('National Geographic', 'National Geographic', 2021, 90, 4));
library.addBook(new Magazine('Forbes', 'Steve Forbes', 2021, 70, 6));

// находим книгу изданную в 1919 году
let book1919 = library.findBookBy('year', 1919);
if (!book1919) {
  book1919 = new Book('Новая книга', 'Неизвестный автор', 1919, 70, 'Неизвестное издание');
  library.addBook(book1919);
}

// выдаем книгу
let book = library.giveBookByName('1984');

// "повреждаем" выданную книгу
book.state = 20;

// восстанавливаем выданную книгу
book.state = 50;

// пытаемся добавить восстановленную книгу обратно в библиотеку
library.addBook(book); // книга не будет добавлена из-за низкого состояния