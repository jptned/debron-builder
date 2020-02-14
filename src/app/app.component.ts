import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatBottomSheet } from '@angular/material';
import { ItemEditFormComponent } from './item-edit-form/item-edit-form.component';
import { Bijbeltekst, Collecte, Lied, LiturgieItem, Titel, Votum, Zegen } from './interfaces/liturgie-item';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

const welkom = new Titel();
welkom.title = 'Welkom';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  presentationForm;
  liturgieForm;
  collecteForm;
  liturgieItems: LiturgieItem[] = [
    welkom,
    new Votum(),
  ];
  downloading = false;
  downloadURL: string;

  constructor(private formBuilder: FormBuilder, private bottomSheet: MatBottomSheet) {
    const nextSunday = new Date();
    nextSunday.setDate(nextSunday.getDate() + ((7 - nextSunday.getDay()) % 7));

    this.presentationForm = this.formBuilder.group({
      date: [nextSunday, Validators.required],
      ochtend: [true, Validators.required],
      thema: ['']
    });

    this.liturgieForm = this.formBuilder.group({
      checkable: [true, Validators.requiredTrue]
    });

    this.collecteForm = this.formBuilder.group({
      gkv1: ['', Validators.required],
      gkv2: ['Rente en aflossing', Validators.required],
      gkv3: ['', Validators.required],
      gkv4: ['Rente en aflossing', Validators.required],
      ngk1: ['Kerk'],
      ngk2: [''],
      ngk3: ['Kerk'],
      ngk4: [''],
    });

    this.presentationForm.get('ochtend').valueChanges.subscribe(ochtend => {
      const validator = ochtend ? [] : [Validators.required];
      this.collecteForm.get('ngk1').setValidators(validator);
      this.collecteForm.get('ngk1').updateValueAndValidity();
      this.collecteForm.get('ngk2').setValidators(validator);
      this.collecteForm.get('ngk2').updateValueAndValidity();
      this.collecteForm.get('ngk3').setValidators(validator);
      this.collecteForm.get('ngk3').updateValueAndValidity();
      this.collecteForm.get('ngk4').setValidators(validator);
      this.collecteForm.get('ngk4').updateValueAndValidity();
    });
  }

  addNew(type: string) {
    let obj;
    switch (type) {
      case 'lied':
        obj = new Lied();
        break;
      case 'bijbeltekst':
        obj = new Bijbeltekst();
        break;
      case 'collecte':
        obj = new Collecte();
        break;
      case 'votum':
        obj = new Votum();
        break;
      case 'zegen':
        obj = new Zegen();
        break;
      default:
        obj = new Titel();
        break;
    }

    const bottomSheetRef = this.bottomSheet.open(ItemEditFormComponent, {
      data: {
        object: obj,
        action: 'new',
      }
    });

    bottomSheetRef.afterDismissed().subscribe(result => {
      if (result) {
        this.liturgieItems.push(result);
        this.updateLiturgieForm();
      }
    });
  }

  edit(index: number) {
    const bottomSheetRef = this.bottomSheet.open(ItemEditFormComponent, {
      data: {
        object: this.liturgieItems[index],
        action: 'edit',
      }
    });

    bottomSheetRef.afterDismissed().subscribe(result => {
      if (result) {
        this.liturgieItems[index] = result;
      }
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.liturgieItems, event.previousIndex, event.currentIndex);
  }

  delete(index: number) {
    this.liturgieItems.splice(index, 1);
    this.updateLiturgieForm();
  }

  updateLiturgieForm() {
    this.liturgieForm.get('checkable').setValue(this.liturgieItems.length > 0);
    this.liturgieForm.get('checkable').updateValueAndValidity();
  }

  generateJSON() {
    return JSON.stringify({
      presentatie: this.presentationForm.value,
      liturgie: this.liturgieItems,
      collecte: this.collecteForm.value
    }, null, 2);
  }

  genereer() {
    this.downloading = true;
    this.downloadURL = '';
    const date = new Date(this.presentationForm.value.date);
    const filename = date.getDate() + '-' + date.getMonth() + '-' + date.getFullYear()
      + ', ' + (this.presentationForm.value.ochtend ? 'ochtend' : 'middag') + '.pptm';

    fetch('http://localhost:3000/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: this.generateJSON()
    })
      .then(resp => resp.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        // the filename you want
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        this.downloading = false;
      })
      .catch((error) => {
        alert('Er ging iets mis bij het genereren');
        console.error(error);
        this.downloading = false;
      });
  }
}
