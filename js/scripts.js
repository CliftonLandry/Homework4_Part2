/*
    File: scripts.js
GUI Assignment: Creating validation using jquery for multiplacation table
Clifton Landry, UMass Lowell Computer Science, clifton_landry@student.uml.edu
What to submit: two zipped folders, one containing the necessary files to run the first part of the assignment, and a second folder to run the second part of the assignment
Copyright(c) 2022 by Landry.All rights reserved.May be freely copied or
excerpted for educational purposes with credit to the author.
updated by CL on November 26, 2022 at 4: 36 PM
*/

var count = 0;
//this generates the table 
function multiplicationTable() {
    var table;
    table = '';
    var minCol = document.getElementById("minCol").value;
    var maxCol = document.getElementById("maxCol").value;
    var minRow = document.getElementById("minRow").value;
    var maxRow = document.getElementById("maxRow").value;
    
        //create table
        table = '<table class = "mtable">';
        table += '<tr>';
        table += '<td>' + '</td>';
        for (k = parseFloat(minCol); k <= parseFloat(maxCol); k++) { //fill the column header
            table += '<th>' + k + '</th>';
        }
        table += '</tr>';
        for (i = parseFloat(minRow); i <= parseFloat(maxRow); i++) { //fill the rows
            table += '<tr>';
            table += '<th>' + i + '</th>'; //this is the row header being added
            for (j = parseFloat(minCol); j <= parseFloat(maxCol); j++) { //fill the row data, this is most of the numbers
                table += '<td>' + j * i + '</td>';
            }
            table += '</tr>';
        }
    
    table += '</table>';   
    $('#tabUl').after("<div id ='table" + count + "'>" + table + "</div>");
    $('#tabUl').prepend("<li><a href = '#table" + count + "'>Column " + minCol + " to " + maxCol + ", Row " + minRow + " to " + maxRow + "</a> <input type='checkbox' class = 'deleteCheck' id='check" + count + "'></li>");
    $('#tabs').tabs('refresh');
    table = '';
    count++;
}

function previewTable() {
    var isvalid = $("#tableEntry").valid();
    if (!isvalid) { //if valid make table
        $('#preview').html('');
    }
    else {

        var table;
        table = '';
        var minCol = document.getElementById("minCol").value;
        var maxCol = document.getElementById("maxCol").value;
        var minRow = document.getElementById("minRow").value;
        var maxRow = document.getElementById("maxRow").value;

        //create table
        table = '<table class = "mtable">';
        table += '<tr>';
        table += '<td>' + '</td>';
        for (k = parseFloat(minCol); k <= parseFloat(maxCol); k++) { //fill the column header
            table += '<th>' + k + '</th>';
        }
        table += '</tr>';
        for (i = parseFloat(minRow); i <= parseFloat(maxRow); i++) { //fill the rows
            table += '<tr>';
            table += '<th>' + i + '</th>'; //this is the row header being added
            for (j = parseFloat(minCol); j <= parseFloat(maxCol); j++) { //fill the row data, this is most of the numbers
                table += '<td>' + j * i + '</td>';
            }
            table += '</tr>';
        }

        table += '</table>';
        $('#preview').html(table);
        table = '';

    }
}

function removeMultiple() {
    var i = 0;
    $(".deleteCheck").each(function() {
        if (this.checked) {
            parentDiv = this.parentNode;
            console.log(parentDiv);
            removeTab(parentDiv);
            console.log(i);
            i++;
        }
    });
    $('#tabs').tabs('refresh');
    var current_index = $("#tabs").tabs("option", "active");
    $("#tabs").tabs('load', current_index);
}

function removeTab(tabIdStr) {
    // Remove the panel
    $(tabIdStr).remove();
    // Refresh the tabs widget
    $('#tabs').tabs('refresh');

    // Remove the tab
    var hrefStr = "a[href='" + tabIdStr + "']"
    $(hrefStr).closest("li").remove()
}


