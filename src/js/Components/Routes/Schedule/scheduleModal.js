import React, { Component } from 'react';
import { Button, Col, Icon, Select, TextInput, TimePicker, Modal, Range, Row } from 'react-materialize';

export default class scheduleModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      timePickerOptions: {
        autoClose: false,
        container: 'body',
        defaultTime: 'now',
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
      modalOptions: {
        dismissible: true,
        endingTop: '10%',
        inDuration: 250,
        opacity: 0.5,
        outDuration: 250,
        preventScrolling: true,
        startingTop: '4%'
      },
    };

    this.handleModalSave = this.handleModalSave.bind(this);
  }

  handleModalSave(e) {
    const { modalId } = this.props;

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

    //console.log(JSON.stringify(scheduleItem));
    M.Modal.getInstance($(`#${modalId}`)).close();
    this.props.onScheduleChange(scheduleItem);
  }

  render() {
    const { modalOptions, timePickerOptions } = this.state;
    const { buttonTitle, modalId } = this.props;

    return(
      <Modal
        header="New Schedule"
        id={modalId}
        options={modalOptions}
        trigger={<Button node="button" waves="light">{buttonTitle}<Icon right>playlist_add</Icon></Button>}
        actions={[
          <Button modal="close" node="button" className="left red">Cancel</Button>,
          <Button type="submit" form="schedule" node="button" className="modal-action green">{buttonTitle}</Button>
        ]}
      >
        <Row>
          <Col s={12}>
            <form id="schedule" onSubmit={this.handleModalSave}>
              <Range id="schedule-duration" itemname="duration" min="1" max="120" name="schedule-duration" />
              <TextInput id="schedule-name" itemname="name" label="Schedule Name" required={true} validate={true} />

              <TimePicker
                id="schedule-start"
                itemname="start"
                label="When"
                options={timePickerOptions}
                required={true}
                validate={true}
              />

              <Select id="schedule-days" itemname="days" label="Days" multiple value={['2','4']} required={true} validate={true}>
                <option value='1'>Sunday</option>
                <option value='2'>Monday</option>
                <option value='3'>Tuesday</option>
                <option value='4'>Wednesday</option>
                <option value='5'>Thursday</option>
                <option value='6'>Friday</option>
                <option value='7'>Saturday</option>
              </Select>

            </form>
          </Col>
        </Row>
      </Modal>
    );
  }

}
