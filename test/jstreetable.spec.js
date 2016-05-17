//generic data
var data = [{
    id: "Products",
    text: "Products",
    data: {},
    children: [{
        id: "Fruit",
        text: "Fruit",
        data: {}, 
        children:[
            {id: "Apple", text: "Apple", data: {price: 0.1, quantity: 20}},
            {id: "Banana", text: "Banana", data: {price: 0.2, quantity: 31}},
            {id: "Grapes", text: "Grapes", data: {price: 1.99, quantity: 34}},
            {id: "Mango", text: "Mango", data: {price: 0.5, quantity: 8}},
            {id: "Melon", text: "Melon", data: {price: 0.8, quantity: 4}},
            {id: "Pear", text: "Pear", data: {price: 0.1, quantity: 30}},
            {id: "Strawberry", text: "Strawberry", data: {price: 0.15, quantity: 32}}
        ],
        'state': {'opened': true}
    }, {
        id: "Vegetables",
        text: "Vegetables",
        data: {}, 
        children:[
            {id: "Aubergine", text: "Aubergine", data: {price: 0.5, quantity: 8}},
            {id: "Broccoli", text: "Broccoli", data: {price: 0.4, quantity: 22}},
            {id: "Carrot", text: "Carrot", data: {price: 0.1, quantity: 32}},
            {id: "Cauliflower", text: "Cauliflower", data: {price: 0.45, quantity: 18}},
            {id: "Potato", text: "Potato", data: {price: 0.2, quantity: 38}}
        ],
        'state': {'opened': true}
    }],
    'state': {'opened': true}
}];

describe('JsTreeTable', function() {
    beforeEach(function(done) {
        this.jstreeContainer = document.createElement('div');
        this.jstreeContainer.id = 'jstreeContainer';
        this.jstree = document.createElement('div');
        this.jstree.id = 'jstree';
        document.body.appendChild(this.jstreeContainer);
        this.jstreeContainer.appendChild(this.jstree);
        
        $("div#jstree").jstree({
            plugins: ["table","dnd","contextmenu","sort"],
            core: {
                data: data
            },
            // configure tree table
            table: {
                columns: [
                    {width: 200, header: "Name"},
                    {width: 150, value: "price", header: "Price", format: function(v) {if (v){ return '$'+v.toFixed(2) }}},
                    {width: 150, value: "quantity", header: "Qty"}
                ],
                resizable: true,
                draggable: true,
                contextmenu: true,
                width: 500,
                height: 300
            }
        }).on('ready.jstree', function (e, data) {
            done();
        });
    });

    afterEach(function() {
        $.jstree.destroy ();
        $('#jstreeContainer').remove();
    });

    it('can load', function() {            
        expect(this.jstreeContainer.firstChild.className).toBe('jstree-table-wrapper');
    });

    it('sort ascending', function() {
        $('.jstree-table-header-cell:eq(2)').click();
        expect($('#Melon').parent().children(":first").attr('id')).toBe('Melon');
    });

    it('sort descending', function() {
        $('.jstree-table-header-cell:eq(2)').click().click();
        expect($('#Grapes').parent().children(":first").attr('id')).toBe('Grapes');
    });

    it('double click separator to size', function() {
        $('.jstree-table-resizable-separator:eq(1)').dblclick();
        expect($('.jstree-table-header-cell:eq(1)').width()).toBe(35);
    });

    it('autosize', function() {
        var ref = $("#jstree").jstree(true);
		ref.autosize_column($('.jstree-table-column:eq(1)'));
        expect($('.jstree-table-header-cell:eq(1)').width()).toBe(35);
    });

    it('autosize all', function() {
        var ref = $("#jstree").jstree(true);
		ref.autosize_all_columns();
        expect($('.jstree-table-header-cell:eq(1)').width()).toBe(35);
        expect($('.jstree-table-header-cell:eq(2)').width()).toBe(15);
    });

    it('fixed header when scrolling', function(done) {
        var ref = $("#jstree").jstree(true);
        ref.open_node($('#Vegetables'));
        $('.jstree-table-wrapper').scrollTop(30);        
        setTimeout(function(){
            expect($('.jstree-table-header').css('top')).toBe('30px');
            done(); // call this to finish off the it block
        }, 10);
    });
});