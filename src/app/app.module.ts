import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FormsModule } from '@angular/forms';
import { HotTableModule } from '@handsontable/angular';

import { SAMPLESService } from './services/sample-data-service';


import { AppComponent } from './app.component';
import { InterfaceBuilderComponent } from './pages/template-constructor/interface-builder/interface-builder.component';
import { ServiceBuilderComponent } from './pages/template-constructor/service-builder/service-builder.component';
import { FormBuilderComponent } from './pages/template-constructor/form-builder/form-builder.component';
import { TemplateConstructorComponent } from './pages/template-constructor/template-constructor.component';




@NgModule({
  declarations: [
    AppComponent,
    InterfaceBuilderComponent,
    ServiceBuilderComponent,
    FormBuilderComponent,
    TemplateConstructorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HotTableModule,
    NgbModule.forRoot()
  ],
  providers: [
    SAMPLESService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
