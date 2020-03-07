import React from 'react'
import MaterialTable from 'material-table'

export default function Table(props) {
    return(
        <MaterialTable columns={this.props.columns} data={this.props.data}/>
    )
}