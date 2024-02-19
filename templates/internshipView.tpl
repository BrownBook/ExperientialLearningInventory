<script type="text/javascript">
  $(document).ready(function() {
    // Setup date pickers
    $("#internship_start_date").datepicker();
    $("#internship_end_date").datepicker();
  });
</script>

<script type="text/javascript">
  var internship = {INTERNSHIP_JSON};
</script>

<h1 class="mb-4">
  <i class="fa-solid fa-edit"></i> Edit Experiential Learning Activity
</h1>

<form class="form-horizontal {FORM_CLASS}" id="{FORM_ID}" action="{FORM_ACTION}" autocomplete="{FORM_AUTOCOMPLETE}"
  method="{FORM_METHOD}" {FORM_ENCODE}>
  {HIDDEN_FIELDS}

  <div class="row mb-4">
    <div class="col-lg-1 offset-lg-6">
      <button type="submit" class="btn btn-primary" id="{SUBMIT_ID}1">{SUBMIT_VALUE}</button>
    </div>

    <div class="col-lg-1">
      <!-- BEGIN delete_btn -->
      <a href="{DELETE_URL}" class="btn btn-outline-danger"
        onclick="return confirm('Are you sure you want to delete this internship?');">Delete</a>
      <!-- END delete_btn -->
    </div>

    <div class="col-lg-2">
      <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
        <i class="fa-solid fa-copy"></i> Continue This Activity <span class="caret"></span>
      </button>
      <ul class="dropdown-menu">
        <!-- BEGIN CONTINUE_TERM_LIST -->
        <li><a class="dropdown-item"
            href="index.php?module=intern&action=copyInternshipToNextTerm&internshipId={INTERN_ID}&destinationTerm={DEST_TERM}"><i
              class="fa fa-fast-forward"></i> Continue in {DEST_TERM_TEXT}</a></li>
        <!-- END CONTINUE_TERM_LIST -->

        <!-- BEGIN CONTINUE_TERM_NO_TERMS -->
        <li><a class="dropdown-item" href="" class="text-muted" style="color:#777; pointer-events: none"
            disabled>{CONTINUE_TERM_NO_TERMS}</a></li>
        <!-- END CONTINUE_TERM_NO_TERMS -->
      </ul>
    </div>

    <!-- BEGIN generateContractButton -->
    {GENERATE_CONTACT_BUTTON_ENABLE}
    <div class="col-lg-2">
      <button type="button" id="contract-button" class="btn btn-secondary pull-right generateContract"><i
          class="fa-solid fa-file"></i> Generate Contract</button>
    </div>
    <!-- END generateContractButton -->
  </div>

  <div class="row">
    <!-- Left column -->
    <div class="col-lg-6">
      <!-- Student info section -->
      <fieldset>
        <legend>Student</legend>

        <div class="row mb-2">
          <label class="col-lg-3 col-form-label" for="bannerid">Student Id</label>
          <div class="col-lg-6">
            <p id="bannerid" class="form-control-plaintext">{BANNER}</p>
          </div>
        </div>

        <div class="row mb-2 required">
          <label class="col-lg-3 col-form-label" for="{STUDENT_FIRST_NAME_ID}">{STUDENT_FIRST_NAME_LABEL_TEXT}</label>
          <div class="col-lg-6">{STUDENT_FIRST_NAME}</div>
        </div>

        <div class="row mb-2">
          <label class="col-lg-3 col-form-label" for="{STUDENT_MIDDLE_NAME_ID}">{STUDENT_MIDDLE_NAME_LABEL_TEXT}</label>
          <div class="col-lg-6">{STUDENT_MIDDLE_NAME}</div>
        </div>

        <div class="row mb-3 required">
          <label class="col-lg-3 col-form-label" for="{STUDENT_LAST_NAME_ID}">{STUDENT_LAST_NAME_LABEL_TEXT}</label>
          <div class="col-lg-6">{STUDENT_LAST_NAME}</div>
        </div>

        <div class="row mb-3 required">
          <label class="col-lg-3 col-form-label" for="{STUDENT_EMAIL_ID}">{STUDENT_EMAIL_LABEL_TEXT}</label>
          <div class="col-lg-6">
            <div class="input-group">
              <div class="input-group">
                {STUDENT_EMAIL}<span class="input-group-text">{STUDENT_EMAIL_DOMAIN}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="row mb-2">
          <label class="col-lg-3 col-form-label" for="{STUDENT_ADDRESS_ID}">{STUDENT_ADDRESS_LABEL_TEXT}</label>
          <div class="col-lg-6">{STUDENT_ADDRESS}</div>
        </div>

        <div class="row mb-2">
          <label class="col-lg-3 col-form-label" for="{STUDENT_ADDRESS2_ID}">{STUDENT_ADDRESS2_LABEL_TEXT}</label>
          <div class="col-lg-6">{STUDENT_ADDRESS2}</div>
        </div>

        <div class="row mb-2">
          <label class="col-lg-3 col-form-label" for="{STUDENT_CITY_ID}">{STUDENT_CITY_LABEL_TEXT}</label>
          <div class="col-lg-6">{STUDENT_CITY}</div>
        </div>

        <div class="row mb-2">
          <label class="col-lg-3 col-form-label" for="{STUDENT_STATE_ID}">{STUDENT_STATE_LABEL_TEXT}</label>
          <div class="col-lg-6">{STUDENT_STATE}</div>
        </div>

        <div class="row mb-3">
          <label class="col-lg-3 col-form-label" for="{STUDENT_ZIP_ID}">{STUDENT_ZIP_LABEL_TEXT}</label>
          <div class="col-lg-6">{STUDENT_ZIP}</div>
        </div>

        <div class="row mb-3">
          <label class="col-lg-3 col-form-label" for="{STUDENT_PHONE_ID}">{STUDENT_PHONE_LABEL_TEXT}</label>
          <div class="col-lg-6">{STUDENT_PHONE}</div>
        </div>

        <div class="row mb-2">
          <label class="col-lg-3 col-form-label" for="{STUDENT_GPA_ID}">GPA</label>
          <div class="col-lg-6">
            <p class="form-control-plaintext">{STUDENT_GPA}</p>
          </div>
        </div>

        <!-- BEGIN campus -->
        <div class="row mb-2">
          <label class="col-lg-3 col-form-label" for="{CAMPUS_ID}">Campus</label>
          <div id="campus" class="col-lg-6">
            <p class="form-control-plaintext">{CAMPUS}</p>
          </div>
        </div>
        <!-- END campus -->

        <div class="row mb-2">
          <label class="col-lg-3 col-form-label" for="level">Level</label>
          <div id="level" class="col-lg-6">
            <p class="form-control-plaintext">{LEVEL}</p>
          </div>
        </div>

        <div class="row mb-2">
          <label class="col-lg-3 col-form-label" for="{UGRAD_MAJOR_ID}{GRAD_MAJOR_ID}">Major / Program</label>

          <!-- BEGIN oneMajor -->
          <div class="col-lg-8">
            <p class="form-control-plaintext">{MAJOR}</p>
          </div>
          <!-- END oneMajor -->

          <div class="row">
            <!-- TODO: Check this markup and can this still even happen?? -->
            <div class="btn-group-vertical" data-toggle="buttons" role="group" aria-label="major selector">
              <!-- BEGIN majors_repeat -->
              <label class="btn btn-secondary {ACTIVE}">
                <input type="radio" name="major_code" autocomplete="off" value="{CODE}" {CHECKED}> {DESC}
              </label>
              <!-- END majors_repeat -->
            </div>
          </div>
        </div>

        <div class="row mb-2">
          <label class="col-lg-3 col-form-label" for="gradDate">Graduation Date</label>
          <div id="gradDate" class="col-lg-6">
            <p class="form-control-plaintext">{GRAD_DATE}</p>
          </div>
        </div>

        <div class="row mb-3">
          <label class="col-lg-3 col-form-label" for="credit-hours">Credit Hours</label>
          <div id="credit-hours" class="col-lg-6">
            <p class="form-control-plaintext">{ENROLLED_CREDIT_HORUS}</p>
          </div>
        </div>

        <!-- BEGIN BACK_ACTIVE -->
        <div class="row mb-3">
          <label class="col-lg-3 col-form-label" for="backgroundCheck">Background Check Needed?</label>
          <div class="col-lg-6">
            <!-- BEGIN back_check -->
            <button type="button" class="btn btn-secondary" name="background_code" id="back_check_id" value="0">
              {BACK_CHECK_REQUEST_BTN}
            </button>
            <!-- END back_check -->
            <!-- BEGIN back_check_req -->
            <button type="button" class="btn btn-secondary" name="background_code" id="back_check_id" value="1"
              disabled>
              {BACK_CHECK_REQUESTED_BTN}
            </button>
            <!-- END back_check_req -->
          </div>
        </div>
        <!-- END BACK_ACTIVE -->

        <!-- BEGIN DRUG_ACTIVE -->
        <div class="row mb-3">
          <label class="col-lg-3 col-form-label" for="drugCheck">Drug Test Needed?</label>
          <div class="col-lg-6">
            <!-- BEGIN drug_check -->
            <button type="button" class="btn btn-secondary" name="drug_code" id="drug_check_id" value="0">
              {DRUG_CHECK_REQUEST_BTN}
            </button>
            <!-- END drug_check -->
            <!-- BEGIN drug_check_req -->
            <button type="button" class="btn btn-secondary" name="drug_code" id="drug_check_id" value="1" disabled>
              {DRUG_CHECK_REQUESTED_BTN}
            </button>
            <!-- END drug_check_req -->
          </div>
        </div>
        <!-- END DRUG_ACTIVE -->

      </fieldset>

      <!-- Emergency Contact Info -->
      <fieldset>
        <legend>Emergency Contacts</legend>
        <div class="row">
          <!-- React Emergency Contact -->
          <div class="col-md-12">
            <div id="emergency-contact-list"></div>
          </div>

        </div>
      </fieldset>

      <fieldset>
        <legend>Location</legend>
        <p>
          <span class="form-text">Physical Location of Activity</span>
        </p>

        <div class="row mb-3">
          <div class="col-lg-3 col-form-label">
            <label for="location-label">Location</label>
          </div>
          <div class="col-lg-6">
            <p id="location-label" class="form-control-plaintext">{LOCATION}</p>
          </div>
        </div>

      </fieldset>

      <div class="row mb-3">
        <div class="btn-group col-lg-7" role="group" aria-label="Location Options">
          <input type="radio" class="btn-check" name="location" value="onsite" id="location_type_onsite"
            autocomplete="off" checked>
          <label class="btn btn-outline-secondary" for="location_type_onsite">On-site</label>

          <input type="radio" class="btn-check" name="location" value="virtual" id="location_type_virtual"
            autocomplete="off">
          <label class="btn btn-outline-secondary" for="location_type_virtual">Virtual</label>

          <input type="radio" class="btn-check" name="location" value="hybrid" id="location_type_hybrid"
            autocomplete="off">
          <label class="btn btn-outline-secondary" for="location_type_hybrid">Hybrid</label>
        </div>
      </div>

      <div class="row mb-2">
        <label class="col-lg-3 col-form-label" for="{LOC_ADDRESS_ID}">{LOC_ADDRESS_LABEL_TEXT}</label>
        <div class="col-lg-6">{LOC_ADDRESS}</div>
      </div>

      <div class="row mb-2">
        <label class="col-lg-3 form-label" for="{LOC_CITY_ID}">{LOC_CITY_LABEL_TEXT}</label>
        <div class="col-lg-6">{LOC_CITY}</div>
      </div>

      <!-- BEGIN loc_state -->
      <div class="row mb-2">
        <div class="col-lg-3 col-form-label">
          <label for="{LOC_STATE_ID}">State</label>
        </div>
        <div class="col-lg-6">
          <p class="form-control-plaintext">{LOC_STATE}</p>
        </div>
      </div>
      <!-- END loc_state -->

      <div class="row mb-2">
        <label class="col-lg-3 col-form-label" for="{LOC_ZIP_ID}"
          id="internship_loc_zip-label">{LOC_ZIP_LABEL_TEXT}</label>
        <div class="col-lg-6">{LOC_ZIP}</div>
      </div>

      <div class="row mb-3">
        <label class="col-lg-3 col-form-label" for="{LOC_PROVINCE_ID}">{LOC_PROVINCE_LABEL_TEXT}</label>
        <div class="col-lg-6">{LOC_PROVINCE}</div>
      </div>

      <!-- BEGIN loc_country -->
      <div class="row mb-3">
        <div class="col-lg-3 form-label">
          <label>Country</label>
        </div>
        <div class="col-lg-6">
          <p class="form-control-plaintext">{LOC_COUNTRY}</p>
        </div>
      </div>
      <!-- END loc_country -->

      <h4>Term</h4>
      <div class="row mb-2">
        <div class="col-lg-3 col-form-label">
          <label for="{TERM_ID}">Term</label>
        </div>
        <div class="col-lg-6">
          <p class="form-control-plaintext">{TERM}</p>
        </div>
      </div>

      <div class="row mb-2">
        <div class="col-lg-6 offset-lg-3">
          <p class="form-text">{TERM_DATES}</p>
        </div>
      </div>

      <div class="row mb-2">
        <label class="col-lg-3 col-form-label" for="{START_DATE_ID}">{START_DATE_LABEL_TEXT}</label>
        <div class="col-lg-6">{START_DATE}</div>
      </div>

      <div class="row mb-4">
        <label class="col-lg-3 col-form-label" for="{END_DATE_ID}">{END_DATE_LABEL_TEXT}</label>
        <div class="col-lg-6">{END_DATE}</div>
      </div>

      <h4>Course Information</h4>

      <div class="row mb-2">
        <div class="col-lg-8 offset-lg-3 mb-1">
          <div class="checkbox">
            <label>{MULTIPART}&nbsp;{MULTIPART_LABEL_TEXT}</label>
          </div>
        </div>

        <div class="col-lg-8 offset-lg-3">
          <div class="checkbox">
            <label id="secondar-part-label">{SECONDARY_PART}&nbsp;{SECONDARY_PART_LABEL_TEXT}</label>
          </div>
        </div>
      </div>

      <div class="row mb-2">
        <label class="col-lg-3 col-form-label" for="{COURSE_SUBJ_ID}">Subject</label>
        <div class="col-lg-6">{COURSE_SUBJ}</div>
      </div>

      <div class="row mb-2">
        <label class="col-lg-3 col-form-label" for="{COURSE_NO_ID}">{COURSE_NO_LABEL_TEXT}</label>
        <div class="col-lg-6">{COURSE_NO}</div>
      </div>

      <div class="row mb-2">
        <label class="col-lg-3 col-form-label" for="{COURSE_SECT_ID}">{COURSE_SECT_LABEL_TEXT}</label>
        <div class="col-lg-6">{COURSE_SECT}</div>
      </div>

      <div class="row mb-2">
        <label class="col-lg-3 col-form-label" for="{CREDITS_ID}">{CREDITS_LABEL_TEXT}</label>
        <div class="col-lg-6">
          {CREDITS} <span class="help-block"><small class="text-muted">Decimal values will be rounded.</small></span>
        </div>
      </div>

      <div class="row mb-2">
        <label class="col-lg-3 col-form-label" for="{COURSE_TITLE_ID}">{COURSE_TITLE_LABEL_TEXT}</label>
        <div class="col-lg-6">
          {COURSE_TITLE} <span class="help-block"><small class="text-muted">(Limit 28 characters; Banner)</small></span>
        </div>
      </div>

      <!-- BEGIN corequisite -->
      <h4>Corequisite Course</h4>

      <!-- TODO: Are these fields still used? -->
      <div class="row mb-2">
        <label class="col-lg-3 col-form-label" for="{CREDITS_ID}">Course Number</label>
        <div class="col-lg-6">{COREQUISITE_COURSE_NUM}</div>
      </div>

      <div class="row mb-2">
        <label class="col-lg-3 col-form-label" for="{CREDITS_ID}">Course Section</label>
        <div class="col-lg-6">{COREQUISITE_COURSE_SECT}</div>
      </div>
      <!-- END corequisite -->

      <!-- Experience Type -->
      <div class="row mb-2">
        <label class="col-lg-3 col-form-label" for="{EXPERIENCE_TYPE_ID}">{EXPERIENCE_TYPE_LABEL}</label>
        <div class="col-lg-6">{EXPERIENCE_TYPE}</div>

        <!-- Link to Informational Modal -->
        <div class="col-lg-3">
          <a href="#typeModal" id="internship-type-help-button" class="pull-right" data-toggle="modal"><i
              class="fa fa-question-circle"></i> Type Definitions</a>
        </div>

        <!-- Informational Modal -->
        <!-- TODO -->
        <div id="typeModal" class="modal fade" role="dialog">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h2>Internship Type Definitions</h2>
              </div>
              <div class="modal-body">
                <div id="internship-type-help">
                  <h3>Student Teaching</h3>
                  <p>A course requiring students to instruct or teach at an entity external to the institution,
                    generally as part of the culminating curriculum of a teacher education or certificate program.</p>

                  <h3>Practicum</h3>
                  <p>A course requiring students to participate in an approved project or proposal that practically
                    applies previously studied theory of the field or discipline under the supervision of an expert or
                    qualified representative of the field or discipline.</p>

                  <h3>Clinical</h3>
                  <p>A course requiring medical- or healthcare-focused experiential work where students test, observe,
                    experiment, or practice a field or discipline in a hands-on or simulated environment.</p>

                  <h3>Internship</h3>
                  <p>A course requiring students to participate in a partnership, professional employment, work
                    experience or cooperative education with any entity external to the institution, generally under the
                    supervision of an employee of the external entity.</p>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-primary pull-right" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- End of left column -->


    <!-- Right Column -->
    <div class="col-lg-6">
      <!-- Status -->
      <fieldset>
        <legend>Status</legend>
        <p>
          Current Status: <strong>{WORKFLOW_STATE}</strong>
        </p>
        <div class="card mb-3">
          <div class="card-body">
            <h4 class="panel-title">Next status</h4>

            <!-- BEGIN workflow_action_repeat -->
            <div class="radio">
              <label>{WORKFLOW_ACTION} {WORKFLOW_ACTION_LABEL}</label>
            </div>
            <!-- END workflow_action_repeat -->
          </div>
        </div>
        <!-- BEGIN international_certification -->
        <div class="mb-3">
          <div class="col-lg-10">
            <div class="checkbox">
              <label>{OIED_CERTIFIED} {OIED_CERTIFIED_LABEL}</label>
            </div>
          </div>
        </div>
        <!-- BEGIN international_certification -->

      </fieldset>

      <!-- Faculty info -->
      <fieldset>
        <legend>Faculty Supervisor</legend>
        <div id="faculty_selector">
          <div class="row mb-2 required">
            <label class="col-lg-3 col-form-label" for="{DEPARTMENT_ID}">{DEPARTMENT_LABEL_TEXT}</label>
            <div class="col-lg-8">{DEPARTMENT}</div>
          </div>
          <div class="row mb-2">
            <label class="col-lg-3 col-form-label" for="{FACULTY_ID}">{FACULTY_LABEL_TEXT}</label>
            <div class="col-lg-8">{FACULTY}</div>
          </div>
        </div>
        <div id="faculty_details">

          <div class="row">
            <div id="faculty_change" class="col-lg-2">
              <button type="button" id="faculty-change" class="btn btn-outline-secondary btn-sm">
                <i class="fa-solid fa-chevron-left"></i> change
              </button>
            </div>
            <div id="faculty_name" class="col-lg-10 lead"></div>
          </div>

          <div class="row">
            <div class="col-lg-5 offset-lg-2">

              <p>
                <abbr title="Email address"><i class="fa fa-envelope"></i></abbr> &nbsp;<span id="faculty_email"></span>
              </p>

              <p>
                <abbr title="Phone"><i class="fa fa-phone"></i></abbr> &nbsp;<span id="faculty_phone"></span>
              </p>

            </div>

            <div class="col-lg-5">
              <i class="fa fa-map-marker"></i> &nbsp;
              <address id="faculty_address"></address>
            </div>
          </div>

        </div>
      </fieldset>

      <!-- Document List -->
      <fieldset>
        <legend>Contract &amp; Documents</legend>
        <div class="row">
          <div class="col-lg-8">
            <ul class="list-group">
              <!-- BEGIN docs -->
              <li class="list-group-item"><i class="fa fa-file"></i> {DOWNLOAD} &nbsp;{DELETE}</li>
              <!-- END docs -->
            </ul>
          </div>
          <div class="col-lg-3">{UPLOAD_DOC}</div>
        </div>
      </fieldset>

      <!-- Agency info -->
      <fieldset>
        <legend>Host Details</legend>

        <div class="row mb-2">
          <label class="col-lg-3 col-form-label" for="{AGENCY_NAME_ID}">Host Name</label>
          <div class="col-lg-6">
            <p class="form-control-plaintext">{AGENCY_NAME}</p>
          </div>
        </div>

        <div class="row mb-3">
          <label class="col-lg-3 col-form-label" for="{AGENCY_PHONE_ID}">{AGENCY_PHONE_LABEL_TEXT}</label>
          <div class="col-lg-6">{AGENCY_PHONE}</div>
        </div>

        <div class="form-check">
          {COPY_ADDRESS_AGENCY}
          <label for="internship_copy_address_agency" class="form-check-label">{COPY_ADDRESS_AGENCY_LABEL_TEXT}</label>
        </div>

        <div class="row mb-2">
          <label class="col-lg-3 col-form-label" for="{AGENCY_ADDRESS_ID}">{AGENCY_ADDRESS_LABEL_TEXT}</label>
          <div class="col-lg-6">{AGENCY_ADDRESS}</div>
        </div>

        <div class="row mb-2">
          <label class="col-lg-3 col-form-label" for="{AGENCY_CITY_ID}">{AGENCY_CITY_LABEL_TEXT}</label>
          <div class="col-lg-6">{AGENCY_CITY}</div>
        </div>

        <!-- BEGIN agency-state -->
        <div class="row mb-2">
          <label class="col-lg-3 col-form-label" for="{AGENCY_STATE_ID}">{AGENCY_STATE_LABEL_TEXT}</label>
          <div class="col-lg-6">{AGENCY_STATE}</div>
        </div>
        <!-- END agency-state -->

        <div class="row mb-3">
          <label class="col-lg-3 col-form-label" for="{AGENCY_ZIP_ID}"
            id="internship_agency_zip-label">{AGENCY_ZIP_LABEL_TEXT}</label>
          <div class="col-lg-6">{AGENCY_ZIP}</div>
        </div>

        <!-- BEGIN agency-intl -->
        <div class="row mb-2">
          <label class="col-lg-3 col-form-label" for="{AGENCY_PROVINCE_ID}">{AGENCY_PROVINCE_LABEL_TEXT}</label>
          <div class="col-lg-6">{AGENCY_PROVINCE}</div>
        </div>

        <div class="row mb-3">
          <label class="col-lg-3 col-form-label" for="{AGENCY_COUNTRY_ID}">{AGENCY_COUNTRY_LABEL_TEXT}</label>
          <div class="col-lg-6">{AGENCY_COUNTRY}</div>
        </div>
        <!-- END agency-intl -->

      </fieldset>

      <fieldset>
        <legend>Supervisor Info</legend>

        <div class="row mb-2">
          <label class="col-lg-3 col-form-label"
            for="{AGENCY_SUP_FIRST_NAME_ID}">{AGENCY_SUP_FIRST_NAME_LABEL_TEXT}</label>
          <div class="col-lg-6">{AGENCY_SUP_FIRST_NAME}</div>
        </div>

        <div class="row mb-2">
          <label class="col-lg-3 col-form-label"
            for="{AGENCY_SUP_LAST_NAME_ID}">{AGENCY_SUP_LAST_NAME_LABEL_TEXT}</label>
          <div class="col-lg-6">{AGENCY_SUP_LAST_NAME}</div>
        </div>

        <div class="row mb-2">
          <label class="col-lg-3 col-form-label" for="{AGENCY_SUP_TITLE_ID}">{AGENCY_SUP_TITLE_LABEL_TEXT}</label>
          <div class="col-lg-6">{AGENCY_SUP_TITLE}</div>
        </div>

        <div class="row mb-2">
          <label class="col-lg-3 col-form-label" for="{AGENCY_SUP_EMAIL_ID}">{AGENCY_SUP_EMAIL_LABEL_TEXT}</label>
          <div class="col-lg-6">{AGENCY_SUP_EMAIL}</div>
        </div>

        <div class="form-check">
          {COPY_ADDRESS}
          <label for="internship_copy_address" class="form-check-label">{COPY_ADDRESS_LABEL_TEXT}</label>
        </div>

        <div class="row mb-2">
          <label class="col-lg-3 col-form-label" for="{AGENCY_SUP_PHONE_ID}">{AGENCY_SUP_PHONE_LABEL_TEXT}</label>
          <div class="col-lg-6">{AGENCY_SUP_PHONE}</div>
        </div>

        <div class="row mb-2">
          <label class="col-lg-3 col-form-label" for="{AGENCY_SUP_ADDRESS_ID}">{AGENCY_SUP_ADDRESS_LABEL_TEXT}</label>
          <div class="col-lg-6">{AGENCY_SUP_ADDRESS}</div>
        </div>

        <div class="row mb-2">
          <label class="col-lg-3 col-form-label" for="{AGENCY_SUP_CITY_ID}">{AGENCY_SUP_CITY_LABEL_TEXT}</label>
          <div class="col-lg-6">{AGENCY_SUP_CITY}</div>
        </div>

        <!-- BEGIN agency sup-state -->
        <div class="row mb-2">
          <label class="col-lg-3 col-form-label" for="{AGENCY_SUP_STATE_ID}">{AGENCY_SUP_STATE_LABEL_TEXT}</label>
          <div class="col-lg-6">{AGENCY_SUP_STATE}</div>
        </div>
        <!-- END agency sup-state -->

        <div class="row mb-2">
          <label class="col-lg-3 col-form-label" for="{AGENCY_SUP_ZIP_ID}"
            id="internship_agency_sup_zip-label">{AGENCY_SUP_ZIP_LABEL_TEXT}</label>
          <div class="col-lg-6">{AGENCY_SUP_ZIP}</div>
        </div>

        <!-- BEGIN agency-sup-intl -->
        <div class="row mb-2">
          <label class="col-lg-3 col-form-label" for="{AGENCY_SUP_PROVINCE_ID}">{AGENCY_SUP_PROVINCE_LABEL_TEXT}</label>
          <div class="col-lg-6">{AGENCY_SUP_PROVINCE}</div>
        </div>
        <!-- END agency-sup-intl -->

        <div class="row mb-2">
          <label class="col-lg-3 col-form-label" for="{AGENCY_SUP_COUNTRY_ID}">{AGENCY_SUP_COUNTRY_LABEL_TEXT}</label>
          <div class="col-lg-6">{AGENCY_SUP_COUNTRY}</div>
        </div>
      </fieldset>

      <fieldset>
        <legend>Compensation</legend>

        <div class="row mb-3">
          <div class="col-lg-6 offset-lg-3">
            <!-- BEGIN payment_repeat -->
            <div class="form-check form-check-inline">
              {PAYMENT}
              <label for="{PAYMENT_ID}" class="form-check-label">{PAYMENT_LABEL_TEXT}</label>
            </div>
            <!-- END payment_repeat -->

            <div class="form-check">
              {STIPEND}
              <label for="{STIPEND_ID}" class="form-check-label">&nbsp;{STIPEND_LABEL_TEXT}</label>
            </div>

            <div class="form-check">
              {CO_OP}
              <label for="{CO_OP_ID}" class="form-check-label">&nbsp;{CO_OP_LABEL_TEXT}</label>
            </div>
          </div>
        </div>

        <div class="row mb-2">
          <label class="col-lg-3 col-form-label" for="{PAY_RATE_ID}">Pay rate</label>
          <div class="col-lg-3">{PAY_RATE}</div>
        </div>

        <div class="row mb-2">
          <label class="col-lg-3 col-form-label" for="{AVG_HOURS_WEEK_ID}">{AVG_HOURS_WEEK_LABEL_TEXT}</label>
          <div class="col-lg-3">{AVG_HOURS_WEEK}</div>
        </div>

        <div class="row mb-2">
          <label class="col-lg-3 col-form-label" for="{TOTAL_HOURS_ID}">{TOTAL_HOURS_LABEL_TEXT}</label>
          <div class="col-lg-3">{TOTAL_HOURS}</div>
        </div>
      </fieldset>

      <div class="form-group">
        <button type="submit" class="btn btn-primary float-end" id="{SUBMIT_ID}2">{SUBMIT_VALUE}</button>
      </div>
    </div> <!-- End of right column -->
  </div> <!-- End of main row -->

  <div class="row mt-4 mb-4">
    <div class="col-lg-6">
      <div class="row mb-4 print-hide">
        <label for="{NOTES_ID}">Add a note</label> {NOTES}
      </div>
      <div class="form-group">
        <button type="submit" class="btn btn-primary float-end" id="{SUBMIT_ID}3">{SUBMIT_VALUE}</button>
      </div>
    </div>
  </div>

  <div class="row">
    <div class="col-lg-8">
      <div class="form-group">{CHANGE_LOG}</div>
    </div>
  </div>

  {END_FORM}

  <script type="text/javascript">
    window.internshipId = {INTERN_ID};
  </script>

  <script type="text/javascript" src="{vendor_bundle}"></script>
<script type="text/javascript" src="{entry_bundle}"></script>