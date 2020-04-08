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

      // let array = Object.keys(historyList).map(key => historyList[key]);
      // array.sort((itemA, itemB) =>  itemB - itemA);
      //
      // let json = {};
      // for (var i = 0; i < array.length; i++) {
      //   json[array[i]] = array[i];
      // }

      this.setState({
        history: historyList,
        isLoading: false,
      });
    }
  }

  componentDidMount() {
    const history = this.getHistory();
  }

  render() {
    const { history, isLoading } = this.state;

    if (devServerEnabled) {
      console.group("--- history ----");
      console.log(JSON.stringify(history));
      console.groupEnd();
    }

    if (history === null) {
      return (
        <React.Fragment>
            <Loading />
        </React.Fragment>
      );
    }

    return(
      <React.Fragment>
        {!isLoading &&
          <div className='row'>
            <h3>History</h3>
            <Row>
              <Col s={12}>
                <table className="striped responsive-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Valve</th>
                      <th>Action</th>
                      <th>Zone</th>
                      <th>Schedule</th>
                    </tr>
                  </thead>

                  <tbody>
                    {Object.keys(history).map((key, i) => (
                      <tr key={key}>
                        <td>{moment(key,'x').format('ddd MMM DD, hh:mm:ss a')}</td>
                        <td>{history[key].source}</td>
                        <td>{history[key].action}</td>
                        <td>{history[key].zone}</td>
                        <td>{history[key].schedule}</td>
                      </tr>
                    ))}
                </tbody>
            </table>
            </Col>
          </Row>
        </div>
        }
      </React.Fragment>
    );
  }

}
