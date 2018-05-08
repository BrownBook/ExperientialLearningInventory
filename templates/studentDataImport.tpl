<h2>Student Data Import</h2>

<form method="POST" action="index.php" enctype="multipart/form-data">
    <input type="hidden" name="module" value="intern">
    <input type="hidden" name="action" value="ImportStudents">

    <div class="form-group">
        <input type="file" name="studentDataFile"/>
    </div>

    <div class="form-group">
        <button type="submit" class="btn btn-primary">Import Student Data</button>
    </div>
</form>
