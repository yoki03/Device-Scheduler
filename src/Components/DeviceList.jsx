import { useMemo } from 'react'
import { useTable, useSortBy, useRowSelect } from 'react-table'
import Mock from './mock.json'
import { COLUMNS } from './Devicelist-columns'
import { Button } from 'react-bootstrap'
import './DeviceList.css'
import { useNavigate } from 'react-router-dom';
import { Checkbox } from './Checkbox'

function DeviceList() {

    const columns = useMemo(() => COLUMNS, [])
    const data = useMemo(() => Mock, [])

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
    } )

    const navigate = useNavigate();
    const handleLogin = () => {
        navigate("/");
    }

    const handleData = (p) => {
        console.log(p)
        if (p.length === 0){
            navigate("/devicelist");
        }else{
            navigate("/deviceinfo",{state:(p[0])});
        }
    }

  return (
    <div className='infopage'>
        <div className='navbar'>
            <h1>Device Scheduler</h1>
            <Button variant="light" onClick={()=>handleLogin()}>LOGOUT</Button>
        </div>
        
        <div>
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
                                return <td {...cell.getCellProps()}>
                                    {cell.render('Cell')}
                                    </td>
                            })}
                        </tr>
                    )
                })}
            </tbody>
        </table>
        <div className='buttons'>
        <Button variant='outline-secondary' type='button' onClick={() => handleData(selectedFlatRows.map(row => row.original))}>View and Manage Reservation</Button>
        </div>
        </div>

    </div>
  )
}

export default DeviceList