import React from 'react';
import './App.css';
import 'react-bootstrap';


function Complete(props){
    let percentage = 0;
    if(props.percentage[0] !== 0){
        percentage = props.percentage[0]/(props.percentage[0] + props.percentage[1]);
    }
  
    return(
      <div>
          <h5>Success rate</h5>
        <circle>{Math.round(percentage * 100 )+ '%'}</circle>

      </div>
    );
  
}
class Update extends React.Component{

    
    render(){

        return(
            <div className='update'>
                <form onSubmit={this.props.onSubmit}>
                    <label>Enter Activity</label><br/>
                    <input type="text" value={this.props.inputValue} onChange={this.props.onChange} placeholder="e.g Code" required /><br/>
                    <label>Time to Start</label><br/>
                    <input type="time" value={this.props.time} onChange={this.props.inputTime} placeholder="24hr format e.g 1200 for 12pm" required /><hr/>
                    <button type="submit" className="btn btn-success" >Save</button><hr/>
                </form>
                <Complete percentage ={this.props.percentage} />
            </div>
        );
    }
}

export default Update;