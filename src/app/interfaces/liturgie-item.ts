// Types
export const partTypes = {
  titel: 'titel',
  votum: 'votum',
  lied: 'lied',
  bijbeltekst: 'bijbeltekst',
  collecte: 'collecte',
  zegen: 'zegen',
};

export abstract class LiturgieItem {
  title?: string;
  liturgie = '';
  type: string;
  song = '';
  text = '';
  vredegroet = '';
  book = '';
  fromChapter = '1';
  toChapter = '1';
  fromVerse = '1';
  toVerse = '1';

  abstract getTitle(): string;
}

export class Lied extends LiturgieItem {
  title = 'Zingen';
  song = '';
  verses: number[] = [];
  type = partTypes.lied;

  getTitle(): string {
    return this.title + ': ' + this.song + (this.verses.length ? ' : ' + this.verses.join(', ') : '');
  }
}

export class Titel extends LiturgieItem {
  title = '';
  type = partTypes.titel;

  getTitle(): string {
    return this.title;
  }
}

export class Votum extends LiturgieItem {
  title = 'Votum en vredegroet';
  vredegroet = 'vredegroet';
  type = partTypes.votum;

  getTitle(): string {
    return this.title;
  }
}

// tslint:disable-next-line:max-line-length
const boeken = JSON.parse(`{"GEN":"Genesis","EXO":"Exodus","LEV":"Leviticus","NUM":"Numeri","DEU":"Deuteronomium","JOS":"Jozua","JDG":"Rechters","RUT":"Ruth","1SA":"1 Samuel","2SA":"2 Samuel","1KI":"1 Koningen","2KI":"2 Koningen","1CH":"1 Kronieken","2CH":"2 Kronieken","EZR":"Ezra","NEH":"Nehemia","EST":"Ester","JOB":"Job","PSA":"Psalmen","PRO":"Spreuken","ECC":"Prediker","SNG":"Hooglied","ISA":"Jesaja","JER":"Jeremia","LAM":"Klaagliederen","EZK":"Ezechiël","DAN":"Daniël","HOS":"Hosea","JOL":"Joël","AMO":"Amos","OBA":"Obadja","JON":"Jona","MIC":"Micha","NAM":"Nahum","HAB":"Habakuk","ZEP":"Sefanja","HAG":"Haggai","ZEC":"Zacharia","MAL":"Maleachi","TOB":"Tobit","JDT":"Judit","ESG":"Ester (Gr.)","1MA":"1 Makkabeeën","2MA":"2 Makkabeeën","WIS":"Wijsheid","SIR":"Sirach","BAR":"Baruch","LJE":"Brief van Jeremia","DAG":"Daniël (Gr.)","MAN":"Manasse","MAT":"Matteüs","MRK":"Marcus","LUK":"Lucas","JHN":"Johannes","ACT":"Handelingen","ROM":"Romeinen","1CO":"1 Korintiërs","2CO":"2 Korintiërs","GAL":"Galaten","EPH":"Efeziërs","PHP":"Filippenzen","COL":"Kolossenzen","1TH":"1 Tessalonicenzen","2TH":"2 Tessalonicenzen","1TI":"1 Timoteüs","2TI":"2 Timoteüs","TIT":"Titus","PHM":"Filemon","HEB":"Hebreeën","JAS":"Jakobus","1PE":"1 Petrus","2PE":"2 Petrus","1JN":"1 Johannes","2JN":"2 Johannes","3JN":"3 Johannes","JUD":"Judas","REV":"Openbaring"}`);

export class Bijbeltekst extends LiturgieItem {
  title = 'Lezen';
  type = partTypes.bijbeltekst;
  book = '';
  fromChapter = '1';
  toChapter = '1';
  fromVerse = '1';
  toVerse = '1';

  getTitle(): string {
    if (!this.book) {
      return this.title + '';
    }
    return this.title + ': '
      + boeken[this.book].replace('Psalmen', 'Psalm') + ' '
      + this.fromChapter + ' : ' + this.fromVerse
      + (parseInt(this.fromChapter, 10) !== parseInt(this.toChapter, 10) || parseInt(this.fromVerse, 10) !== parseInt(this.toVerse, 10) ?
        ' - '
        + (parseInt(this.fromChapter, 10) !== parseInt(this.toChapter, 10) ? this.toChapter + ' : ' : '')
        + this.toVerse : ''
      );
  }
}

export class Collecte extends LiturgieItem {
  title = 'Collecte';
  type = partTypes.collecte;

  getTitle(): string {
    return this.title;
  }
}

export class Zegen extends LiturgieItem {
  title = 'Zegen';
  type = partTypes.zegen;

  getTitle(): string {
    return this.title;
  }
}
