import React, {Component} from 'react'

class TaskTable extends Component {


    render(){
        return(
           <tr>
                <td>{this.props.data.name}</td>
                <td>{this.props.data.phone}</td>
                <td>{this.props.data.email}</td>
                <td>
                    <button onClick={()=>this.props.propsEdit(this.props.data)} className='btn btn-warning'>
                        Edit
                    </button>
                    &nbsp;
                    <button onClick={()=>this.props.propsRemove(this.props.data)} className='btn btn-danger'>
                        Delete
                    </button>
                </td>
           </tr>
        );
    }
}
export default TaskTable;