$(function () {
   

    $('#minCol').on('input', function (e) {
        previewTable();
    });

    $('#maxCol').on('input', function (e) {
        previewTable();
    });

    $('#minRow').on('input', function (e) {
        previewTable();
    });

    $('#maxRow').on('input', function (e) {
        previewTable();
    });




    $.validator.addMethod("noDecimal", function (value, element) { //function to ensure the number doesnt have a decimal, using digit in the jquery pack doesnt allow negative numbers so I must use number
        return !(value % 1);
    }, "Decimal value entered");

    $.validator.addMethod('moreThan', function (value, element, param) { //more than method to check if max row > min row and max col > min col
        if (this.optional(element)) return true;
        var i = parseInt(value);
        var j = parseInt($(param).val());
        return i > j;
    });

    $.validator.addMethod('lessThan', function (value, element, param) { //more than method to check if max row > min row and max col > min col
        if (this.optional(element)) return true;
        var i = parseInt(value);
        var j = parseInt($(param).val());
        return i < j;
    });


  
    // Initialize form validation on the registration form.
    $("#tableEntry").validate({
       
        errorElement: 'div',
        // Specify validation rules
        rules: {
            minCol: {
                required: true,
                number: true,
                noDecimal: true,
                range: [-50, 50],
                lessThan: '#maxCol'
            },
            maxCol: {
                required: true,
                number: true,
                noDecimal: true,
                range: [-50, 50],
                moreThan: '#minCol'
            },
            minRow: {
                required: true,
                number: true,
                noDecimal: true,
                range: [-50, 50],
                lessThan: '#maxRow'
            },
            maxRow: {
                required: true,
                number: true,
                noDecimal: true,
                range: [-50, 50],
                moreThan: '#minRow'
            },
           
         
        },
        // Specify validation error messages
        messages: {

            minCol: {
                required: "Minimum column empty",
                number: "Minimum column contains non-numeric symbols",
                noDecimal:"Minimum column contains a decimal value",
                range: "Minimum column not in range of -50 to 50 inclusive",
                lessThan: "Maximum column is less than minimum column"
            },
            maxCol: {
                required: "Maximum column empty",
                number: "Maximum column contains non-numeric symbols",
                noDecimal: "Maximum column contains a decimal value",
                range: "Maximum column not in range of -50 to 50 inclusive",
                moreThan: "Maximum column is less than minimum column"
            },
            minRow: {
                required: "Minimum row empty",
                number: "Minimum row contains non-numeric symbols",
                noDecimal: "Minimum row contains a decimal value",
                range: "Minimum row not in range of -50 to 50 inclusive",
                lessThan: "Maximum row is less than minimum row"
            },
            maxRow: {
                required: "Maximum row empty",
                number: "Maximum row contains non-numeric symbols",
                noDecimal: "Maximum row contains a decimal value",
                range: "Maximum row not in range of -50 to 50 inclusive",
                moreThan: "Maximum row is less than minimum row"
            }

           
        },
        errorPlacement: function (error, element) { //place the errors in my errors div, makes the oage look good 
            error.appendTo($("#errors"));
        }
    });

    $('#genButton').click(function () { //on generate button click run validation
        var isvalid = $("#tableEntry").valid();
        if (isvalid) { //if valid make table
            multiplicationTable();
            
        }
        else { 
        }
    });
    $('#removeButton').click(function () {
        removeMultiple();
    });
    
    $("#colSlider").slider({
        range: true,
        min: -50,
        max: 50,
        values: [0, 1],
        slide: function (event, ui) {
            $("#minCol").val(ui.values[0]);
            $("#maxCol").val(ui.values[1]);
            previewTable();
        }
    });
    $("#minCol").val($("#colSlider").slider("values", 0));
    $("#maxCol").val($("#colSlider").slider("values", 1));

    $("#minCol").change(function () {
        $("#colSlider").slider('values', 0, $(this).val());
        previewTable();
    });
    $("#maxCol").change(function () {
        $("#colSlider").slider('values', 1, $(this).val());
        previewTable();
    });

    $("#rowSlider").slider({
        range: true,
        min: -50,
        max: 50,
        values: [0, 1],
        slide: function (event, ui) {
            $("#minRow").val(ui.values[0]);
            $("#maxRow").val(ui.values[1]);
            previewTable();
        }
    });
    $("#minRow").val($("#rowSlider").slider("values", 0));
    $("#maxRow").val($("#rowSlider").slider("values", 1));

    $("#minRow").change(function () {
        $("#rowSlider").slider('values', 0, $(this).val());
        previewTable();
    });
    $("#maxRow").change(function () {
        $("#rowSlider").slider('values', 1, $(this).val());
        previewTable();
    });

    $("#tabs").tabs();

    
});