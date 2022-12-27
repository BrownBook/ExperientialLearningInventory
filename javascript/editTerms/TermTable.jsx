import React from 'react';
import PropTypes from 'prop-types';

import TermRow from './TermRow.jsx';

/**
 * This file is part of Internship Inventory.
 *
 * Internship Inventory is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.

 * Internship Inventory is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License version 3
 * along with Internship Inventory.  If not, see <http://www.gnu.org/licenses/>.
 *
 * Copyright 2011-2018 Appalachian State University
 * Copyright 2020-2022 Brown Book Software, LLC
 */

class TermTable extends React.Component {
  render() {
    let termRows = null;
    if (this.props.termData != null) {
      termRows = this.props.termData.map(data => {
        return (
          <TermRow
            key={data.term}
            tcode={data.term}
            stype={data.semester_type}
            descr={data.description}
            census={data.census_date_timestamp}
            available={data.available_on_timestamp}
            start={data.start_timestamp}
            end={data.end_timestamp}
            ugradOver={data.undergrad_overload_hours}
            gradOver={data.grad_overload_hours}
            onTermSave={this.props.onTermSave}
          />
        );
      });
    } else {
      // TODO: loading spinner
      termRows = null;
    }

    return (
      <div className="termTable">
        <table className="table">
          <thead>
            <tr>
              <th>Term Code</th>
              <th>Description</th>
              <th>Semester Type</th>
              <th>Available On</th>
              <th>Drop/Add</th>
              <th>Term Start Date</th>
              <th>Term End Date</th>
              <th>
                Undergraduate<br></br>Overload Hours
              </th>
              <th>
                Graduate<br></br>Overload Hours
              </th>
            </tr>
          </thead>
          <tbody>{termRows}</tbody>
        </table>
      </div>
    );
  }
}

TermTable.propTypes = {
  termData: PropTypes.array,
  onTermSave: PropTypes.func.isRequired
};

export default TermTable;
