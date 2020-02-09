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
