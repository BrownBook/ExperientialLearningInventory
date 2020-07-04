import React from 'react';
import ReactDOM from 'react-dom';


function CovidRisk(props){

    /**
    Todo:
        * Save values to db
        * Set default values from saved values
        * Enables explnation only if "unkown" selected, disable otherwise
        * Set date on change of risk assessment
        * Require field to save, show error if no risk assessment
        * Show error if "unknown" selected but no explanation given

     **/


    return(
        <div>
          <fieldset>
            <legend>COVID-19 Exposure Risk</legend>
            <div className="form-group">
              <label className="col-lg-3 control-label" htmlFor="covid19_risk" id="covid19-risk-label">Risk of Exposure</label>
              <div className="col-lg-4">
                <select id="covid19_risk" name="covid19_risk" className="form-control">
                  <option>Select...</option>
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                  <option>Unknown</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="col-lg-3 control-label" htmlFor="covid19_risk-explanation" id="covid19-explanation-label">Explanation</label>
              <div className="col-lg-8">
                <input type="text" id="covid19_explanation" name="covid19_explanation" className="form-control" placeholder="Please explain more about why the risk is unknown."/>
              </div>
            </div>

            <div className="form-group">
              <label className="col-lg-3 control-label" htmlFor="covid19_risk-date" id="covid19-date-label">Assessment Date</label>
              <div className="col-lg-8">
                <p className="form-control-static" id="covid19_risk-date">date here</p>
              </div>
            </div>
          </fieldset>

          <input type="hidden" name="covid19_risk-date" value=""/>
        </div>
    )
}

ReactDOM.render(
    <CovidRisk />, document.getElementById('covidRisk')
);
