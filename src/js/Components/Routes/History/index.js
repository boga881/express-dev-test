import React, { Component } from 'react';
import { getHistory } from 'actions/history.js'
import moment from 'moment';
import Loading from 'components/Loading';
import { Col, Row } from 'react-materialize';
const devServerEnabled = process.env.NODE_ENV !== 'production';

export default class HistoryComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      history: null,
      isLoading: true,
    };
  }

  getHistory = async () => {
    const result = await getHistory()

    if (typeof result !== 'undefined' && result.success) {
      const historyList = result.message.history;
      let historySorted = Object.keys(historyList).map(key => historyList[key]);
      historySorted.sort((a, b) =>  new Date(b.timestamp) - new Date(a.timestamp));

      this.setState({
        history: historySorted,
        isLoading: false,
      });
    }
  }

  componentDidMount() {
    const history = this.getHistory();
  }

  render() {
    const { history, isLoading } = this.state;

    if (history === null) {
      return (
        <React.Fragment>
            <Loading />
        </React.Fragment>
      );
    }

    const emptyHistory = Object.keys(history).length === 0;

    return(
      <Row>
        <Col s={12}>
          <h3>History</h3>
          <p>All watering events are listed here with the latest at the top.</p>

          {emptyHistory &&
            <p>Your shedule is currently empty.</p>
          }

          {!emptyHistory &&
            <table className="striped responsive-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Name</th>
                  <th>Valve</th>
                  <th>Action</th>
                  <th>Schedule</th>
                </tr>
              </thead>

              <tbody>
                {Object.keys(history).map((key, i) => (
                  <tr key={history[key].timestamp}>
                    <td>{moment(history[key].timestamp,'x').format('HH:mm, ddd DD MMM YY')}</td>
                    <td>{history[key].name}</td>
                    <td>{history[key].source}</td>
                    <td>{history[key].action}</td>
                    <td>{history[key].schedule}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          }
        </Col>
      </Row>
    );
  }

}
