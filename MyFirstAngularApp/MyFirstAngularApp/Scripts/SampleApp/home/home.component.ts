
import { Component, ViewChild, AfterViewInit, OnInit, ElementRef } from '@angular/core';

import { jqxWindowComponent } from '../../../3rdParty/jqwidgets-ts/angular_jqxwindow';
import { jqxButtonComponent } from '../../../3rdParty/jqwidgets-ts/angular_jqxbuttons';
import { jqxListBoxComponent } from '../../../3rdParty/jqwidgets-ts/angular_jqxlistbox';
import { jqxDropDownListComponent } from '../../../3rdParty/jqwidgets-ts/angular_jqxdropdownlist';
import { jqxValidatorComponent } from '../../../3rdParty/jqwidgets-ts/angular_jqxvalidator';
@Component({
	templateUrl: '/Scripts/SampleApp/home/home.component.html'

})

export class HomeComponent {

	hideColumnsOriginal: any = [];
	hideColumnsUpdated: any = [];
	showColumnsOriginal: any = [];
	showColumnsUpdated: any = [];
	private hasChanges: boolean = false;
	private rules: any;

	@ViewChild('windowReference') window: jqxWindowComponent;
	@ViewChild('jqxWidget') jqxWidget: ElementRef;
	@ViewChild('jqxSourceListbox') jqxSourceListbox: jqxListBoxComponent;
	@ViewChild('jqxColumnDestListbox') jqxColumnDestListbox: jqxListBoxComponent;
	@ViewChild('jqxDropdownlist') jqxDropdownlist: jqxDropDownListComponent;
	@ViewChild('pageOptionsWindowValidator') pageOptionsWindowValidator: jqxValidatorComponent;

	ngAfterViewInit(): void {
		this.window.close();

		let columnSourceListboxSettings: jqwidgets.ListBoxOptions = {
			source: this.getListSource(),
			width: "100%",
			height: "100%",
			displayMember: "name", valueMember: "id",
			enableSelection: true
		}

		let columnDestListboxSettings: jqwidgets.ListBoxOptions = {
			source: [],
			width: "100%",
			height: "100%",
			displayMember: "name", valueMember: "id",
			enableSelection: true
		}

		let DropDownSettings: jqwidgets.DropDownListOptions = {
			source: [],
			width: 251,
			height: 25,
			displayMember: "name", valueMember: "id",
			dropDownWidth: 'auto'
			
		}
		this.jqxSourceListbox.createComponent(columnSourceListboxSettings);
		this.jqxColumnDestListbox.createComponent(columnDestListboxSettings);
		var source = this.getListSource();
		this.jqxDropdownlist.createComponent(DropDownSettings);
		this.jqxDropdownlist.source(source);
	}

	onShowButton(): void {

		this.rules = [
			{
				input: '#jqxDropdownlist',
				message: 'The same Item cannot be selected for Dropdown and Listbox.',
				action: 'blur',
				rule: (input: any, commit: any): any => {
					debugger;
					let isValid = true;
					let freezeColumnSelected = this.jqxDropdownlist.getSelectedItem().value;
					let hideListBoxItems = this.jqxColumnDestListbox.getItems();

					for (var i = 0; i < hideListBoxItems.length; i++) {
						if (freezeColumnSelected === hideListBoxItems[i].value) {
							isValid = false;
							break;
						}
					};
					return isValid;
				}
			}
		];

		this.window.open();
	};

	pageOptionsValidationSuccess(event: any): void {
		alert('Valid');
	}
	onHideButton(): void {
		this.window.close();
	};

	onApply(): void {

		this.pageOptionsWindowValidator.validate(document.getElementById('pageOptionsModalWindowForm'));
	}


	btnSendAll() {
		let items = this.jqxSourceListbox.getItems();
		if (items.length > 0) {

			for (var i = 0; i < items.length; i++) {
				var item = items[i];
				this.hideColumnsUpdated.push(item);
				this.showColumnsUpdated.splice(item.index, 1);
			}
		}
		this.hideColumnsUpdated.sort(function (a, b) {
			var nameA = a.name == undefined ? a.label.toLowerCase() : a.name.toLowerCase();
			var nameB = b.name == undefined ? b.label.toLowerCase() : b.name.toLowerCase();
			if (nameA < nameB) //sort string ascending
				return -1
			if (nameA > nameB)
				return 1
			return 0
		});

		this.showColumnsUpdated = [];
		this.jqxSourceListbox.clearSelection();

		this.jqxColumnDestListbox.source(this.hideColumnsUpdated);
		this.jqxColumnDestListbox.refresh();

		this.jqxSourceListbox.source(this.showColumnsUpdated);
		this.jqxSourceListbox.refresh();

		this.hasChanges = true;
	}

