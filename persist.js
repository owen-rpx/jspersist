(function () {
    // In the following line, you should includee the prefixes of implementations you want to test.
    window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
    // DON'T use "var indexedDB = ..." if you're not in a function.
    // Moreover, you may need references to some window.IDB* objects:
    window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction || {
        READ_WRITE: "readwrite"
    };
    // This line should only be needed if it is needed to support the object's constants for older browsers
    window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
    // (Mozilla has never prefixed these objects, so we don't need window.mozIDB*)   

    if (!window.indexedDB) {
        window.alert("Your browser doesn't support a stable version of IndexedDB.")
    }

    function Persist() {
        this.db_name = arguments[0];
        this.db_version = arguments[1] || 1;
        this.open_request = null;
        this.db_instance = null;

        return this;
    }
    Persist.prototype.open = function () {
        this.open_request = indexedDB.open(this.db_name, this.db_version);
        this.open_request.onsuccess = arguments[0] ? arguments[0].apply() : null;
        this.open_request.onupgradeneeded = function (event) {
            this.db_instance = this.open_request.result;
        };
        return this;
    }

    Persist.prototype.drop = function () {
        this.open_request = indexedDB.deleteDatabase(this.db_name);
        this.open_request.onblocked = function () {
            console.log("Some connections block.");
        };
        this.open_request.onsuccess = function (event) {
            console.log("Delete db successfully.", event)
        };
    }

    Persist.prototype.createTable = function (table) {
        // var store = db.createObjectStore("books", {keyPath: "isbn"});
        // var titleIndex = store.createIndex("by_title", "title", {unique: true});
        // var authorIndex = store.createIndex("by_author", "author");
    };

    Persist.prototype.alterTable = function () {};
    Persist.prototype.deleteTable = function () {};


    Persist.prototype.toString = function () {
        console.log(this.db_name, this.db_version);
    }

    window.JsPersist = Persist;
}())