import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MAT_DATE_LOCALE, MatBottomSheetModule,
  MatDatepickerModule, MatDialogModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatInputModule, MatNativeDateModule, MatProgressSpinnerModule, MatRadioModule,
  MatSliderModule,
  MatStepperModule
} from '@angular/material';
import { NavigationComponent } from './navigation/navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ItemEditFormComponent } from './item-edit-form/item-edit-form.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AutofocusDirective } from './directives/autofocus.directive';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    ItemEditFormComponent,
    AutofocusDirective,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSliderModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatExpansionModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatRadioModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatBottomSheetModule,
    MatDialogModule,
    FormsModule,
    DragDropModule,
    MatProgressSpinnerModule,
  ],
  entryComponents: [
    ItemEditFormComponent,
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'nl-NL'},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
