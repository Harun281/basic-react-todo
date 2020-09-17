import React from 'react';
import './App.css';
import 'react-bootstrap';
import Update from './update';



function Container(props){
  let item = '';
  if(props.items.work.length === 0){
    item = <tr><td colSpan="4">You have no activity lined up for you. Update!</td></tr>
  }else{
    item = props.items.work.map((value,index) =>
    <tr
      className="list" 
      key={index}>
      <td><input type="checkbox" value={index}  onChange={props.checkboxAction} checked={props.checkedStatus[index]} /></td>
      <td>{value}</td>
      <td>{props.items.time[index]}</td>
      <td><button class={"fa fa-times " +(props.checkedStatus[index]?'': 'displayNone')}  aria-hidden="true" value={index} onClick={props.deleteOne} style={{color:'red'}} ></button></td>
      <td><button class={"fa fa-pencil"+(props.checkedStatus[index]?'': 'displayNone')} aria-hidden="true" value={index} onClick={props.handleEdit} style={{color:"blue"}}></button></td>
      <td><button class={"fa fa-check-square-o"+(props.checkedStatus[index]?'': 'displayNone')} aria-hidden="true" value={index} onClick={props.markCompleted} style={{color:'green'}}></button></td>
    </tr>
  );
  }
const thead1 =  <tr>
                  <th></th>
                  <th>Activity</th>
                  <th>Time</th>
                  <th>Cancel?</th>
                  <th>Edit?</th>
                  <th>Completed?</th>
                </tr>;
const thead2 =  <tr>
                  <th></th>
                  <th>Activity</th>
                  <th>Time Started</th>
                </tr>;
  return(
    <div>
      <h3>My Schedule Today</h3>
     <table>
        <thead>
        {props.checkedStatus.includes(true)? thead1: thead2}
        </thead>
        <tbody>
          {item}
        </tbody>
     </table><hr/>
    </div>
  );
}

function Action(props){
  return(
    <div className="action">
      <button className="btn btn-success" onClick={props.updateAll} >Update All</button>
      <button className="btn btn-danger" onClick={props.onClick} >Clear All</button>
    </div>
  );
}
class Todo extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      items: {work:[],time:[]},
      time: '',
      inputValue: "",
      checkedStatus: [],
      percentage: 0
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInput(event){
    this.setState({
      inputValue: event.target.value,
    });
  }
  handleTime = (event) =>{
    this.setState({
      time: event.target.value
    });
  }
  checkboxAction = (e) =>{
    let array = this.state.checkedStatus[e.target.value];
    array = !array;
    let {checkedStatus} = this.state;
    checkedStatus[e.target.value] = array;
    //console.log(checkedStatus)
    this.setState({
      checkedStatus: checkedStatus
    });
  }
  handleSubmit(event){
    this.setState(state =>({
      items: {work:state.items.work.concat(state.inputValue),time:state.items.time.concat(state.time)},
      inputValue: '',
      time: '',
      checkedStatus: state.checkedStatus.concat(false)
    }));
    event.preventDefault();
  }
 
  deleteOne = (event) =>{
    const {value} = event.target;
    let {work} = this.state.items;
    let {time} = this.state.items;
    let {checkedStatus} = this.state;
    work.splice(value,1);
    time.splice(value,1);
    checkedStatus.splice(value,1);
    this.setState({
      items:{work:work,time:time},
      checkedStatus: checkedStatus
    });
    //console.log(value)
  }

  handleEdit = (event) =>{
    this.setState({
      inputValue: this.state.items.work[event.target.value],
      time: this.state.items.time[event.target.value]
    });
  this.deleteOne(event);
  }

  markCompleted = (event) =>{
    this.deleteOne(event);
    this.setState((state) =>({
      percentage: state.percentage + 1
    }));
  }

  clearAll = () =>{
    this.setState({
      items: {work: [], time: []},
      time:'',
      inputValue: '',
      checkedStatus: []
    });
    localStorage.clear();
    console.log(localStorage.getItem('items'));
  }
  updateAll = () =>{
    localStorage.clear();
    const now = new Date();
    const items = {
      items:this.state.items,
      timeStamp: now
    }
    localStorage.setItem('items', JSON.stringify(items));
    alert("Your schedule has been saved")
    console.log(localStorage.getItem('items'));
  }
  render(){
    //


    
    return(
      <div className="container-sm">
        <h1>React Todo App</h1>
        <h4>Update Today's Schedule</h4>
        <Update 
        inputValue={this.state.inputValue} 
        time={this.state.time}
        percentage={[this.state.percentage,this.state.items.work.length]}  
        onChange={this.handleInput} 
        inputTime={this.handleTime} 
        onSubmit={this.handleSubmit}
         />
        <Container 
        items={this.state.items} 
        deleteOne={this.deleteOne}
        handleEdit = {this.handleEdit}
        checkedStatus={this.state.checkedStatus}
        checkboxAction ={this.checkboxAction}
        markCompleted={this.markCompleted}
        />
        <Action
        onClick={this.clearAll}
        updateAll={this.updateAll}
        />

      </div>
    );
  }
}

export default Todo;
