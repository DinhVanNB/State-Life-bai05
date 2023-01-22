import './App.css';
import React, {Component} from 'react';
import TaskTable from './components/TaskTable';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listJob: [],
      job: {
        id: '',
        name: ''
      }
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    let id = this.generateId();
    let job = {id: id, name: this.state.job.name}
    this.state.listJob.push(job);
    this.setState({
      listJob: this.state.listJob,
      job:{
        id: this.state.job.id,
        name: this.state.job.name
      }
    });
    if(localStorage){
      localStorage.setItem('ListJob',JSON.stringify(this.state.listJob))
    }
  }
  generateId = () => {
    let id = '';
    for (let i = 0; i < 8; i++) {
      id += Math.floor(1 + Math.random() * 0x10000)
        .toString(16)
        .substring(1);
    }
    return id;
  }
  onChange =(e)=>{
    this.setState({
      job:{
        name: e.target.value? e.target.value:this.state.job.name
      }
    })
  }

  componentDidMount(){
      this.setState({
        listJob: localStorage && localStorage.getItem('ListJob')? JSON.parse(localStorage.getItem('ListJob')):[]
      })
  }

  render() {
    
    let TaskElement = this.state.listJob.map((job,index)=>{
        return <TaskTable name={job.name} index={index} key={job.id}/>
    });
    return (
      <div className="container align-items-center text-center">
        <h2>
          Todo List
        </h2>
        <form onSubmit={this.onSubmit}>
          <input required onChange={this.onChange} type="text"/>
          <button className='mx-2 btn btn-success' type='submit'>Thêm công việc
          </button>
        </form>
        <table className='mt-5'>
          <tbody>
            <tr>
              <th>STT</th>
              <th>Nội dung công việc</th>
              <th>Ghi chú</th>
            </tr>
            {TaskElement}
          </tbody>

        </table>
      </div>
    );
  }

}

export default App;
