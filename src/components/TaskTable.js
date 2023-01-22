import React, {Component} from 'react'

class TaskTable extends Component {


    render(){
        return(
           <tr>
                <td>{this.props.index}</td>
                <td>{this.props.name}</td>
                <td></td>
           </tr>
        );
    }
}
export default TaskTable;