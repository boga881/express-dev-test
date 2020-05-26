import React, { Component } from 'react';
import { Button, Col, Icon, Select, TextInput, TimePicker, Modal, Range, Row } from 'react-materialize';

export default class scheduleModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      modalOptions: {
        dismissible: true,
        endingTop: '10%',
        inDuration: 250,
        opacity: 0.5,
        outDuration: 250,
        preventScrolling: true,
        startingTop: '4%'
      },
      timePickerOptions: {
        defaultTime: (props.vals && props.vals.start) ? props.vals.start.replace(/[A-Z]|\s/g, '') : 'now',
        autoClose: false,
        container: 'body',
        duration: 350,
        fromNow: 0,
        i18n: {
          cancel: 'Cancel',
          clear: 'Clear',
          done: 'Ok'
        },
        onCloseEnd: null,
        onCloseStart: null,
        onOpenEnd: null,
        onOpenStart: null,
        onSelect: null,
        showClearBtn: false,
        twelveHour: true,
        vibrate: true
      },
    };

    this.handleModalSave = this.handleModalSave.bind(this);
  }

  handleModalSave(e) {
    const { modalId } = this.props;

    console.log('is saving');

    e.preventDefault();
    let scheduleItem = {};
    const items = e.target;
    e.target.forEach((item) => {
      if (item.id.startsWith('schedule-')) {
        if (item.attributes.itemname.value == 'days') {
          const opitons = $('#schedule-days')[0].selectedOptions;
          let multiOptions = [];
          opitons.forEach((opt) => {
            multiOptions.push(opt.value)
          });
          scheduleItem[item.attributes.itemname.value] = multiOptions;
        } else {
          scheduleItem[item.attributes.itemname.value] = item.value;
        }
      }
    });

    M.Modal.getInstance($(`#${modalId}`)).close();
    this.props.onScheduleChange(scheduleItem);
  }

  render() {
    const { modalOptions, timePickerOptions } = this.state;
    const { buttonTitle, buttonIcon, modalId, valveOptions, vals } = this.props;
    const trigger = `trigger-${modalId}`

    const duration = (vals && vals.duration) ? vals.duration : null;
    const name = (vals && vals.name) ? vals.name : null;
    const days = (vals && vals.days) ? vals.days : [];
    const valve = (vals && vals.valve) ? vals.valve : '';
    const time = (vals && vals.start) ? vals.start : null;

    return(
      <div>
        <Modal
          header={`${buttonTitle} Schedule`}
          id={modalId}
          key={`key-${modalId}`}
          options={modalOptions}
          trigger={<Button id={trigger} node="button" waves="light">{buttonTitle}<Icon right>{buttonIcon}</Icon></Button>}
          actions={[
            <Button modal="close" node="button" className="left red">Cancel</Button>,
            <Button type="submit" form="schedule" node="button" className="modal-action green">{buttonTitle}</Button>
          ]}
        >
          <Row>
            <Col s={12}>
              <form id="schedule" onSubmit={this.handleModalSave}>
                <p className="range-field">Duration (minutes)</p>
                <Range id="schedule-duration" itemname="duration" min="1" max="120" name="schedule-duration" defaultValue={duration}/>

                <TextInput defaultValue={name} id="schedule-name" itemname="name" label="Schedule Name" required={true} validate={true} />

                <TimePicker
                  id="schedule-start"
                  itemname="start"
                  label="When"
                  options={timePickerOptions}
                  defaultValue={time}
                  required={true}
                  validate={true}
                />

                <Select id="schedule-days" itemname="days" label="Days" multiple value={days} required={true} validate={true}>
                  <option value='1'>Sunday</option>
                  <option value='2'>Monday</option>
                  <option value='3'>Tuesday</option>
                  <option value='4'>Wednesday</option>
                  <option value='5'>Thursday</option>
                  <option value='6'>Friday</option>
                  <option value='7'>Saturday</option>
                </Select>

                <Select id="schedule-valve" itemname="valve" label="Valve" value={valve} required={true} validate={true}>
                  {Object.keys(valveOptions).map((key, i) => (
                    <option key={key} value={key}>{valveOptions[key].position}</option>
                  ))}
                </Select>

              </form>
            </Col>
          </Row>
        </Modal>
      </div>
    );
  }

}
