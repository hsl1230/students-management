# StudentsManagement

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.0.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Jest](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Design considerations

  1. @ngx-translation is introduced to support International language support
  2. All features are implemented as a Angular library
  3. Angular Element to be used in legacy web apps
  4. Karma is replaced with Jest to do the unit tests
  5. Bootstrap is introduced to do the layout
  6. Angluar 7, Angular materia
  7. sqlite3, express, cors are body-parser are introduced to build a rest-api-server.

## Step by step to build the project

### New workspace without creating the application

    $> ng new students-management --style=scss --routing --create-application=false

### Set style extension to scss

    $> ng config schematics.@schematics/angular:component.styleext scss
    $> my config schematics.@nrwl/schematics:component.styleext scss

### Generate an library

    $> cd students-management
    $> ng generate library students-management-lib-fe --prefix=sm

### Generate an application

    $> ng generate application students-management-element --routing=true -style=scss --prefix=henry

### Change styles.css to styles.scss in angular.json

  students-management-element > build.options.styles and test.options.styles section
  
### Config Angular material design

    $> ng add @angular/material

### Config Bootstrap

    $> npm install --save bootstrap 
    introduce bootstrap.css from angular.json
    create a css class bootstrap-row in students-management.css

### Introduce styles of material and bootstrap from styles.scss

### Add custom element support

    $> npm install -save @angular/elements
    $> npm install -save @webcomponents/custom-elements
  application imports in polyfills.ts
  
  Ref: [Building a Custom Element Using Angular Elements](https://nitayneeman.com/posts/building-a-custom-element-using-angular-elements/)
  
### Add translation support

    $> npm install @ngx-translate/core @ngx-translate/http-loader rxjs --save
    $> npm install ngx-translate-multi-http-loader --save

### Replace Karma with Jest

  Ref: [Angular CLI: “ng test” with Jest in 3 minutes (v2)](https://blog.angularindepth.com/angular-cli-ng-test-with-jest-in-3-minutes-v2-1060ddd7908d)
  
#### Remove Karma related stuff

    $> npm remove karma karma-chrome-launcher karma-coverage-istanbul-reporter karma-jasmine karma-jasmine-html-reporter
    $> rm ./karma.conf.js ./src/test.ts

#### Install @angular-builders/jest and jest

    $> npm i -D jest @types/jest @angular-builders/jest

### Set up rest api service server

    $> npm i -D express sqlite3 cors body-parser

