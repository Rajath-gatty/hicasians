

(function main() {
    if (app.documents.length === 0) {
        alert("No documents are open.");
        return;
    }

    var outputFolder = Folder.selectDialog("Select a folder to save exported images:");
    if (!outputFolder) return;

    var startRulerUnits = app.preferences.rulerUnits;
    app.preferences.rulerUnits = Units.PIXELS;

    var docs = app.documents;

    for (var i = docs.length - 1; i >= 0; i--) {
        var doc = docs[i];
        app.activeDocument = doc;

        // Scaled to 50%
        var targetWidth = Math.round(doc.width.value * 0.50);
        var targetHeight = Math.round(doc.height.value * 0.50);

        var webOptions = new ExportOptionsSaveForWeb();
        webOptions.format = SaveDocumentType.JPEG;
        webOptions.quality = 80;
        webOptions.includeProfile = true;

        var baseName = doc.name.replace(/\.[^\.~]+$/, "");
        var saveFile = new File(outputFolder + "/" + baseName + "_50pct.jpg");

        var historyState = doc.activeHistoryState;
        
        doc.resizeImage(UnitValue(targetWidth, "px"), UnitValue(targetHeight, "px"), null, ResampleMethod.BICUBIC);
        doc.exportDocument(saveFile, ExportType.SAVEFORWEB, webOptions);
        
        doc.activeHistoryState = historyState;
    }

    app.preferences.rulerUnits = startRulerUnits;

    alert("Export complete for " + docs.length + " document(s)!");
})();