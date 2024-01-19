import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';

const List = (props) => {

  return (
    <div className='d-flex align-items-center justify-content-between item'> 
      <div className='para'>{props.text}</div>
      <div className="actions">
        <div className='edit' onClick={() => props.editItem(props.id)}>
          <EditNoteIcon />
        </div>
        <div className='delete' onClick={() => props.deleteItem(props.id)}>
          <DeleteIcon />
        </div>
      </div>
    </div>
  )
}

export default List
