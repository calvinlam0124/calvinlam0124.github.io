
// myLocalStorage
// myLocalStorage.insert(); // add new entry
// myLocalStorage.clearAll(); // delete all entry
// myLocalStorage.getAll(); // get all entry as array
// myLocalStorage.getOriginalString() // get loacl storage original string
(function(obj) {
    var local_storage_key = "myLocalStorageKey";
    var timestamp = Math.round (Date.now() / 1000);
  
    obj.insert = function(header, content, syntax) {
      var new_record = {"created_ts": timestamp, "header":header, "content":content, "syntax":syntax};
      var exist_record = this.getAll();
      exist_record.push(new_record);
      return localStorage.setItem(local_storage_key , JSON.stringify(exist_record));
    };
  
    obj.clearAll = function(){
      localStorage.removeItem(local_storage_key);
    }

    obj.getAll = function() {
      var re = JSON.parse( this.getOriginalString() );
      if(re!=null){
        return re;
      }else{
        return new Array();
      }
    };

    obj.getOriginalString = function(){
      return localStorage.getItem(local_storage_key);
    }

})(this.myLocalStorage = {});
/*
add demo record
myLocalStorage.insert("header", "content", "syntax");

myLocalStorage.insert("Bash echo variable", "#!/bin/bash\n echo $HOME", "bash");
*/