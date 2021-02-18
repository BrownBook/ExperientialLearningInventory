import * as React from 'react'
import classNames from 'classnames'
import Select from 'react-select'
//import AsyncSelect from 'react-select/async'
//import CreatableSelect from 'react-select/creatable'
import AsyncCreatableSelect from 'react-select/async-creatable';

function HostAgency() {
  const [hasError, setError] = React.useState(false)
  const [hostList, setHostList] = React.useState(null)
  //const agencyNameRef = React.useRef(null)

  // function validate() {
  //     if(agencyNameRef.current.value === ''){
  //         setError(true);
  //         //valid = false;
  //         //errors.push('Host Agency');
  //     }else{
  //         setError(false);
  //     }
  // }

  let fgClasses = classNames({
    'form-group': true,
    'has-error': hasError,
  })

  // fetch('index.php?module=intern&action=AgencyRest')
  //     .then(response => response.json())
  //     .then((result) => {
  //         result.map((row) => {
  //             return {value: row.id, label: row.name}
  //         })
  //     })
  //     .catch((error) => {
  //         console.log('Error:', error);
  //     });

  const promiseOptions = inputValue => {
    return fetch('index.php?module=intern&action=AgencyRest').then(response =>
      response.json(),
    )
  }

  // React.useEffect(() => {
  //     fetch('index.php?module=intern&action=AgencyRest')
  //         .then(response => response.json())
  //         .then((result) => {
  //             let rawHostList = result.map((row) => {
  //                 return {value: row.id, label: row.name}
  //             })
  //             console.log('Fetched host list', rawHostList)
  //             setHostList(rawHostList)
  //         })
  //         .catch((error) => {
  //             console.error('Error:', error)
  //         })
  // }, [])

  const loadingMessage = function () {
    return 'Loading Host Agencies...'
  }

  const noOptionsMessage = function () {
    return 'No Host Agencies yet. Create a new one!'
  }

  const getOptionLabel = function (option) {
    return option.name
  }

  const getOptionValue = function (option) {
    return option.id
  }

  return (
    <div className="row">
      <div className="col-sm-12 col-md-4 col-md-push-3">
        <div className={fgClasses} id="agency">
          <label htmlFor="agency" className="control-label">
            Experiential Learning Host
          </label>
          <AsyncCreatableSelect
            cacheOptions
            defaultOptions
            loadOptions={promiseOptions}
            loadingMessage={loadingMessage}
            noOptionsMessage={noOptionsMessage}
            getOptionValue={getOptionValue}
            getOptionLabel={getOptionLabel}
          />
        </div>
      </div>
    </div>
  )
}

export default HostAgency
