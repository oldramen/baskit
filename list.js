/* globals $, alert, console, localStorage */

// list library object
var list = {
    total: 0, // total in cart
    index: 0, // index tracker
    items: {}, // storage for items
    
    // update total
    getTotal: function() {
        this.total = 0;
        for (var item in this.items) {
            this.total += this.items[item].price;
        }
        $('#total').html('$' + this.total);
    },
    
    // add an item to list
    addItem: function() {
        var item = {},
            index = this.index,
            qty = $('#qty').val(),
            label = $('#name').val(),
            price = $('#price').val();
        // we at least need a price
        if (!price || price === "") {
            return alert("You need to add a price!");
        }
        if (!qty) {
            // if no quantity, set to 1
            qty = 1;
        } else {
            // else make it a number
            qty = parseInt(qty);
        }
        // reset elements
        $('#qty,#name,#price').val('');
        // increase index for next item
        this.index += 1;
        item = {
            qty: qty,
            label: label,
            price: parseFloat(price)
        };
        // push to list
        this.items[index] = item;
        // refresh total
        this.getTotal();
        this.buildElement(item, index);
    },
    
    /* build the HTML */
    buildElement: function(obj, index) {
        var html = $('#empty .list-item').clone();
        html.children('.close').data('index', index);
        html.children('.qty').html('(' + obj.qty + ')');
        html.children('.price').html('$' + obj.price);
        html.children('.desc').html(obj.label);
        html.appendTo('.item-list');
    },
    
    /* remove an item */
    removeItem: function(index) {
        delete this.items[index];
        this.getTotal(); // refresh total
    },
    
    /* save the list */
    saveList: function() {
        console.log('Saving Item...');
        localStorage.setItem('listItems', JSON.stringify(this.items));
        localStorage.setItem('listIndex', this.index);
    },
    
    /* clear the list */
    clearList: function() {
        this.items = {};
        this.index = 0;
        this.getTotal();
        $('.item-list').html('');
        localStorage.removeItem('listItems');
        localStorage.removeItem('listIndex');
    }
    
};