import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { UrlSerializer } from '@angular/router';

// TODO: Move to core module
import './rxjs-extensions';
import { AppComponent } from './app.component';
import { AppRoutingModule, routableComponents } from './app-routing.module';

import { jqxButtonComponent } from '../../3rdParty/jqwidgets-ts/angular_jqxbuttons';
import { jqxDropDownListComponent } from '../../3rdParty/jqwidgets-ts/angular_jqxdropdownlist';
import { jqxListBoxComponent } from '../../3rdParty/jqwidgets-ts/angular_jqxlistbox';
import { jqxValidatorComponent } from '../../3rdParty/jqwidgets-ts/angular_jqxvalidator';
import { jqxWindowComponent } from '../../3rdParty/jqwidgets-ts/angular_jqxwindow';
import { jqxScrollBarComponent } from '../../3rdParty/jqwidgets-ts/angular_jqxscrollbar';

@NgModule({
	imports: [
		BrowserModule,
		HttpModule,
		AppRoutingModule
	],
	exports: [
		jqxButtonComponent,
		jqxDropDownListComponent,
		jqxListBoxComponent,
		jqxValidatorComponent,
		jqxWindowComponent,
		jqxScrollBarComponent
	],
	declarations: [
		AppComponent,
		routableComponents,
		jqxButtonComponent,
		jqxDropDownListComponent,
		jqxListBoxComponent,
		jqxValidatorComponent,
		jqxWindowComponent,
		jqxScrollBarComponent
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
