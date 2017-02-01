# utilities
>


## Description
Collection of JavaScript utilities
- [Math](#math)
- [JSON](#json)
- [Color](#color)

## Installation
### bower
`bower install https://github.com/FCOO/javascript-utilities.git --save`

## Demo
http://FCOO.github.io/javascript-utilities/demo/ 

## Usage
There are the following utilities
<a href="math"></a>
### Math (`src/math.js`)

#### `function significant(n, sf)`
Return `n` rounded to significant `sf`
E.g. `significant(123999, 3) => 124000`

#### `function precision(n, dp)`
Return `n` rounded to decimal precision `dp`
E.g. `precision(12.345678, 3) => 12.346`	

#### `function nearest(n, v)`
Return `n` rounded to hole number of `v`
E.g. `nearest(1234567, 100) => 1234600`

#### `function roundDownTo(n, v)`
Return `n` rounded down to hole number of `v`
E.g. `roundDownTo(1234567, 100) => 1234500 `

#### `function roundToRange(v, min, max)`
Return `v` rounded into the range `min` - `max`
E.g. `roundToRange(999, 100, 200) => 200 `
	
#### `function toDecimal(v)`
Convert a integer value v to a decimal 
Eq	`toDecimal(89) => 0.89` or `toDecimal(9) => 0.9`

<a href="json"></a>
### JSON (`src/json.js`)

#### `function serializeJSON( jsonObj )`
Serialize a JSON-object to an array of `{name,value}`

E.g. `serializeJSON( {id1:'value1', id2:'value2'} ) => [ { name: "id1", value: "value1" }, { name: "id2", value: "value2" } ]`

<a href="color"></a>
### Color (`src/color.js`)
	
#### `function brightness( r, g, b )`
Returns the brightness of the color (r,g,b) as a number between 0 and 100

#### `function colorContrastHEX( color )`
Return 'white' (`#ffffff`) or 'black' (`#000000`) whichever has the highest contrast to `color` (hex)

#### `function colorContrastRGB( r, g, b )`
As `colorContrastHEX` but for color as `(r,g,b)`



## Copyright and License
This plugin is licensed under the [MIT license](https://github.com/FCOO/javascript-utilities/LICENSE).

Copyright (c) 2016 [FCOO](https://github.com/FCOO)

## Contact information

[Niels Holt](http:/github.com/NielsHolt)


