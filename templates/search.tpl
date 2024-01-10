<script type="text/javascript">
  $(document).ready(function() {
    // Setup date pickers
    $("#internship_start_date").datepicker();
    $("#internship_end_date").datepicker();
  });
</script>

<h2><i class="fa-solid fa-search"></i> Search Activities</h2>

<form class="{FORM_CLASS}" id="{FORM_ID}" action="{FORM_ACTION}" autocomplete="{FORM_AUTOCOMPLETE}"
  method="{FORM_METHOD}" {FORM_ENCODE}>
  {HIDDEN_FIELDS}

  <div class="row">
    <div class="col-md-4 offset-md-4">
      <div class="row mb-3">
        <label class="form-label" for="{NAME_ID}" style="display: none;">{NAME_LABEL_TEXT}</label> <input type="text"
          id="{NAME_ID}" name="{NAME_NAME}" class="form-control form-control-lg" placeholder="Name or Student ID"
          autofocus>
      </div>
    </div>

    <div class="col-md-4">
      <button type="submit" class="btn btn-primary float-end btn-lg" id="{SUBMIT_ID}">Search</button>
    </div>
  </div>

  <hr>

  <div class="row">
    <!-- Left Column -->
    <div class="col-md-6">

      <fieldset class="search-fieldset">
        <legend>Course</legend>

        <div class="row mb-3">
          <label class="col-md-3 col-form-label" for="{TERM_SELECT_ID}">{TERM_SELECT_LABEL_TEXT}</label>
          <div class="col-md-5">{TERM_SELECT}</div>
        </div>

        <div class="row mb-3">
          <label class="col-md-3 col-form-label" for="{COURSE_SUBJ_ID}">Subject</label>
          <div class="col-md-8">{COURSE_SUBJ}</div>
        </div>

        <div class="row mb-3">
          <label class="col-md-3 col-form-label" for="{COURSE_NO_ID}">{COURSE_NO_LABEL_TEXT}</label>
          <div class="col-md-3">{COURSE_NO}</div>
        </div>

        <div class="row mb-3">
          <label class="col-md-3 col-form-label" for="{COURSE_SECT_ID}">{COURSE_SECT_LABEL_TEXT}</label>
          <div class="col-md-3">{COURSE_SECT}</div>
        </div>

        <div class="row mb-3">
          <label class="col-md-3 col-form-label" for="{TYPE_ID}">{TYPE_LABEL_TEXT}</label>
          <div class="col-md-8">{TYPE}</div>
        </div>

      </fieldset>

      <fieldset class="search-fieldset">
        <legend>Faculty</legend>
      </fieldset>

      <div class="row mb-3">
        <label class="col-md-3 col-form-label" for="{DEPARTMENT_ID}">{DEPARTMENT_LABEL_TEXT}</label>
        <div class="col-md-8">{DEPARTMENT}</div>
      </div>

      <div class="row mb-3">
        <label class="col-md-3 col-form-label" for="{FACULTY_ID}">{FACULTY_LABEL_TEXT}</label>
        <div class="col-md-8">{FACULTY}</div>
      </div>

      <!-- Level & Major Fieldset -->
      <fieldset>
        <div id="MajorSelector"></div>
      </fieldset>

    </div> <!-- End Left Column -->

    <!-- Right Column -->
    <div class="col-md-6">

      <fieldset class="search-fieldset">
        <legend>Location</legend>

        <div class="row mb-3">
          <label class="col-md-3 form-label" for="campus">Campus</label>
          <div class="col-md-8">
            <div class="btn-group" role="group" aria-label="Campus selection">
              <input type="radio" class="btn-check" name="campus" value="-1" id="campus-any-radio" checked>
              <label class="btn btn-outline-secondary" for="campus-any-radio">Any Campus</label>

              <input type="radio" class="btn-check" name="campus" value="main_campus" id="campus-main-radio">
              <label class="btn btn-outline-secondary" for="campus-main-radio">Main Campus</label>

              <input type="radio" class="btn-check" name="campus" value="distance_ed" id="campus-distance-radio">
              <label class="btn btn-outline-secondary" for="campus-distance-radio">Distance Ed</label>
            </div>
          </div>
        </div>

        <div id="LocationSelector"></div>

      </fieldset>

      <fieldset>
        <legend>Date Range</legend>
        <div class="row mb-3">
          <label class="col-md-3 form-label" for="{START_DATE_ID}">{START_DATE_LABEL_TEXT}</label>
          <div class="col-md-6">{START_DATE}</div>
        </div>

        <div class="row mb-3">
          <label class="col-md-3 form-label" for="{END_DATE_ID}">{END_DATE_LABEL_TEXT}</label>
          <div class="col-md-6">{END_DATE}</div>
        </div>
      </fieldset>


      <fieldset>
        <legend>Status</legend>
        <div class="row mb-3">
          <div class="col-md-10">
            <div class="card">
              <div class="card-body">
                <!-- BEGIN workflow_state_repeat -->
                <div class="form-check">
                  {WORKFLOW_STATE}
                  <label for="{WORKFLOW_STATE_ID}">{WORKFLOW_STATE_LABEL_TEXT}</label>
                </div>
                <!-- END workflow_state_repeat -->
              </div>
            </div>
          </div>
        </div>

        <div class="row mb-3">
          <label class="col-md-4 form-label" for="oied">International Certification</label>
          <div class="col-md-8">
            <div class="btn-group">
              <input type="radio" class="btn-check" name="oied" value="-1" id="btn-oied-any" checked>
              <label for="btn-oied-any" class="btn btn-outline-secondary">Any</label>

              <input type="radio" class="btn-check" name="oied" value="0" id="btn-oied-no">
              <label for="btn-oied-no" class="btn btn-outline-secondary">Non-Certified</label>

              <input type="radio" class="btn-check" name="oied" value="1" id="btn-oied-yes">
              <label for="btn-oied-yes" class="btn btn-outline-secondary">Certified</label>
            </div>
          </div>
        </div>
      </fieldset>

    </div>
  </div>
  <div class="row">
    <div class="col-md-4 offset-md-8">
      <div class="mb-3">
        <button type="submit" class="btn btn-primary" name="{SUBMIT_NAME}" value="Search">Search</button>
        <button type="button" name="reset" class="btn btn-outline-secondary">Clear Fields</button>
      </div>
    </div>
  </div>
</form>

<script type="text/javascript" src="{vendor_bundle}"></script>
<script type="text/javascript" src="{entry_bundle}"></script>
<script type="text/javascript" src="{major_bundle}"></script>