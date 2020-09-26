<h2 style="margin-bottom:1em;">Import Experiential Activities</h2>

<div class="row">
    <div class="col-md-3">

        <form method="POST" action="index.php" enctype="multipart/form-data">
            <input type="hidden" name="module" value="intern">
            <input type="hidden" name="action" value="UploadActivities">

            <div class="form-group">
                <label for="uploadName">Upload Nickname</label>
                <input type="text" id="uploadName" name="uploadName" class="form-control"/>
            </div>

            <div class="form-group">
                <input type="file" name="internshipDataFile"/>
            </div>

            <div class="form-group">
                <button type="submit" class="btn btn-primary">Import Activities</button>
            </div>
        </form>
    </div>
</div>
