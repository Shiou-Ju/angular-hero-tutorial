# Principle: 1.01 Daily Missions

## "Improve by 1% per day, you would have improved 37 times after a year."
「每天進步 1%，一年後就是 37 倍的你」

In mandarin we also say: "滴水穿石", which means slight gradual improvements help reaching our destinations.

This project is to help people keep motivation doing things that make them getting better.  

## Concepts
By completing daily missions, they get one more day of `streak` as motivation

In the future this project will also support peoples' sharing of their current status, for example their day-streaks and new goals they set.

## Mission types 
There are two kinds of missions in this project: 
1. `Fixed Missions`: of which the amount or loadings to be completed everyday is fixed.  For example, if someone would like to keep a reading habit for 1 hour per day, they should select this mission type.
2. `Increment Missions`: of which the amount or loadings are increasing at **an increment amount** if the mission is completed that day.  For example, if someone would like to do two more push-ups every next day, this kind of mission is for them.

## Backend
This project relies on the[ api server](https://github.com/Shiou-Ju/daily-mission-koa-server) to serve the data.  

Please refer to my other project in the link above.

## Components
1. List: shows all missions you have created
2. Dashboard: missions to be completed today
3. Searchbar: find missions that match a pattern
4. Detail: display properties of a single mission by id where adjustments can be done
5. Messagebox: shows logs and errors from operations

## To be implemented
1. User login page
2. Checkboxes in Dashboard
3. Day-streak components
4. Introduce `Angular Material` and refactor


## Template generated from Angular CLI as below

***

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.0.2.
### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
***
