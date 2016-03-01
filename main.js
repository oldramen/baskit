/* buckit */
/* globals localStorage, console, list, $, document */

var init = function(callback) {
    // check for a saved list
    var listItems = JSON.parse(localStorage.getItem('listItems')),
        listIndex = localStorage.getItem('listIndex');
    if (listItems) list.items = listItems;
    if (listIndex) list.index = listIndex;
    if (listItems || listIndex) {
        list.getTotal();
        for (var item in list.items) {
            list.buildElement(list.items[item], item);
        }
    }
    // continue with init
    if (callback) callback();
};
$(document).ready(function() {
    init(function() {
        $('#add').on('click', function() {
            console.log('Adding Item...');
            list.addItem();
        });
        $('.item-list').on('click', '.remove-item', function() {
            console.log('Removing Item...');
            list.removeItem($(this).data('index'));
        });
        $('#save').on('click', function() {
            list.saveList(); 
        });
        $('#clear').on('click', function() {
            list.clearList();
        });
    });
});