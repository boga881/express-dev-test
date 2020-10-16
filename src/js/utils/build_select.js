/*
 * Builds select/option list from defined parameters.
 *  select_options
 *  select_event
 *  select_value
 *
 */


 // UNUSED script
export function buildSelect() {

}


<Select options={dropdownOptions} onChange={this.selectChange} value={userConfig.valves.defaultShutoffDuration}>
  <option value='0'>Disabled</option>
  <option value='1'>1 Minute</option>
  <option value='2'>2 Minutes</option>
  <option value='5'>5 Minutes</option>
  <option value='10'>10 Minutes</option>
  <option value='15'>15 Minutes</option>
  <option value='30'>30 Minutes</option>
  <option value='60'>60 Minutes</option>
</Select>
