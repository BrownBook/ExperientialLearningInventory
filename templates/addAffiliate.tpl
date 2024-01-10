<div class="row">
  <div class="col-md-3">
    <a href="index.php?module=intern&action=showAffiliateAgreement" class="btn btn-outline-secondary btn-sm"
      role="button"><i class="fa-solid fa-chevron-left"></i> Back to List</a>
  </div>
</div>

<div class="row mb-3">
  <div class="col-md-6">
    <h1>Add Affiliation Agreement</h1>
  </div>
</div>

{ERROR}

{START_FORM}

<div class="row">
  <div class="col-md-5">
    <div class="{name_ERROR} mb-2">
      <label for="{NAME_ID}" class="control-label">
        {NAME_LABEL_TEXT}
      </label>
      {NAME}
    </div>

    <div class="{begin_date_ERROR} mb-2">
      <label for="begin_date" class="control-label">
        Beginning Date
      </label>
      <input type="date" id="begin_date" name="begin_date" class="form-control" required>
    </div>

    <div class="{end_date_ERROR} mb-2">
      <label for="end_date" class="control-label">
        Ending Date
      </label>
      <input type="date" id="end_date" name="end_date" class="form-control" required>
    </div>

    <div class="form-check mb-3">
      {AUTO_RENEW}
      <label class="form-check-label" for="add_prog_auto_renew">
        {AUTO_RENEW_LABEL_TEXT}
      </label>
    </div>
  </div>
</div>

<div class="row mb-2">
  <div class="col-md-5">
    <button type="submit" class="btn btn-primary btn-md float-end">
      Save and Continue
      <i class="fa fa-chevron-right"></i>
    </button>
  </div>
</div>
{END_FORM}