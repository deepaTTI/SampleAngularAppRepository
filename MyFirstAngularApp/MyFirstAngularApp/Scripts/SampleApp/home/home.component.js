"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var angular_jqxwindow_1 = require("../../../3rdParty/jqwidgets-ts/angular_jqxwindow");
var angular_jqxlistbox_1 = require("../../../3rdParty/jqwidgets-ts/angular_jqxlistbox");
var angular_jqxdropdownlist_1 = require("../../../3rdParty/jqwidgets-ts/angular_jqxdropdownlist");
var angular_jqxvalidator_1 = require("../../../3rdParty/jqwidgets-ts/angular_jqxvalidator");
var HomeComponent = (function () {
    function HomeComponent() {
        this.hideColumnsOriginal = [];
        this.hideColumnsUpdated = [];
        this.showColumnsOriginal = [];
        this.showColumnsUpdated = [];
        this.hasChanges = false;
    }
    HomeComponent.prototype.ngAfterViewInit = function () {
        this.window.close();
        var columnSourceListboxSettings = {
            source: this.getListSource(),
            width: "100%",
            height: "100%",
            displayMember: "name", valueMember: "id",
            enableSelection: true
        };
        var columnDestListboxSettings = {
            source: [],
            width: "100%",
            height: "100%",
            displayMember: "name", valueMember: "id",
            enableSelection: true
        };
        var DropDownSettings = {
            source: [],
            width: 251,
            height: 25,
            displayMember: "name", valueMember: "id",
            dropDownWidth: 'auto'
        };
        this.jqxSourceListbox.createComponent(columnSourceListboxSettings);
        this.jqxColumnDestListbox.createComponent(columnDestListboxSettings);
        var source = this.getListSource();
        this.jqxDropdownlist.createComponent(DropDownSettings);
        this.jqxDropdownlist.source(source);
    };
    HomeComponent.prototype.onShowButton = function () {
        var _this = this;
        this.rules = [
            {
                input: '#jqxDropdownlist',
                message: 'The same Item cannot be selected for Dropdown and Listbox.',
                action: 'blur',
                rule: function (input, commit) {
                    debugger;
                    var isValid = true;
                    var freezeColumnSelected = _this.jqxDropdownlist.getSelectedItem().value;
                    var hideListBoxItems = _this.jqxColumnDestListbox.getItems();
                    for (var i = 0; i < hideListBoxItems.length; i++) {
                        if (freezeColumnSelected === hideListBoxItems[i].value) {
                            isValid = false;
                            break;
                        }
                    }
                    ;
                    return isValid;
                }
            }
        ];
        this.window.open();
    };
    ;
    HomeComponent.prototype.pageOptionsValidationSuccess = function (event) {
        alert('Valid');
    };
    HomeComponent.prototype.onHideButton = function () {
        this.window.close();
    };
    ;
    HomeComponent.prototype.onApply = function () {
        this.pageOptionsWindowValidator.validate(document.getElementById('pageOptionsModalWindowForm'));
    };
    HomeComponent.prototype.btnSendAll = function () {
        var items = this.jqxSourceListbox.getItems();
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
            if (nameA < nameB)
                return -1;
            if (nameA > nameB)
                return 1;
            return 0;
        });
        this.showColumnsUpdated = [];
        this.jqxSourceListbox.clearSelection();
        this.jqxColumnDestListbox.source(this.hideColumnsUpdated);
        this.jqxColumnDestListbox.refresh();
        this.jqxSourceListbox.source(this.showColumnsUpdated);
        this.jqxSourceListbox.refresh();
        this.hasChanges = true;
    };
    HomeComponent.prototype.btnSendSingle = function () {
        this.showColumnsUpdated = this.jqxSourceListbox.source();
        this.hideColumnsUpdated = this.jqxColumnDestListbox.source();
        var items = this.jqxSourceListbox.getSelectedItems();
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
                if (nameA < nameB)
                    return -1;
                if (nameA > nameB)
                    return 1;
                return 0;
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
    };
    HomeComponent.prototype.btnSendToSourceSingle = function () {
        this.showColumnsUpdated = this.jqxSourceListbox.source();
        this.hideColumnsUpdated = this.jqxColumnDestListbox.source();
        var items = this.jqxColumnDestListbox.getSelectedItems();
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
                if (nameA < nameB)
                    return -1;
                if (nameA > nameB)
                    return 1;
                return 0;
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
    };
    HomeComponent.prototype.btnSendToSourceAll = function () {
        var items = this.jqxColumnDestListbox.getItems();
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
            if (nameA < nameB)
                return -1;
            if (nameA > nameB)
                return 1;
            return 0;
        });
        this.hideColumnsUpdated = [];
        this.jqxColumnDestListbox.clearSelection();
        this.jqxSourceListbox.source(source);
        this.jqxSourceListbox.refresh();
        this.jqxColumnDestListbox.source(this.hideColumnsUpdated);
        this.jqxColumnDestListbox.refresh();
    };
    HomeComponent.prototype.getListSource = function () {
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
    };
    return HomeComponent;
}());
__decorate([
    core_1.ViewChild('windowReference'),
    __metadata("design:type", angular_jqxwindow_1.jqxWindowComponent)
], HomeComponent.prototype, "window", void 0);
__decorate([
    core_1.ViewChild('jqxWidget'),
    __metadata("design:type", core_1.ElementRef)
], HomeComponent.prototype, "jqxWidget", void 0);
__decorate([
    core_1.ViewChild('jqxSourceListbox'),
    __metadata("design:type", angular_jqxlistbox_1.jqxListBoxComponent)
], HomeComponent.prototype, "jqxSourceListbox", void 0);
__decorate([
    core_1.ViewChild('jqxColumnDestListbox'),
    __metadata("design:type", angular_jqxlistbox_1.jqxListBoxComponent)
], HomeComponent.prototype, "jqxColumnDestListbox", void 0);
__decorate([
    core_1.ViewChild('jqxDropdownlist'),
    __metadata("design:type", angular_jqxdropdownlist_1.jqxDropDownListComponent)
], HomeComponent.prototype, "jqxDropdownlist", void 0);
__decorate([
    core_1.ViewChild('pageOptionsWindowValidator'),
    __metadata("design:type", angular_jqxvalidator_1.jqxValidatorComponent)
], HomeComponent.prototype, "pageOptionsWindowValidator", void 0);
HomeComponent = __decorate([
    core_1.Component({
        templateUrl: '/Scripts/SampleApp/home/home.component.html'
    })
], HomeComponent);
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map