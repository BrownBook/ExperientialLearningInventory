<div class="row">
    <div class="col-md-3">
        <a href="index.php?module=intern&action=showAffiliateAgreement" class="btn btn-outline-secondary btn-sm">
            <i class="fa fa-chevron-left"></i> Back to List
        </a>
    </div>
</div>

<div class="row mb-3">
    <div class="col-md-4">
        <h2>Edit Affiliation Agreement</h2>
    </div>
</div>

{ERROR}
{START_FORM}

<div id="terminate">
</div>

<div class="col-md-2 mb-3">
    <button type="submit" class="btn btn-primary">
        <i class="fa fa-save"></i> Save
    </button>
</div>


<p></p>

<div class="row mb-3">
    <div class="col-md-5">
        <div class="mb-2 {name_ERROR}">
            <label class="form-label">
                {NAME_LABEL}
            </label>
            {NAME}
        </div>

        <div class="mb-2 {begin_date_ERROR}">
            <label class="form-label">
                {BEGIN_DATE_LABEL}
            </label>
            {BEGIN_DATE}
        </div>

        <div class="mb-2 {end_date_ERROR}">
            <label class="form-label">
                {END_DATE_LABEL}
            </label>
            {END_DATE}
        </div>

        <div class="mb-2 form-check">
            <div class="checkbox">
                {AUTO_RENEW}
                <label class="form-check-label" for="{AUTO_RENEW_ID}">
                    {AUTO_RENEW_LABEL}
                </label>
            </div>
        </div>
    </div>

    <div class="col-md-6 offset-md-1">
        <div class="row">
            <h3>Contracts</h3>

            <div class="col-md-9">
                <ul class="list-group">
                    <!-- BEGIN docs -->
                    <li class="list-group-item"><i class="fa-solid fa-file"></i> {DOWNLOAD} &nbsp;{DELETE}</li>
                    <!-- END docs -->
                </ul>
            </div>

            <div>{UPLOAD_DOC}</div>
        </div>
    </div>
</div>

<div class="row mb-3">
    <div class="col-md-12">
        <label class="form-label" for="{NOTES_ID}">{NOTES_LABEL}</label>
        {NOTES}
    </div>
</div>


{END_FORM}

<div class="row">
    <div class="col-md-5">
        <h3>Add Departments</h3>

        <div id="departments"></div>
    </div>

    <div class="col-md-5 col-md-offset-2">
        <h3>Add Locations</h3>

        <div id="locations">
        </div>
    </div>
</div>

<script type="text/javascript">
    window.aaId = {AGREEMENT_ID};
</script>

<script type="text/javascript" src="{vendor_bundle}"></script>
<script type="text/javascript" src="{department_bundle}"></script>
<script type="text/javascript" src="{location_bundle}"></script>
<script type="text/javascript" src="{terminate_bundle}"></script>