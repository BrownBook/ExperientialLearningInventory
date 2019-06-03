<h2>Activity Import Preview</h2>

<h4>{IMPORT_NAME}</h4>
<p>Uploaded on {UPLOADED_DATE} by {UPLOADED_BY}</p>

<div class="pull-right">
    <div class="form-group">
        <a href="index.php?module=intern&action=ValidateActivityImport&import_id={IMPORT_ID}" class="btn btn-primary">Validate Import <i class="fa fa-chevron-right"></i></a>
    </div>

    <!-- BEGIN show_import_button -->
    {SHOW_IMPORT_BUTTON}
    <div class="form-group">
        <a href="index.php?module=intern&action=ImportActivities&import_id={IMPORT_ID}" class="btn btn-danger">Import Activities <i class="fa fa-upload"></i></a>
    </div>
    <!-- END show_import_button -->
</div>


<table class="table table-stripped table-hover table-condensed">
    <tr>
        <th>1</th>
        <th>Student ID</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Term</th>
        <th>Level</th>
        <th>Experience Type</th>
        <th>Host Name</th>
        <th>Host State</th>
        <th>Department Name</th>
        <th>Validation Status</th>

    </tr>

<!-- BEGIN uploaded_rows -->
  <tr>
      <td>{ROW_NUM}</td>
      <td>{STUDENT_ID}</td>
      <td>{FIRST_NAME}</td>
      <td>{LAST_NAME}</td>
      <td>{TERM}</td>
      <td>{LEVEL}</td>
      <td>{EXPERIENCE_TYPE}</td>
      <td>{HOST_NAME}</td>
      <td>{HOST_STATE}</td>
      <td>{DEPARTMENT_NAME}</td>
      <td>
          {VALIDATION_ERRORS}
          <!-- BEGIN green_check -->
          {VALIDATION_GREEN_CHECK}
          <i class="fa fa-check text-success"></i>
          <!-- END green_check -->
      </td>
  </tr>
<!-- END uploaded_rows -->
</table>
