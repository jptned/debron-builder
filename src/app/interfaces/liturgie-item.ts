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

export class Bijbeltekst extends LiturgieItem {
  title = 'Lezen';
  text = '';
  type = partTypes.bijbeltekst;

  getTitle(): string {
    return this.title + ': ' + this.text;
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
