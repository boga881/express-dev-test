import React, { Component } from 'react';
import { getHistory } from 'actions/history.js'
import moment from 'moment';
import Loading from 'components/Loading';
import { Button, Col, Icon, Select, TextInput, Modal, Range, Row } from 'react-materialize';
const devServerEnabled = process.env.NODE_ENV !== 'production';

export default class ScheduleComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      history: null,
      isLoading: true,
      modalOptions: {
        dismissible: true,
        endingTop: '10%',
        inDuration: 250,
        onCloseEnd: null,
        onCloseStart: null,
        onOpenEnd: null,
        onOpenStart: null,
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

  render() {
    const { history, isLoading, modalOptions } = this.state;

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
              <Button modal="close" node="button" className="green">Add</Button>
            ]}
            header="New Schedule"
            id="shedule_modal-add"
            options={modalOptions}
            trigger={modalTrigger}
          >
            <Row>
              <Col s={12}>
                <form>

                  <TextInput id="schedule-label" label="Schedule Name" />

                  <label>Duration (minutes)</label>
                  <Range min="0" max="120" name="schedule-duration"/>

                  <Select id="schedule-start" label="When" multiple={false} value="2">
                    <option value='0000'>12 midnight</option>
                    <option value='0030'>12.30 a.m.</option>
                    <option value='1000'>1.00 a.m.</option>
                    <option value='1030'>1.30 a.m.</option>
                    <option value='2000'>2.00 a.m.</option>
                    <option value='2030'>2.30 a.m.</option>
                    <option value='3000'>3.00 a.m.</option>
                    <option value='3030'>3.30 a.m.</option>
                    <option value='4000'>4.00 a.m.</option>
                    <option value='4030'>4.30 a.m.</option>
                    <option value='5000'>5.00 a.m.</option>
                    <option value='5030'>5.50 a.m.</option>
                    <option value='6000'>6.00 a.m.</option>
                    <option value='6030'>6.30 a.m.</option>
                    <option value='7000'>7.00 a.m.</option>
                    <option value='7030'>7.30 a.m.</option>
                    <option value='8000'>8.00 a.m.</option>
                    <option value='8030'>8.30 a.m.</option>
                    <option value='9000'>9.00 a.m.</option>
                    <option value='9030'>9.30 a.m.</option>
                    <option value='1000'>10.00 a.m.</option>
                    <option value='1030'>10.30 a.m.</option>
                    <option value='1100'>11.00 a.m.</option>
                    <option value='1130'>11.30 a.m.</option>
                    <option value='1200'>12 noon</option>
                    <option value='1230'>12.30</option>
                    <option value='1300'>1.00 p.m.</option>
                    <option value='1300'>1.30 p.m.</option>
                    <option value='1400'>2.00 p.m.</option>
                    <option value='1430'>2.30 p.m.</option>
                    <option value='1500'>3.00 p.m.</option>
                    <option value='1530'>3.30 p.m.</option>
                    <option value='1600'>4.00 p.m.</option>
                    <option value='1630'>4.30 p.m.</option>
                    <option value='1700'>5.00 p.m.</option>
                    <option value='1730'>5.30 p.m.</option>
                    <option value='1800'>6.00 p.m.</option>
                    <option value='1830'>6.30 p.m.</option>
                    <option value='1900'>7.00 p.m.</option>
                    <option value='1930'>7.30 p.m.</option>
                    <option value='2000'>8.00 p.m.</option>
                    <option value='2030'>8.30 p.m.</option>
                    <option value='2100'>9.00 p.m.</option>
                    <option value='2130'>9.30 p.m.</option>
                    <option value='2200'>10.00 p.m.</option>
                    <option value='2230'>10.30 p.m.</option>
                    <option value='2300'>11.00 p.m.</option>
                    <option value='2330'>11.30 p.m.</option>
                  </Select>

                  <Select id="schedule-day" label="When" multiple value="2">
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
