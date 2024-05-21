"use client";
import React from "react"
import PropTypes from 'prop-types'
import {Box, Paper, Typography} from "@mui/material"

function EventItem(props) {
  const {
    event,
    rowId,
    sx,
    boxSx,
    elevation,
    isMonthMode,
    onDragStart
  } = props;

  const handleItemClick = () => {
    let id = props.event.id.replace('event-', '');
    window.location.href = `/actividad/${id}`;
  };
  
  return (
    <Paper
      sx={{ ...sx, overflow: 'hidden', height: sx.height }}
      draggable
      onClick={handleItemClick} // Usar la función handleItemClick como manejador de clic
      onDragStart={onDragStart}
      elevation={elevation || 0}
      key={`item-d-${event?.id}-${rowId}`}
    >
      <Box sx={boxSx}>
        <Typography variant="body2" sx={{fontSize: 14, marginTop:"4%"}}>
          {event?.label}
        </Typography>
      </Box>
    </Paper>
  );
}


EventItem.propTypes = {
  sx: PropTypes.object,
  boxSx: PropTypes.object,
  event: PropTypes.object.isRequired,
  rowId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  isMonthMode: PropTypes.bool,
  onClick: PropTypes.func,
  handleTaskClick: PropTypes.func,
  onCellDragStart: PropTypes.func
}

export default EventItem