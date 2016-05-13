# jsTreeTable

## Overview
Plugin for the jstree www.jstree.com tree component that provides columns to the tree.

## Usage

1. Include jquery (>= 1.4.2) and jstree (>=3.0.0) in your page.
2. Include jstreetable.js v3 or later
3. Include table as a plugin
4. Include relevant parameters. 

````HTML
<!-- include jstreegrid -->
<script src="/path/to/jstreetable.js"></script> 
````


````JavaScript
$("div#id").jstree({
	// include grid as a plugin
	plugins: ["core","ui",...,"table"],
	// include relevant parameters
	grid: {
		columns: [{},{},...,{}],
		width: 25
	},
	core: {
		data: [...]
	}
});
````

###Options

#### The options are as follows:

* `width`: width for the entire jstree-table. If no width is given, automatically fills the entire viewport (`width: 100%;`)
* `height`: height for the entire jstree-table. If no height is given, height will reflect the amount of content.
* `fixedHeader`: true/false. If true, then when the tree is scrolled the column headers will remain visible. Defaults to true.
* `columnWidth`: default width for a column for which no width is given. If no width is given, the default is `auto`.
* `columns`: an array of columns to create, on order. Each entry is an object with the following parameters:
	* `tree`: boolean, whether the jstree should be placed in this column. Only the first `true` is accepted. If no column is set to `tree:true`, then the first column is used.
	* `width`: width of the column in pixels. If no width is given, the default is `auto` **except for the last column**. In the last column, if no width is given, it is treated as 'auto' and fills the entire rest of the grid to the right.
	* `header`: string to use as a header for the column.
	* `headerClass`: a CSS class to add to the header cell in this column
	* `columnClass`: a CSS class to add to the header cell and the column cell
	* `cellClass`: a CSS class to add to each cell in this column (except for the header) - added to the <span>
	* `wideCellClass`: a CSS class to add to each cell in this column (except for the header) - added to the <div>
	* `value`: the attribute on the node to use as the value for this cell - entered as the <span> text. Must be a string, number, boolean or other primitive.
	* `format`: a function to modify the displayed value e.g. date formatting.
	* `valueClass`: the attribute on the node to use as a class on this cell - added to the <span>
	* `valueClassPrefix`: a prefix to add to the valueClass to use as a class on this cell
	* `wideValueClass`: the attribute on the node to use as a class on this cell - added to the <div>
	* `wideValueClassPrefix`: a prefix to add to the wideValueClass to use as a class on this cell
* `resizable`: true/false if the columns should be resizable. Defaults to false.
* `draggable`: true/false if the columns should be draggable (requires jQuery UI with sortable plugin). Defaults to false.
* `stateful`: true/false. If true, then whenever a column width is resized, it will store it in html5 localStorage, if available. Defaults to false.
* `contextmenu`: true/false whether or not a context menu for editing the cells should be shown on right-click. Defaults to false.
* `headerContextMenu`: true/false whether or not a context menu for managing columns should be shown on right-click. Defaults to true.
* `checkIcon`: class for the context menu check icons. Defaults to 'fa fa-check' (Font Awesome).
* `arrowUpIcon`: class for the up arrow icon. Defaults to 'fa fa-chevron-up' (Font Awesome).
* `arrowDownIcon`: class for the down arrow icon. Defaults to 'fa fa-chevron-down' (Font Awesome).

Value is the name of the property of the node data whose content will be used.
Therefore, if you have a node whose data is given by:

````JavaScript
{text: "My Node", data: {price: 10}}
````

and we want the price value (10) to be in column 1, then we have a config of:

````JavaScript
grid: {
	columns: [
		{width: 50, header: "Nodes"},
		{width: 30, header: "Price", value: "price"}
	]
}
````

The format option allows you to change the displayed value (10 => $10):

````JavaScript
grid: {
	columns: [
		{width: 50, header: "Nodes"},
		{width: 30, header: "Price", value: 'price', format: function(v){return("$"+(v));}}
	]
}
````

### Events
* `loaded.jstree`: When the tree is done loading, as usual, it fires a "loaded.jstree" event on the div to which you added jstree. jsTreeGrid uses this event to start its own load process. 
* `loaded_grid.jstree`: When jsTreeGrid is done, it fires a "loaded_grid.jstree" event on the same div. If you need to run some 
code after the jsTreeGrid is done loading, just listen for that event. An example is in the treegrid.HTML sample page.
* `select_cell.jstree-table`: If you click in any individual cell, the jstreegrid will fire a "select_cell.jstree_grid" event on the jstree. 
* `update_cell.jstree-table`: If you right-click a cell and edit it, when the edit is complete, and if the value has changed, the jstreegrid will fire a `update_cell.jstree-table` event on the jstree.
* `resize_column.jstree-table`: When a column is resized, whether from dragging the resizer or double-clicking it, this event will be fired. 

The signature for the select_cell.jstree-table handler is:

````JavaScript
function(event,{value:value,header:header,node:node,grid:grid,sourceName:sourceName})
````

where:

* value: value of the data element that rendered this cell
* column: header for the column
* node: reference to the &lt;li&gt; element in the tree that starts the row with the clicked cell
* grid: reference to the &lt;div&gt; element in the grid that was clicked
* sourceName: name of the element in the original data that contained this value, as provided by the config in the columns "value" for this column


The signature for the update_cell.jstree-table handler is:

````JavaScript
function(event,{node:node, col:column, value:newvalue,old:oldvalue})
````

where:

* node: the edited node in the data structure
* col: name of the column, e.g. "price"
* value: new value for the cell
* old: the original value before it was changed


The signature for the resize_column.jstree-table handler is:

````JavaScript
function(event,columnNumber,newWidth)
````

where:

* columnNumber: the number of the column being resized, with the first column being 0
* newWidth: the new width of the column in pixels

## License
jstree-table is released under the very permissive MIT License, albeit with no warranty or guarantee. See the [MIT License](./LICENSE) for full details. Use it as you will, and use it well.

### Credits
Originated from the jstree-grid project by Avi Deitcher in 2016.

