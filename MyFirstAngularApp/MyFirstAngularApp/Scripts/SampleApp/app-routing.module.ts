import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { HomeComponent } from './home/home.component';

const routes: Routes = [
	{ path: '', redirectTo: 'home', pathMatch: 'full' },
	{ path: 'home', component: HomeComponent }
];

@NgModule({
	imports: [
		RouterModule.forRoot(
			routes,
			{
			}
		)],
	providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
	exports: [RouterModule],
})

export class AppRoutingModule { }

export const routableComponents = [
	HomeComponent
]; 
