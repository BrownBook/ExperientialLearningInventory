<h2>Import Experential Activities</h2>

<form method="POST" action="index.php" enctype="multipart/form-data">
    <input type="hidden" name="module" value="intern">
    <input type="hidden" name="action" value="ImportActivities">

    <div class="form-group">
        <input type="file" name="internshipDataFile"/>
    </div>

    <div class="form-group">
        <button type="submit" class="btn btn-primary">Import Activities</button>
    </div>
</form>
