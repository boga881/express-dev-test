import React, { Component } from 'react'
import moment from 'moment';
import { connect } from 'react-redux';
import { updateHistory } from 'Actions/history';
import Loading from 'Components/Loading';

class HistoryComponent extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (!this.props.initialized) {
      this.props.dispatch(updateHistory());
    }
  }

  render() {
    const {initialized, loading, items } = this.props;
    const isLoading = (!initialized && loading);

    return (
      <React.Fragment>

        {isLoading &&
          <Loading />
        }

        { !isLoading &&
          <div>
            <h3>History</h3>
            {(items && items.length > 0) &&
              <ul className='collection'>
                {items.map(i => {
                  return <li key={i.id} className='collection-item'>{moment(i.timestamp,'x').format('MMM DD, hh:mm:ss a')} - {i.message} by <strong>{i.source}</strong></li>;
                })}
              </ul>
            }

            {!items &&
              <div className='col s12 m6 offset-m3'>
                <div className='card-panel green accent-4'>
                  <span className='white-text'>
                    Your watering history is currently empty. Every watering event that occurs will be recorded here.
                  </span>
                </div>
              </div>
            }
          </div>
        }
      </React.Fragment>
    );
  }

}

export default connect()(HistoryComponent);
