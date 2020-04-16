# Solid SDK Forms

## 0.1.1 (April 16, 2020)

### Added
* ShEx Form Converter
    * Number constraints are now converted from ShEx shapes to the Form Model object
* General    
    * Added and improved code comments for clarity
    * Added i18n support for form labels, form comments, and headings
    * General code cleanup

### Updated
* Form Model Refactor
    * Updated Multiple field data to use `ui:part` predicate instead of `ui:parts`, due to Multiple only every having one part
    * Reworked data fetch functions in Form UI class to accommodate `ui:part` change


## 0.1.0 (December 18, 2019)

#### Added
* ShEx Form Converter
    * New class to help convert a ShEx shape into a Form Model, using the Form Language syntax
* Form Actions Class
    * A helper class for use with forms. Contains several common / default form actions, including add new field, delete, and save functionality
    * Also includes validation of form data, using the Form Model constraints while saving data
