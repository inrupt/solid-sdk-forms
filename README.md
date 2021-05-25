# DEPRECATED
**Package no longer supported. Use at your own risk.**

# Solid SDK Forms

<img src="https://solid.inrupt.com/themes/custom/solid/logo.svg" width="150" height="150">

This is a standalone Typescript library designed to handle the creation of Form Models from shapes, and other form-related features.

*NOTE*: This library is still a work in progress. We are using lessons learned while building the library to improve the code and structure.

## Installation

To install, simply run the command

`npm install --save @inrupt/solid-sdk-forms`

## Usage

There are a few things you can do with this library. The most common usage will be converting a ShEx shape to a Form Model object.

This can be done with the following code:

```javascript
import { ShexFormModel, FormModel } from '@inrupt/solid-sdk-forms';

const formModel = new FormModel();
const schema = await formModel.parseSchema(schemaUrl);
const shexClass = new ShexFormModel(schema);
const formModelOutput = shexClass.convert();
```

In this example, we are given a schemaUrl (hardcoded or fetched, whichever you prefer) and use the new FormModel class to convert it. The breakdown is as follows:

#### FormModel.parseSchema
This function fetches and parses the ShEx schema and returns it. This can be in ShExC, ShExR, or ShExJ format.

#### ShexFormModel.convert
This function, belonging to the ShexFormModel class, does the actual conversion from a ShEx schema to a FormModel object. It does this by the following high level steps:

1. Find the `start` shape of the schema. This is the shape in the schema that represents the "beginning" of the shape. If one does not exist, we take the first shape in the array. This is very important when a schema file has multiple shapes in the same file.
2. Traverse the shape recursively, to build out a Form Model. This will walk the whole schema, including nested and linked shapes, and build out the Form Model from each expression in each shape. During traversal, it detects things like annotations, constraints, and data types to make "best guesses" as to which piece of the Form Model it maps to. The output is currently a string representation of a Turtle (.ttl) file that can be copied/uploaded to a Pod.

