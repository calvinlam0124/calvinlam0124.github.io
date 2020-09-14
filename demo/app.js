
var project = {
    reload: function(){
        window.location.reload();
    },
    truncate: function(){
        myLocalStorage.clearAll();
        this.reload();
    },

    importFile: function (event) {
        var input = event.target;
        var reader = new FileReader();
        reader.addEventListener("loadend", function() {
            fileContent = this.result;
            project.parseFile(fileContent);
         });
        reader.readAsText(input.files[0]);
    },

    parseFile: function (fileContent) {
        records = JSON.parse(fileContent);
        records.forEach(function(element, index) {
            myLocalStorage.insert(element.header, element.content, element.syntax);
        });
        this.reload();
    }
}
