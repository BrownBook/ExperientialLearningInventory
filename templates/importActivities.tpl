<h2 class="mb-3">Import Experiential Activities</h2>

<div class="row">
    <div class="col-md-3">

        <form method="POST" action="index.php" enctype="multipart/form-data">
            <input type="hidden" name="module" value="intern">
            <input type="hidden" name="action" value="UploadActivities">

            <div class="mb-3">
                <label for="uploadName" className="form-label">Upload Nickname</label>
                <input type="text" id="uploadName" name="uploadName" class="form-control" />
            </div>

            <div class="mb-4">
                <input type="file" name="internshipDataFile" />
            </div>

            <div class="mb-3">
                <button type="submit" class="btn btn-primary">Import Activities</button>
            </div>
        </form>
    </div>
</div>