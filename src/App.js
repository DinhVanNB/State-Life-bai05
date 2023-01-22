import './App.css';
import React, {Component} from 'react';
import TaskTable from './components/TaskTable';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listStudent: [],
      student: {
        id: '',
        name: '',
        phone: '',
        email: ''
      },
      isEdit: false
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    if (!this.state.isEdit && this.state.student.name!=='') {
      let id = this.generateId();
      let {student} = this.state;
      student.id =id;
      this
        .state
        .listStudent
        .push(student);
      this.setState({
        listStudent: this.state.listStudent,
        student: student
      },()=>localStorage.setItem('listStudent', JSON.stringify(this.state.listStudent)));
    }
    else {
      
      this.state.listStudent.map(student=>{
        
        if(student.id === this.state.student.id){
          student.name = this.state.student.name;
          student.email = this.state.student.email;
          student.phone = this.state.student.phone;
          this.setState({
            listStudent: this.state.listStudent
          },()=>localStorage.setItem('listStudent', JSON.stringify(this.state.listStudent)))
        }
      })
    }
    this.onClear();
    
  }
  onClear=()=>{
    this.setState({
      student:{
        id: '',
        name: '',
        phone: '',
        email: ''
      },
      isEdit:false
    })
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
  onChange = (e) => {
    this.setState({
      student: {
        id: this.state.student.id,
        name: e.target.type === 'text'
          ? e.target.value
          : this.state.student.name,
        phone: e.target.type === 'tel'
          ? e.target.value
          : this.state.student.phone,
        email: e.target.type === 'email'
          ? e.target.value
          : this.state.student.email
      }
    })
  }

  onRemove = (data) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa ${data.name}`)) {
      this.setState({
        listStudent: this
          .state
          .listStudent
          .filter(student => {
            return student.id !== data.id
          })
      }, () => localStorage.setItem('listStudent', JSON.stringify(this.state.listStudent)))
    }
  }
  onEdit = (data) => {
    this.setState({
      isEdit: true,
      student:{
        id: data.id,
        name: data.name,
        phone: data.phone,
        email:data.email
      }
    })
  }
 
  componentDidMount() {
    this.setState({
      listStudent: localStorage && localStorage.getItem('listStudent')
        ? JSON.parse(localStorage.getItem('listStudent'))
        : []
    })
  }

  render() {
    let {isEdit,student} = this.state;
    let TaskElement = this
      .state
      .listStudent
      .map((student) => {
        return <TaskTable
          propsRemove={this.onRemove}
          propsEdit={this.onEdit}
          data={student}
          key={student.id}/>
      });
    return (
      <div className="container align-items-center ">
        <h2>
          Student List
        </h2>
        <form onSubmit={this.onSubmit}>
          <label style={{
            width: "250px"
          }}>
            Name:&nbsp;
            <input 
            defaultValue={isEdit?student.name:''}
            className="float-end" 
            required onChange={this.onChange} 
            type="text"/>
          </label>
          <br></br>
          <label className='mt-2' style={{
            width: "250px"
          }}>
            Phone: &nbsp;
            <input 
            defaultValue={isEdit?student.phone:''}
            className="float-end" 
            required onChange={this.onChange} 
            type="tel"/>
          </label>
          <br></br>
          <label className='mt-2' style={{
            width: "250px"
          }}>
            Email: &nbsp;
            <input 
            defaultValue={isEdit?student.email:''}
            className="float-end" 
            required onChange={this.onChange} 
            type="email"/>
          </label>
          <br></br>
          <button className='mt-2 mx-5 btn btn-success' type='submit'>{isEdit
              ? 'Lưu Sửa'
              : 'Thêm Mới'}
          </button>
        </form>
        <table className='mt-5'>
          <thead>
            <tr>
              <th style={{
                width: "20%"
              }}>Name</th>
              <th style={{
                width: "15%"
              }}>Phone</th>
              <th style={{
                width: "40%"
              }}>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {TaskElement}
          </tbody>
        </table>
      </div>
    );
  }

}

export default App;
