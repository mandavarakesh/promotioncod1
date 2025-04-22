import React from "react";
import { IconButton, Typography, Box } from "@mui/material";

const Day = ({
  startOfRange,
  endOfRange,
  disabled,
  highlighted,
  outlined,
  filled,
  onClick,
  onHover,
  value,
  isSunday,
  isSaturday,
  isFirstDayOfMonth,
  isLastDayOfMonth,
}) => {
  return (
    <div style={{ marginBottom: "2px" }}>
      {!disabled ? (
        <Box
          sx={{
            display: "flex",
            borderRadius: () => {
              if (highlighted && filled) return "50%";
              if (highlighted && isSunday) return "50% 0 0 50%";
              if (highlighted && isSaturday) return "0 50% 50% 0";
              if (highlighted && isFirstDayOfMonth) return "50% 0 0 50%";
              if (highlighted && isLastDayOfMonth) return "0 50% 50% 0";
            },
            backgroundColor: (theme) =>
              highlighted ? theme.palette.primary.light : undefined,
          }}
        >
          <Box
            sx={{
              backgroundColor: (theme) =>
                filled ? theme.palette.primary.light : undefined,
              borderRadius: () => {
                if (filled && startOfRange) return "50% 0 0 50%";
                if (filled && endOfRange) return "0 50% 50% 0";
                if (highlighted && isSunday) return "50% 0 0 50%";
                if (highlighted && isSaturday) return "0 50% 50% 0";
                if (highlighted && filled) return "50%";
              },
            }}
          >
            <IconButton
              sx={{
                height: "36px",
                width: "36px",
                padding: 0,
                border: (theme) =>
                  outlined
                    ? `1px solid ${theme.palette.primary.dark}`
                    : undefined,
                ...(filled
                  ? {
                      "&:hover": {
                        backgroundColor: (theme) => theme.palette.primary.dark,
                      },
                      backgroundColor: (theme) => theme.palette.primary.dark,
                    }
                  : {}),
              }}
              disabled={disabled}
              onClick={onClick}
              onMouseOver={onHover}
            >
              <Typography
                sx={{
                  lineHeight: 1.6,
                  color: (theme) =>
                    filled
                      ? theme.palette.primary.contrastText
                      : theme.palette.text.primary,
                }}
                variant="body2"
              >
                {value}
              </Typography>
            </IconButton>
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            height: "36px",
            width: "36px",
          }}
        />
      )}
    </div>
  );
};

export default Day;
