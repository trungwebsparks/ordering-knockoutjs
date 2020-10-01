$(function() {
    'use-strict';

    getProductsData();

    console.log( "load table body" );

    //loadTableBody();

    function viewModel() {

        let self =this;

        self.customerName = ko.observable(''),
        self.customerAddress = ko.observable(''),
        self.customerPhone = ko.observable(''),
        self.orderItems = ko.observableArray([]),
        self.quantities= ko.observableArray([1,2,3,4,5,6,7,8,9,10]),
        self.units= ko.observableArray([
            {
                id:1,
                name:"Cái"
            },
            {
                id:2,
                name:"Thùng"
            },
            {
                id:3,
                name:"Lốc"
            }
        ]),
        self.selectedUnits= ko.observableArray([]),
        self.products= ko.observableArray([
            {
                id:1,
                name:"Khóa",
                price: "100000",
                unit:"Cái"
            },
            {
                id:2,
                name:"Búa",
                price:"50000",
                unit:"Cái",
            },
            {
                id:3,
                name:"Tuvit",
                price:"15000",
                unit:"Cái"
            },
            {
                id:4,
                name:"Silicon",
                price: "40000",
                unit:"Cái",
            }
        ]),
        self.saveOrder= function(){
            console.log('save order', this);
        },
        self.clearOrder= function(){
            console.log('clear order');
        },
        self.addOrderItem = function(){
            let orderItems = self.orderItems();
            orderItems.push({
                productName:"san pham moi",
                price:0,
                unit:0,
                qty:1,
                total:0
            });
            self.orderItems(orderItems);
        },
        self.updateOrderItems = function(){
            let items = [];
            const rows = $('#tableBody tr.order-item-row');

            for(let i=0;i<rows.length;i++){
                items.push({
                    //productId:$(rows[i]).attr('product-id'),
                    productName: 'ten san pham',//$('select.item', rows[i]).val(),
                    unit:0,
                    qty:1, 
                    price:0,
                    total:0
                });
            }
            self.orderItems(items);
        }
    }
    ko.bindingHandler.typeahead = {
        init: function(element, valueAccessor, allBindingsAccessor){
            let $e = $(element),
                productNameVal = allBindingsAccessor().productNameVal,
                productIDVal = allBindingsAccessor().productIDVal;

            let updateValues = function(datum){
                try{
                    productNameVal(datum.name);
                    productIDVal(datum.id);
                }catch(err){
                    console.log('ko.bindingHandler.typeahead error', err);
                }
            };

            $e.typeahead({
                name:'products',
                local:self.products
            }).on('typeahead:selected', function(el,datum){
                updateValues(datum);
            }).on('typeahead')
        }
    };
    ko.applyBindings(new viewModel());
});

function loadTableBody(rows){    
    let html = "";
    for(let i=0;i<rows;i++){
        html += loadTableRow(i);
    }
    $("#tableBody").html(html);
}

function loadTableRow(index){
    const productInput = `<input class='form-control input-sm product-input' id='txtProduct-${index}' name='txtProduct'></input>`;
    const qtySelect = `<select class='form-control input-sm qty-select' id='selectQty-${index}' name='selectQty' data-bind="options: quantities"></select>`
    const unitSelect = `<select class='form-control input-sm unit-select' id='selectUnit-${index}' name='selectUnit' data-bind="options: units, optionsCaption: '--Đơn vị--', optionsText: 'name', optionsValue: 'id'"></select>`
    return `<tr><td>${index+1}</td><td>${productInput}</td><td>${qtySelect}</td><td>${unitSelect}</td><td></td><td></td><td></td></tr>`;
}

function getProductsData(){
    // $.ajax({
    //     url:"https://tiemvattu.com/api/Products/SellingProducts",
    // });
    // $.get( "https://tiemvattu.com/api/Products/HomePage", function( data ) {
    //     console.log('get products data',data)
    //   });
      $.ajax({
        url: "https://tiemvattu.com/api/Products/HomePage",
        contentType: "application/json",
        dataType: 'json',
        success: function(result){
            console.log('success',result);
        },
        error:function(err){
            console.log("error", err);
        }
    })
}