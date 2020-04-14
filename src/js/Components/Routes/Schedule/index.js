import React, { Component } from 'react';
import { getHistory } from 'actions/history.js'
import moment from 'moment';
import Loading from 'components/Loading';
import { Button, Col, Icon, Select, TextInput, TimePicker, Modal, Range, Row } from 'react-materialize';
const devServerEnabled = process.env.NODE_ENV !== 'production';

export default class ScheduleComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      history: null,
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
  }

  getHistory = async () => {
    const dan = true;
    // const result = await getHistory()
    //
    // if (typeof result !== 'undefined' && result.success) {
    //   const historyList = result.message.history;
    //   let historySorted = Object.keys(historyList).map(key => historyList[key]);
    //   historySorted.sort((a, b) =>  new Date(b.timestamp) - new Date(a.timestamp));
    //
    //   this.setState({
    //     history: historySorted,
    //     isLoading: false,
    //   });
    // }
  }

  componentDidMount() {
    const history = this.getHistory();
  }

  handleModalSave = (e) => {
    e.preventDefault();
    let scheduleItem = {};
    const items = e.target;
    e.target.forEach((item) => {
      if (item.id.startsWith('schedule-')) {
        console.log(`save this value: ${item.id}`);
      }
    });

    console.log('boo');
  //do modal.close() after adding item
  }

  render() {
    const { history, isLoading, modalOptions, timePickerOptions } = this.state;

    // if (history === null) {
    //   return (
    //     <React.Fragment>
    //         <Loading />
    //     </React.Fragment>
    //   );
    // }

    // const emptyHistory = Object.keys(history).length === 0;
    const modalTrigger = <Button node="button" waves="light">Add<Icon right>playlist_add</Icon></Button>;

    return(
      <Row>
        <Col s={12}>
          <h3>Schedule</h3>
          <p>You current schedules are listed below. New schedules can be added using the add button.</p>

          <Modal
            actions={[
              <Button modal="close" node="button" className="left red">Cancel</Button>,
              <Button type="submit" form="schedule" node="button" className="modal-action green">Add</Button>
            ]}
            header="New Schedule"
            id="shedule_modal-add"
            options={modalOptions}
            trigger={modalTrigger}
          >
            <Row>
              <Col s={12}>
                <form id="schedule" onSubmit={this.handleModalSave}>

                  <Range id="schedule-duration" min="0" max="120" name="schedule-duration"/>

                  <TextInput id="schedule-name" label="Schedule Name" validate={true} />

                  <TimePicker
                    id="schedule-start"
                    label="When"
                    options={timePickerOptions}
                  />

                  <Select id="schedule-days" label="Days" multiple value={['2','4']}>
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



        </Col>
      </Row>
    );
  }

}
