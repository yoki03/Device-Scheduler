import React, { useMemo, useState } from 'react'
import { useTable, useSortBy, useRowSelect } from 'react-table'
import { COLUMNS } from './Deviceinfo-columns'
import Data from './info.json'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button, Form, InputGroup, Modal } from 'react-bootstrap'
import { Checkbox } from './Checkbox'
import './DeviceInfo.css'

function DeviceInfo() {
  const [modalShow, setModalShow] = useState(false);
  const [editdata, setEditdata] = useState({});
  const navigate = useNavigate();
  const location = useLocation();

  const adr = location.state
  

  const handleLogin = () => {
    navigate("/");
  }
  const handleSubmit = () => {
    const p = {
      sdate : (document.getElementById('sdate')).value,
      stime : (document.getElementById('stime')).value,
      edate : (document.getElementById('edate')).value,
      etime : (document.getElementById('etime')).value,
      reason : (document.getElementById('reason')).value
    }
    console.log(p);
  }

  const columns = useMemo(() => COLUMNS, [])
  const data = useMemo(() => Data, [])

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
    toggleAllRowsSelected,
  } = useTable({
    columns,
    data
  },
  useSortBy, useRowSelect,
  (hooks) => {
    hooks.visibleColumns.push((columns) => {
        return [
            {
                id: 'selection',
                Cell: ({row}) => (
                    <Checkbox
                       {...row.getToggleRowSelectedProps({
                          onChange: () => {
                            const selected = row.isSelected; // get selected status of current row.
                            toggleAllRowsSelected(false); // deselect all.
                            row.toggleRowSelected(!selected); // reverse selected status of current row.
                        },
                       })}
                    />
                 )
            },
            ...columns
        ]
    })
  })

  const handleData = (p) => {
    if (p.length === 0){
      console.log(p);
    }else{
      console.log(p);
    }
  }
  const handleEdit = (p) => {
    if (p.length === 0){
      return false;
    }else{
      setEditdata(p[0]);
      setModalShow(true);
    }
  }

  return (
    <div className='infopage'>
      <div className='navbar'>
            <h1>Device Scheduler</h1>
            <Button variant="light" onClick={()=>handleLogin()}>LOGOUT</Button>
      </div>
      <div className='forms'>
              <h1>{adr.ip}</h1>
              <p>Enter scheduling Details.</p>

              <Form.Group className="mb-3">
              <Form.Label>From Date:</Form.Label>
                <InputGroup size="lg" className="mb-3">
                  <Form.Control
                    id="sdate"
                    type="date"
                    placeholder="--/--/---"
                  />
                  <Form.Control
                    id="stime"
                    type="time"
                    placeholder="hh:mm:ss"
                  />
                </InputGroup>
                <Form.Label>To Date:</Form.Label>
                <InputGroup size="lg" className="mb-3">
                  <Form.Control
                    id="edate"
                    type="date"
                    placeholder="--/--/---"
                  />
                  <Form.Control
                    id="etime"
                    type="time"
                    placeholder="hh:mm:ss"
                  />
                </InputGroup>
                <Form.Label>Reason</Form.Label>
                <Form.Control id="reason" as="textarea" rows={3} />
                <Button className='submitinfo' variant='outline-secondary' type='button' onClick={() => {handleSubmit()}}>Reserve</Button>
              </Form.Group>
            </div>
      <div className='reservations'>
      <div className='buttons'>
      <Button
        variant='outline-secondary' 
        type='button' 
        onClick={() => 
          handleEdit(selectedFlatRows.map(row => row.original))}
      >
        Edit
      </Button>
      <Button variant='outline-secondary' type='button' onClick={() => handleData(selectedFlatRows.map(row => row.original))}>Delete</Button>
      </div>
        <div className='scrollable'>
          <table className='table' {...getTableProps()}>
          <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    {column.render('Header')}
                                    <span>
                                        {column.isSorted ? column.isSortedDesc ? ' 🔽' : ' 🔼' : ''}
                                        </span>
                                </th>
                                ))}
                            </tr>
                        ))}
                </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map(row => {
                prepareRow(row)
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map(cell => {
                      return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    })}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
      <MyVerticallyCenteredModal
        data={editdata}
        show={modalShow}
        onHide={() => setModalShow(false)}/>
    </div>
  )
}

function MyVerticallyCenteredModal(props) {
  const obj = props.data;
  console.log(obj);
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit Schedule
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form.Group className="mb-3">
              <Form.Label>From Date:</Form.Label>
                <InputGroup size="lg" className="mb-3">
                  <Form.Control
                    id="sdate"
                    type="date"
                    placeholder="--/--/---"
                    value = {obj.sdate}
                  />
                  <Form.Control
                    id="stime"
                    type="time"
                    placeholder="hh:mm:ss"
                    value = {obj.stime}
                  />
                </InputGroup>
                <Form.Label>To Date:</Form.Label>
                <InputGroup size="lg" className="mb-3">
                  <Form.Control
                    id="edate"
                    type="date"
                    placeholder="--/--/---"
                    value = {obj.edate}
                  />
                  <Form.Control
                    id="etime"
                    type="time"
                    placeholder="hh:mm:ss"
                    value = {obj.etime}
                  />
                </InputGroup>
                <Form.Label>Reason</Form.Label>
                <Form.Control id="reason" as="textarea" value = {obj.reason} rows={2} />
              </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeviceInfo