import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatBottomSheet } from '@angular/material';
import { ItemEditFormComponent } from './item-edit-form/item-edit-form.component';
import { Bijbeltekst, Collecte, Lied, LiturgieItem, Ondertiteling, Titel, Votum, Zegen } from './interfaces/liturgie-item';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

const welkom = new Titel();
welkom.title = 'Welkom';

const collectedoelen = {
  '5-7-2020': {gkv1: 'Diaconie', gkv2: 'Rente en aflossing', ngk1: 'Kerk', ngk2: 'Actueel doel'},
  '12-7-2020': {gkv1: 'Kerk', gkv2: 'Rente en aflossing', ngk1: 'Kerk', ngk2: 'Zending'},
  '19-7-2020': {gkv1: 'TU Kampen', gkv2: 'Rente en aflossing', ngk1: 'Kerk', ngk2: 'Diaconie'},
  '26-7-2020': {gkv1: 'Kerk', gkv2: 'Rente en aflossing', ngk1: 'Kerk', ngk2: 'Diaconie'},
  '2-8-2020': {gkv1: 'Diaconie', gkv2: 'Rente en aflossing', ngk1: 'Kerk', ngk2: 'Pensioenvoorziening predikanten'},
  '9-8-2020': {gkv1: 'Kerk', gkv2: 'Rente en aflossing', ngk1: 'Kerk', ngk2: 'Diaconie'},
  '16-8-2020': {gkv1: 'Missionaire projecten dichtbij', gkv2: 'Rente en aflossing', ngk1: 'Kerk', ngk2: 'algemene Chr. Doelen'},
  '23-8-2020': {gkv1: 'Kerk inz. div. quota', gkv2: 'Rente en aflossing', ngk1: 'Kerk', ngk2: 'Pensioenvoorziening predikanten'},
  '30-8-2020': {gkv1: 'Kerk', gkv2: 'Rente en aflossing', ngk1: 'Kerk', ngk2: 'Steun behoevende kerken'},
  '6-9-2020': {gkv1: 'Diaconie', gkv2: 'Rente en aflossing', ngk1: 'Kerk', ngk2: 'Actueel doel'},
  '13-9-2020': {gkv1: 'Diaconie', gkv2: 'Rente en aflossing', ngk1: 'Kerk', ngk2: 'Pensioenvoorziening predikanten'},
  '20-9-2020': {gkv1: 'India Mission', gkv2: 'Rente en aflossing', ngk1: 'Kerk', ngk2: 'Algemene Chr. Doelen'},
  '27-9-2020': {gkv1: 'Kerk', gkv2: 'Rente en aflossing', ngk1: 'Kerk', ngk2: 'Diaconie'},
  '4-10-2020': {gkv1: 'Diaconie', gkv2: 'Rente en aflossing', ngk1: 'Kerk', ngk2: 'Predikantenopleiding'},
  '11-10-2020': {gkv1: 'Kerk', gkv2: 'Rente en aflossing', ngk1: 'Kerk', ngk2: 'Activiteiten Commissie'},
  '18-10-2020': {gkv1: 'TU Kampen', gkv2: 'Rente en aflossing', ngk1: 'Kerk', ngk2: 'Pensioenvoorziening predikanten'},
  '25-10-2020': {gkv1: 'Kerk', gkv2: 'Rente en aflossing', ngk1: 'Kerk', ngk2: 'Steun behoevende kerken'},
  '1-11-2020': {gkv1: 'Diaconie', gkv2: 'Rente en aflossing', ngk1: 'Kerk', ngk2: 'Actueel doel'},
  '4-11-2020': {gkv1: 'Diaconie', gkv2: 'Rente en aflossing', ngk1: '', ngk2: 'Actueel doel'},
  '8-11-2020': {gkv1: 'Jeugdbeleid', gkv2: 'Rente en aflossing', ngk1: 'Kerk', ngk2: 'St Hulp Oost Europa'},
  '15-11-2020': {gkv1: 'Kerk', gkv2: 'Rente en aflossing', ngk1: 'Kerk', ngk2: 'Pensioenvoorziening predikanten'},
  '22-11-2020': {gkv1: 'Kerk inz. div. quota', gkv2: 'Rente en aflossing', ngk1: 'Kerk', ngk2: 'Diaconie'},
  '29-11-2020': {gkv1: 'Kerk', gkv2: 'Rente en aflossing', ngk1: 'Kerk', ngk2: 'Kinderkerstfeest'},
  '6-12-2020': {gkv1: 'Diaconie', gkv2: 'Rente en aflossing', ngk1: 'Kerk', ngk2: 'Jeugdclub werk'},
  '13-12-2020': {gkv1: 'Diaconie', gkv2: 'Rente en aflossing', ngk1: 'Kerk', ngk2: 'Pensioenvoorziening predikanten'},
  '20-12-2020': {gkv1: 'Kerk', gkv2: 'Rente en aflossing', ngk1: 'Kerk', ngk2: 'Predikantenopleiding'},
  '25-12-2020': {gkv1: 'Kerk', gkv2: 'Rente en aflossing', ngk1: 'Kerk', ngk2: 'Opgave kerstfeest organisatie'},
  '27-12-2020': {gkv1: 'India Mission', gkv2: 'Rente en aflossing', ngk1: 'Kerk', ngk2: 'Diaconie'},
  '31-12-2020': {gkv1: 'Kerk', gkv2: 'Rente en aflossing', ngk1: 'Kerk', ngk2: 'Pensioenvoorziening predikanten'},
  '3-1-2021': {gkv1: '', gkv2: 'Rente en aflossing', ngk1: 'Kerk', ngk2: 'Actueel doel'},
  '10-1-2021': {gkv1: '', gkv2: 'Rente en aflossing', ngk1: 'Kerk', ngk2: 'Pensioenvoorziening predikanten'},
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
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
  downloaded = false;

  constructor(private formBuilder: FormBuilder, private bottomSheet: MatBottomSheet) {
    const nextSunday = new Date();
    nextSunday.setDate(nextSunday.getDate() + ((7 - nextSunday.getDay()) % 7));

    this.presentationForm = this.formBuilder.group({
      date: [nextSunday, Validators.required],
      ochtend: [true, Validators.required],
      thema: [''],
      wachtwoord: ['', Validators.required],
    });

    this.liturgieForm = this.formBuilder.group({
      checkable: [true, Validators.requiredTrue]
    });

    this.collecteForm = this.formBuilder.group({
      gkv1: ['', Validators.required],
      gkv2: ['Rente en aflossing', Validators.required],
      ngk1: ['Kerk', Validators.required],
      ngk2: ['', Validators.required],
    });

    this.setCollecte(nextSunday);

    this.presentationForm.get('date').valueChanges.subscribe(date => {
      this.setCollecte(date);
    });
  }

  setCollecte(selectedDate) {
    const date = new Date(selectedDate);
    const name = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
    if (date) {
      if (name in collectedoelen) {
        this.collecteForm.get('gkv1').setValue(collectedoelen[name].gkv1);
        this.collecteForm.get('gkv2').setValue(collectedoelen[name].gkv2);
        this.collecteForm.get('ngk1').setValue(collectedoelen[name].ngk1);
        this.collecteForm.get('ngk2').setValue(collectedoelen[name].ngk2);
      } else {
        this.collecteForm.get('gkv1').setValue('');
        this.collecteForm.get('gkv2').setValue('Rente en aflossing');
        this.collecteForm.get('ngk1').setValue('Kerk');
        this.collecteForm.get('ngk2').setValue('');
      }
    }
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
      case 'ondertiteling':
        obj = new Ondertiteling();
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
    const filename = this.name();

    fetch('https://api.debronhg.tim365.dev/generate', {
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
        this.downloaded = true;
      })
      .catch((error) => {
        alert('Er ging iets mis bij het genereren');
        console.error(error);
        this.downloading = false;
      });
  }

  public name() {
    const date = new Date(this.presentationForm.value.date);
    return date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear()
      + ', ' + (this.presentationForm.value.ochtend ? 'ochtend' : 'middag') + '.pptm';
  }
}
