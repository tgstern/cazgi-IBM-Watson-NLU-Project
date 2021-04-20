import React from 'react';
import './bootstrap.min.css';

class EmotionTable extends React.Component {

    constructor(props) {
        super(props)
        const emotionsArray = Object.entries(this.props.emotions)
        this.state = {emotions: emotionsArray}
    }

    render() {
      return (  
        <div>
          <table className="table table-bordered">
            <tbody>
            {
                this.state.emotions.map((entry) => (
                    <tr>
                        <td>{entry[0]}</td>
                        <td>{entry[1]}</td>
                    </tr>
                    )
                )
            }
            </tbody>
          </table>
          </div>
          )
    }
}

export default EmotionTable;
