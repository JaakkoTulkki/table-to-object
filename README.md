# Table To Object
Turn a JS template literal table into a JS object

## Install

`npm install table-to-object`

## How to Use

```ecmascript 6
const transform = require('table-to-object').transform;

function randomFunction() {
  return 'hello'
}
const table = transform`
    | columnA  | ${'columnB'} | columnC       | columnD           |
    |-------------------------------------------------------------|
    | hello    | ${4}         |               | there             |
    | world    |              | ${{42: true}} | some              |
    | f        |              |               | ${randomFunction} |
    `;

console.log(table.rows);
```

The logged out value would be:
```ecmascript 6
[
  {
    columnA: 'hello',
    columnB: 4,
    columnC: undefined,
    columnD: 'there'
  },
  {
    columnA: 'world',
    columnB: undefined,
    columnC: { '42': true },
    columnD: 'some'
  },
  {
    columnA: 'f',
    columnB: undefined,
    columnC: undefined,
    columnD: [Function: randomFunction]
  }
]
```

## Properties in the Returned Object

### columns
The columns of the table:

```ecmascript 6
const table = transform`
    | columnA  | ${'columnB'} | columnC       | columnD           |
    |-------------------------------------------------------------|
    | hello    | ${4}         |               | there             |
    `;

console.log(table.columns);
```
Would log out:

```ecmascript 6
[ 'columnA', 'columnB', 'columnC', 'columnD' ]
```

### rows
An array of the table's rows. Each row is mapped to the column.
```ecmascript 6
const table = transform`
    | columnA  | ${'columnB'} | columnC       | columnD           |
    |-------------------------------------------------------------|
    | hello    | ${4}         |               | there             |
    `;

console.log(table.rows);
```
Would log out:
```ecmascript 6
[
  {
    columnA: 'hello',
    columnB: 4,
    columnC: undefined,
    columnD: 'there'
  }
]

```
 