import { Component, Inject, OnInit } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material';
import { Lied, LiturgieItem } from '../interfaces/liturgie-item';

@Component({
  selector: 'app-item-edit-form',
  templateUrl: './item-edit-form.component.html',
  styleUrls: ['./item-edit-form.component.css']
})
export class ItemEditFormComponent implements OnInit {
  object: LiturgieItem;
  verses = '';
  // tslint:disable-next-line:max-line-length
  books = JSON.parse(`{"OT":[{"id":"GEN","name":"Genesis"},{"id":"EXO","name":"Exodus"},{"id":"LEV","name":"Leviticus"},{"id":"NUM","name":"Numeri"},{"id":"DEU","name":"Deuteronomium"},{"id":"JOS","name":"Jozua"},{"id":"JDG","name":"Rechters"},{"id":"RUT","name":"Ruth"},{"id":"1SA","name":"1 Samuel"},{"id":"2SA","name":"2 Samuel"},{"id":"1KI","name":"1 Koningen"},{"id":"2KI","name":"2 Koningen"},{"id":"1CH","name":"1 Kronieken"},{"id":"2CH","name":"2 Kronieken"},{"id":"EZR","name":"Ezra"},{"id":"NEH","name":"Nehemia"},{"id":"EST","name":"Ester"},{"id":"JOB","name":"Job"},{"id":"PSA","name":"Psalmen"},{"id":"PRO","name":"Spreuken"},{"id":"ECC","name":"Prediker"},{"id":"SNG","name":"Hooglied"},{"id":"ISA","name":"Jesaja"},{"id":"JER","name":"Jeremia"},{"id":"LAM","name":"Klaagliederen"},{"id":"EZK","name":"Ezechiël"},{"id":"DAN","name":"Daniël"},{"id":"HOS","name":"Hosea"},{"id":"JOL","name":"Joël"},{"id":"AMO","name":"Amos"},{"id":"OBA","name":"Obadja"},{"id":"JON","name":"Jona"},{"id":"MIC","name":"Micha"},{"id":"NAM","name":"Nahum"},{"id":"HAB","name":"Habakuk"},{"id":"ZEP","name":"Sefanja"},{"id":"HAG","name":"Haggai"},{"id":"ZEC","name":"Zacharia"},{"id":"MAL","name":"Maleachi"}],"DC":[{"id":"TOB","name":"Tobit"},{"id":"JDT","name":"Judit"},{"id":"ESG","name":"Ester (Gr.)"},{"id":"1MA","name":"1 Makkabeeën"},{"id":"2MA","name":"2 Makkabeeën"},{"id":"WIS","name":"Wijsheid"},{"id":"SIR","name":"Sirach"},{"id":"BAR","name":"Baruch"},{"id":"LJE","name":"Brief van Jeremia"},{"id":"DAG","name":"Daniël (Gr.)"},{"id":"MAN","name":"Manasse"}],"NT":[{"id":"MAT","name":"Matteüs"},{"id":"MRK","name":"Marcus"},{"id":"LUK","name":"Lucas"},{"id":"JHN","name":"Johannes"},{"id":"ACT","name":"Handelingen"},{"id":"ROM","name":"Romeinen"},{"id":"1CO","name":"1 Korintiërs"},{"id":"2CO","name":"2 Korintiërs"},{"id":"GAL","name":"Galaten"},{"id":"EPH","name":"Efeziërs"},{"id":"PHP","name":"Filippenzen"},{"id":"COL","name":"Kolossenzen"},{"id":"1TH","name":"1 Tessalonicenzen"},{"id":"2TH","name":"2 Tessalonicenzen"},{"id":"1TI","name":"1 Timoteüs"},{"id":"2TI","name":"2 Timoteüs"},{"id":"TIT","name":"Titus"},{"id":"PHM","name":"Filemon"},{"id":"HEB","name":"Hebreeën"},{"id":"JAS","name":"Jakobus"},{"id":"1PE","name":"1 Petrus"},{"id":"2PE","name":"2 Petrus"},{"id":"1JN","name":"1 Johannes"},{"id":"2JN","name":"2 Johannes"},{"id":"3JN","name":"3 Johannes"},{"id":"JUD","name":"Judas"},{"id":"REV","name":"Openbaring"}]}`);
  // tslint:disable-next-line:max-line-length
  chapters = JSON.parse(`{"GEN":50,"EXO":40,"LEV":27,"NUM":36,"DEU":34,"JOS":24,"JDG":21,"RUT":4,"1SA":31,"2SA":24,"1KI":22,"2KI":25,"1CH":29,"2CH":36,"EZR":10,"NEH":13,"EST":10,"JOB":42,"PSA":150,"PRO":31,"ECC":12,"SNG":8,"ISA":66,"JER":52,"LAM":5,"EZK":48,"DAN":12,"HOS":14,"JOL":4,"AMO":9,"OBA":1,"JON":4,"MIC":7,"NAM":3,"HAB":3,"ZEP":3,"HAG":2,"ZEC":14,"MAL":3,"TOB":14,"JDT":16,"ESG":10,"1MA":16,"2MA":15,"WIS":19,"SIR":51,"BAR":5,"LJE":1,"DAG":3,"MAN":1,"MAT":28,"MRK":16,"LUK":24,"JHN":21,"ACT":28,"ROM":16,"1CO":16,"2CO":13,"GAL":6,"EPH":6,"PHP":4,"COL":4,"1TH":5,"2TH":3,"1TI":6,"2TI":4,"TIT":3,"PHM":1,"HEB":13,"JAS":5,"1PE":5,"2PE":3,"1JN":5,"2JN":1,"3JN":1,"JUD":1,"REV":22}`);

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: { action: string, object: LiturgieItem },
              private bottomSheetRef: MatBottomSheetRef<ItemEditFormComponent>) {
    this.object = data.object;
    if (this.object instanceof Lied) {
      this.verses = this.object.verses.join(', ');
    }
  }

  ngOnInit() {
  }

  close() {
    this.updateVerses();
    this.bottomSheetRef.dismiss(this.object);
  }

  updateVerses() {
    if (this.object instanceof Lied) {
      this.object.verses = this.verses.split(',').map(s => parseInt(s, 10)).filter(s => Number.isInteger(s));
    }
  }
}
