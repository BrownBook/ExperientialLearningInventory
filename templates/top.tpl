<div class="container-fluid">
  <!-- Brand and toggle get grouped for better mobile display -->
  <a class="navbar-brand" href="#">{SYSTEM_NAME}</a>
  <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <!-- Collect the nav links, forms, and other content for toggling -->
  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
      <li class="nav-item">
        <a class="nav-link" href="index.php?module=intern&action=ShowAddInternship"><i class="fa-solid fa-plus"></i> Add
          Activity</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="index.php?module=intern&action=search"><i class="fa-solid fa-magnifying-glass"></i>
          Search</a>
      </li>
      <li class="nav-item"><a class="nav-link" href="mailto:{HELP_ADDRESS}?subject={SYSTEM_NAME} Help Request"><i
            class="fa fa-question"></i> Get Help</a></li>
    </ul>

    <ul class="navbar-nav">
      <!-- BEGIN admin_links -->
      {ADMIN_OPTIONS}
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          <i class="fa fa-cog"></i> Settings
        </a>
        <ul class="dropdown-menu">
          <!-- BEGIN terms -->
          <li>{EDIT_TERMS_LINK}</li>
          <!-- END terms -->
          <!-- BEGIN admins -->
          <li>{EDIT_ADMINS_LINK}</li>
          <!-- END admins -->
          <!-- BEGIN depts -->
          <li>{EDIT_DEPARTMENTS_LINK}</li>
          <!-- END depts -->
          <!-- BEGIN majors -->
          <li>{EDIT_MAJORS_LINK}</li>
          <!-- END majors -->
          <!-- BEGIN level -->
          <li>{EDIT_STUDENT_LEVEL}</li>
          <!-- END level -->
          <!-- BEGIN courses -->
          <li>{EDIT_COURSES_LINK}</li>
          <!-- END courses -->
          <!-- BEGIN states -->
          <li>{EDIT_STATES_LINK}</li>
          <!-- END states -->
          <!-- BEGIN affiliation_agreement -->
          <li>{AFFIL_AGREE_LINK}</li>
          <!-- END affiliation_agreement -->
          <li>
            <hr class="dropdown-divider">
          </li>
          <!-- BEGIN student_import -->
          <li>{STUDENT_IMPORT}</li>
          <!-- END student_import -->
          <!-- BEGIN internship_import -->
          <li>{ACTIVITY_IMPORT}</li>
          <!-- END internship_import -->
          <li>
            <hr class="dropdown-divider">
          </li>
          <!-- BEGIN settings -->
          <li>{ADMIN_SETTINGS}</li>
          <!-- END settings -->
          <!-- BEGIN ctrl_panel -->
          <li>{CONTROL_PANEL}</li>
          <!-- END ctrl_panel -->
        </ul>
      </li>
      <!-- END admin_links -->

      <!-- BEGIN user_full_name -->
      <li class="nav-item">
        <a href="#">{USER_FULL_NAME}</a>
      </li>
      <!-- BEGIN user_full_name -->

      <!-- BEGIN password_dropdown -->
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          {PASSWORD_DROPDOWN_NAME}
        </a>
        <ul class="dropdown-menu">
          <li><a class="dropdown-item" href="index.php?module=users&action=user&tab=my_page">Change Password</a></li>
      </li>
      <!-- END password_dropdown -->

    </ul>
  </div>
</div>