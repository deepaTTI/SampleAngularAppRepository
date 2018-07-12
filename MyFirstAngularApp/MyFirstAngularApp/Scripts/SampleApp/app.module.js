"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var http_1 = require("@angular/http");
require("./rxjs-extensions");
var app_component_1 = require("./app.component");
var app_routing_module_1 = require("./app-routing.module");
var angular_jqxbuttons_1 = require("../../3rdParty/jqwidgets-ts/angular_jqxbuttons");
var angular_jqxdropdownlist_1 = require("../../3rdParty/jqwidgets-ts/angular_jqxdropdownlist");
var angular_jqxlistbox_1 = require("../../3rdParty/jqwidgets-ts/angular_jqxlistbox");
var angular_jqxvalidator_1 = require("../../3rdParty/jqwidgets-ts/angular_jqxvalidator");
var angular_jqxwindow_1 = require("../../3rdParty/jqwidgets-ts/angular_jqxwindow");
var angular_jqxscrollbar_1 = require("../../3rdParty/jqwidgets-ts/angular_jqxscrollbar");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            http_1.HttpModule,
            app_routing_module_1.AppRoutingModule
        ],
        exports: [
            angular_jqxbuttons_1.jqxButtonComponent,
            angular_jqxdropdownlist_1.jqxDropDownListComponent,
            angular_jqxlistbox_1.jqxListBoxComponent,
            angular_jqxvalidator_1.jqxValidatorComponent,
            angular_jqxwindow_1.jqxWindowComponent,
            angular_jqxscrollbar_1.jqxScrollBarComponent
        ],
        declarations: [
            app_component_1.AppComponent,
            app_routing_module_1.routableComponents,
            angular_jqxbuttons_1.jqxButtonComponent,
            angular_jqxdropdownlist_1.jqxDropDownListComponent,
            angular_jqxlistbox_1.jqxListBoxComponent,
            angular_jqxvalidator_1.jqxValidatorComponent,
            angular_jqxwindow_1.jqxWindowComponent,
            angular_jqxscrollbar_1.jqxScrollBarComponent
        ],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map