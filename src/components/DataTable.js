import React from 'react';
import Table from 'react-toolbox/lib/table/Table.js';
import TableCell from 'react-toolbox/lib/table/TableCell.js';
import TableHead from 'react-toolbox/lib/table/TableHead.js';
import TableRow from 'react-toolbox/lib/table/TableRow.js';
import {Button} from 'react-toolbox/lib/button';

const DataTable = (props) => {
  return (
    <Table selectable={false} style={{width: '50%'}}>
      <TableHead >
        <TableCell >Name</TableCell>
        <TableCell >Colors</TableCell>
        <TableCell >Action</TableCell>
      </TableHead>
      {props.products.map(product =>{
        const color = product.color;
        return (
          <TableRow key={product.name}>
            <TableCell style={{width: '30%'}}>{product.name}</TableCell>
            <TableCell style={{width: '30%'}}>
              {color instanceof Array ? color.join(',') : color}
            </TableCell>
            <TableCell >
              <Button label='DEL'
                      accent
                      onClick={(e)=>{props.handleDelete(product.name)}}
              />
            </TableCell>
          </TableRow>
        );
      })}
    </Table>
  );
};

export default DataTable;
