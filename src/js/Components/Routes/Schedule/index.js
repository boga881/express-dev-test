import React, { Component } from 'react';
import { getHistory } from 'actions/history.js'
import moment from 'moment';
import Loading from 'components/Loading';
import { Button, Col, Icon, Modal, Row } from 'react-materialize';
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
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
            </p>
          </Modal>



        </Col>
      </Row>
    );
  }

}
