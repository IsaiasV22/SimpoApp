"use client";
import React, { useContext } from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineDot from "@mui/lab/TimelineDot";
import ScheduleIcon from "@mui/icons-material/Schedule";
import { format, parse, isSameDay, isAfter, isBefore } from "date-fns";
import DateFnsLocaleContext from "@/app/locales/dateFnsContext";

const StyledContainer = styled(Typography)(({ theme }) => ({
  ["&::-webkit-scrollbar"]: {
    width: 7,
    height: 6,
  },
  ["&::-webkit-scrollbar-track"]: {
    WebkitBoxShadow: "inset 0 0 6px rgb(125, 161, 196, 0.5)",
  },
  ["&::-webkit-scrollbar-thumb"]: {
    WebkitBorderRadius: 4,
    borderRadius: 4,
    background: "rgba(0, 172, 193, .5)",
    WebkitBoxShadow: "inset 0 0 6px rgba(25, 118, 210, .5)",
  },
  ["&::-webkit-scrollbar-thumb:window-inactive"]: {
    background: "rgba(125, 161, 196, 0.5)",
  },
}));

function TimeLineModeView(props) {
  const { options, rows, searchResult, onTaskClick } = props;
  const dateFnsLocale = useContext(DateFnsLocaleContext);
  const currentDate = new Date();

  const handleTaskClick = (event, task) => {
    event.preventDefault();
    event.stopPropagation();
    onTaskClick && onTaskClick(event, task);
  };

  const getEventBorderColor = (task) => {
    const eventStart = parse(task.date + ' ' + task.startHour, 'yyyy-MM-dd HH:mm', new Date());
    const eventEnd = parse(task.date + ' ' + task.endHour, 'yyyy-MM-dd HH:mm', new Date());

    if (isEventInProgress(eventStart, eventEnd)) {
      return "#00FF00";
    } else if (isEventPassed(eventEnd)) {
      return "red";
    } else if (isEventUpcoming(eventStart)) {
      return "yellow";
    }

    return "light-blue"; // Cambia esto a tu color por defecto
  };

  const isEventInProgress = (eventStart, eventEnd) => {
    return isSameDay(eventStart, currentDate) && isAfter(currentDate, eventStart) && isBefore(currentDate, eventEnd);
  };

  const isEventPassed = (eventEnd) => {
    return isAfter(currentDate, eventEnd);
  };

  const isEventUpcoming = (eventStart) => {
    return isBefore(currentDate, eventStart);
  };

  let filteredEvents = rows?.sort((a, b) => -b?.startHour?.localeCompare(a?.startHour));

  if (searchResult) {
    filteredEvents = filteredEvents?.filter((event) => event?.groupLabel === searchResult?.groupLabel);
  }

  return (
    <StyledContainer
      component="div"
      sx={{
        overflowY: "auto",
        height: options?.height || 540,
        maxHeight: options?.maxHeight || 540,
      }}
    >
      <Timeline position="alternate">
        {filteredEvents?.map((task, index) => {
          return (
            <TimelineItem
              key={`timeline-${index}`}
              sx={{ cursor: "pointer" }}
              onClick={(event) => handleTaskClick(event, task)}
            >
              <TimelineOppositeContent
                sx={{ m: "auto 0" }}
                align="right"
                variant="body2"
                color="text.secondary"
              >
                {task?.date &&
                  format(parse(task?.date, "yyyy-MM-dd", new Date()), "PPP", {
                    locale: dateFnsLocale,
                  })}
                <br />
                <Typography variant="caption">
                  {task?.startHour} - {task?.endHour}
                </Typography>
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineConnector />
                <TimelineDot
                  color="secondary"
                  sx={{
                    backgroundColor: task?.color,
                    border: `3px solid ${getEventBorderColor(task)}`,
                  }}
                >
                  {task?.icon || <ScheduleIcon />}
                </TimelineDot>
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent sx={{ py: "12px", px: 2 }}>
                <Typography variant="body1" component="span">
                  {task?.label}
                </Typography>
                <Typography>{task?.groupLabel}</Typography>
              </TimelineContent>
            </TimelineItem>
          );
        })}
      </Timeline>
    </StyledContainer>
  );
}

TimeLineModeView.propTypes = {
  events: PropTypes.array,
  columns: PropTypes.array,
  rows: PropTypes.array,
  date: PropTypes.string,
  options: PropTypes.object,
  searchResult: PropTypes.object,
  onDateChange: PropTypes.func.isRequired,
  onTaskClick: PropTypes.func.isRequired,
  onCellClick: PropTypes.func.isRequired,
  onEventsChange: PropTypes.func.isRequired,
};

TimeLineModeView.defaultProps = {};

export default TimeLineModeView;