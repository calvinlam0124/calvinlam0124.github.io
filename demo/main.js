//https://semantic-ui.com/elements/segment.html#loading
function newSegment($parentElement, header, body){
    $segment = $("<div style='display:none' class='ui teal segment'></div>");

    headerWrapper = document.createElement("div");
    headerWrapper.className = "ui header";
    headerWrapper.append(header);

    $segment.append(headerWrapper);
    $segment.append(body);
    $parentElement.append($segment);
    $segment.fadeIn(600);
}

function newCode(content, syntax){
    codeWrapper = document.createElement("code");
    codeWrapper.className = syntax;
    codeWrapper.append(content);

    bodyWrapper = document.createElement("pre");
    bodyWrapper.append(codeWrapper);

    hljs.highlightBlock(bodyWrapper);
    hljs.lineNumbersBlock(bodyWrapper);

    return bodyWrapper;
}

// function getData(){
//     url = "http://api.jsonbin.io/b/5a680328a4f68b318a27b239/3"
//     $.ajax({
//         url: url,
//         dataType: 'json'
//     }).done(function(data) {
//         $list = $("main");
//         header = data.header;
//         bodyContent = newCode(data.content, data.syntax);
//         newSegment($list, header, bodyContent);
//     }).fail(function() {
//         alert( "error" );
//     })
// }

function loadLocalStorage(){
    rows = myLocalStorage.getAll();
    $(rows).each(function(k,row){
        $list = $("main");
        bodyContent = newCode(row.content, row.syntax);
        newSegment($list, row.header, bodyContent);
    });
}


function addLocalStorage(){
    header = $("input[name='title']").val();
    syntax = $("input[name='syntax']").val();
    content = $("textarea").val();

    myLocalStorage.insert(header, content, syntax);
    location.reload();
}

function loadLocalStorageLength(){
    $("#number-of-records").text(
        myLocalStorage.getAll().length
    );
}

function exportAll(){
    fileContent = myLocalStorage.getOriginalString();
    fileName = "cheatsheet.json.dat";
    fileMimeType = "text/plain";

    toFile(fileContent,fileName,fileMimeType);
}


function toFile(fileContent, fileName, fileMimeType) {
    try {
        var b = new Blob([fileContent],{type:fileMimeType});
        saveAs(b, fileName); // depends on FileSaver.js
    } catch (e) {
        window.open("data:"+fileMimeType+"," + encodeURIComponent(fileContent), '_blank','');
    }
}

function importDefaultFile(){
    $.ajax({
        url: "default.dat",
        dataType: 'json'
    }).done(function(data) {
        $(data).each(function(i, record){
            myLocalStorage.insert(record.header, record.content, record.syntax);
            project.reload();
        });
    }).fail(function() {
        alert( "error" );
    });
}

/** helper */
function demo(){
    $list = $("main");
    header = "test";
    body = "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.";
    newSegment($list, header, body)
}
$(function(){
    // demo();
    // getData();
    loadLocalStorage();
    loadLocalStorageLength();
    hljs.initHighlightingOnLoad();
    hljs.initLineNumbersOnLoad();

    // auto-run
    if(myLocalStorage.getAll().length == 0){
        $('#empty-import-modal').modal('show');
    }
    // add event listener
    $("#add-new-button").on("click", function(){
        $('#add-new-modal').modal('show');
    });

    $("#add-new-submit-button").on("click", function(){
        addLocalStorage();
    });

    $("#export-all-button").on("click", function(){
        exportAll();
    });

    $("#empty-import-button").on("click", function(){
        importDefaultFile();
    });

    $("#project-truncate-button").on("click", function(e){
        if (confirm('Are you sure?')) {
            project.truncate();
        }
    });

    $("#import-file").on("change", function(e){
        project.importFile(event);
    });
    $("#import-all-button").on("click", function(){
        $("#import-file").trigger("click");
    });

    
});