	btnSendSingle() {

		this.showColumnsUpdated = this.jqxSourceListbox.source();
		this.hideColumnsUpdated = this.jqxColumnDestListbox.source();

		let items = this.jqxSourceListbox.getSelectedItems();
		if (items.length > 0) {
			this.jqxSourceListbox.beginUpdate();
			this.jqxColumnDestListbox.beginUpdate();


			for (var i = 0; i < items.length; i++) {
				var item = items[i];
				this.hideColumnsUpdated.push(item.originalItem);
				this.showColumnsUpdated.splice(item.index, 1);
				this.jqxColumnDestListbox.addItem(item);
				this.jqxSourceListbox.removeAt(items[i].index);
			}

			this.hideColumnsUpdated.sort(function (a, b) {
				var nameA = a.name == undefined ? a.label.toLowerCase() : a.name.toLowerCase();
				var nameB = b.name == undefined ? b.label.toLowerCase() : b.name.toLowerCase();
				if (nameA < nameB) //sort string ascending
					return -1
				if (nameA > nameB)
					return 1
				return 0
			});

			this.jqxSourceListbox.endUpdate();
			this.jqxColumnDestListbox.endUpdate();

			this.hasChanges = true;
		}

		this.jqxSourceListbox.clearSelection();
		this.jqxSourceListbox.selectedIndex(-1);

		this.jqxColumnDestListbox.source(JSON.parse(JSON.stringify(this.hideColumnsUpdated)));
		this.jqxColumnDestListbox.refresh();

		this.jqxSourceListbox.source(this.showColumnsUpdated);
		this.jqxSourceListbox.refresh();
	}

	btnSendToSourceSingle() {

		this.showColumnsUpdated = this.jqxSourceListbox.source();
		this.hideColumnsUpdated = this.jqxColumnDestListbox.source();

		let items = this.jqxColumnDestListbox.getSelectedItems();
		if (items.length > 0) {
			this.jqxSourceListbox.beginUpdate();
			this.jqxColumnDestListbox.beginUpdate();


			for (var i = 0; i < items.length; i++) {
				var item = items[i];
				this.hideColumnsUpdated.splice(item.index, 1);
				this.showColumnsUpdated.push(item);

				this.jqxSourceListbox.addItem(item);
				this.jqxColumnDestListbox.removeAt(items[i].index);

			}

			var source = [];
			source = this.showColumnsUpdated;

			source.sort(function (a, b) {
				var nameA = a.name == undefined ? a.label.toLowerCase() : a.name.toLowerCase();
				var nameB = b.name == undefined ? b.label.toLowerCase() : b.name.toLowerCase();
				if (nameA < nameB) //sort string ascending
					return -1
				if (nameA > nameB)
					return 1
				return 0
			});

			this.jqxSourceListbox.endUpdate();
			this.jqxColumnDestListbox.endUpdate();

			this.hasChanges = true;
		}

		this.jqxColumnDestListbox.clearSelection();
		this.jqxColumnDestListbox.selectedIndex(-1);

		this.jqxSourceListbox.source(source);
		this.jqxSourceListbox.refresh();

		this.jqxColumnDestListbox.source(this.hideColumnsUpdated);
		this.jqxColumnDestListbox.refresh();
	}

	btnSendToSourceAll() {
		let items = this.jqxColumnDestListbox.getItems();
		if (items.length > 0) {
			this.hasChanges = true;
			for (var i = 0; i < items.length; i++) {
				var item = items[i];
				this.showColumnsUpdated.push(item);
				this.hideColumnsUpdated.splice(item.index, 1);
			}
		}

		var source = [];
		source = this.showColumnsUpdated;
		source.sort(function (a, b) {
			var nameA = a.name == undefined ? a.label.toLowerCase() : a.name.toLowerCase();
			var nameB = b.name == undefined ? b.label.toLowerCase() : b.name.toLowerCase();
			if (nameA < nameB) //sort string ascending
				return -1
			if (nameA > nameB)
				return 1
			return 0
		});

		this.hideColumnsUpdated = [];
		this.jqxColumnDestListbox.clearSelection();

		this.jqxSourceListbox.source(source);
		this.jqxSourceListbox.refresh();

		this.jqxColumnDestListbox.source(this.hideColumnsUpdated);
		this.jqxColumnDestListbox.refresh();
	}

	getListSource() {
		return [{ id: '1', name: 'Item 1' },
		{ id: '2', name: 'Item 2' },
		{ id: '3', name: 'Item 3' },
		{ id: '4', name: 'Item 4' },
		{ id: '5', name: 'Item 5' },
		{ id: '6', name: 'Item 6' },
		{ id: '7', name: 'Item 7' },
		{ id: '8', name: 'Item 8' },
		{ id: '9', name: 'Item 9' },
		{ id: '10', name: 'Item 10' },

		];
	}
}
