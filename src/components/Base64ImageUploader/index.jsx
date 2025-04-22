import { Box, Stack, Typography, styled, IconButton } from "@mui/material";
import { forwardRef } from "react";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { useDropzone } from "react-dropzone";
import { Controller } from "react-hook-form";
import ReplayIcon from "@mui/icons-material/Replay";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { getFileExtention } from "../../utils/userManagement";

const MAX_FILE_SIZE = 512000; // Max upload size of an image will be 512kb.

const StyledBox = styled(Box)(({ disabled }) => {
  if (disabled) {
    return {
      pointerEvents: "none",
      cursor: "not-allowed",
      opacity: 0.5,
    };
  }
});
const BoxDocument = styled(Box)({
  border: "1px dashed grey",
  borderRadius: "8px",
  cursor: "pointer",
  height: "100%",
  width: "100%",
  justifyContent: "center",
  backgroundColor: "white",
  overflow: "hidden",
  padding: "5px",
  "&:hover": {
    backgroundColor: "lightgray",
  },
  "&.highlight": {
    backgroundColor: "lightgray",
  },
});
const BoxLabelDocument = styled(Box)({
  position: "relative",
  "& .imageWrapper": {
    border: "1px dashed grey",
    borderRadius: "8px",
    "&:hover": {
      backgroundColor: "lightgray",
    },
    "&.highlight": {
      backgroundColor: "lightgray",
    },
  },
  "& .logoLegend": {
    color: "#454F5B",
    fontSize: "0.8rem",
    fontWeight: "400",
    height: "19px",
    fontFamily: "lato, sans-serif",
    position: "relative",
    top: "-1.5px",
    left: "0px",
  },
  "& .logoImage": {
    width: "100%",
    height: "100%",
    borderRadius: "5px",
    // border: "1px solid black",
    overflow: "hidden",
  },
  "& .imageActionWrapper": {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    display: "flex",
    gap: "10px",
  },
});

const ErrorMessage = ({ error }) => {
  if (!!error) {
    return (
      <p
        data-testid="error-id"
        style={{
          paddingLeft: "4px",
          marginTop: "0px",
          fontSize: "11px",
          color: "red",
        }}
      >
        {error?.message}
      </p>
    );
  }
};

const Base64ImageUploader = ({ name, control, defaultValue, ...rest }) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field, fieldState: { error } }) => {
        const { onChange, value, ref, onBlur } = field;
        return (
          <ImageUploaderBase
            {...rest}
            name={name}
            ref={ref}
            onBlur={onBlur}
            error={error}
            value={value}
            onChange={onChange}
          />
        );
      }}
    />
  );
};

const ImageUploaderBase = forwardRef(
  (
    {
      value,
      name,
      disabled,
      label,
      onChange,
      onBlur,
      helperText1,
      helperText2,
      acceptedFormats,
      setValue,
      error,
      width,
      setError,
      clearErrors,
      sx,
    },
    ref
  ) => {
    const onDrop = async (droppedFiles) => {
      clearErrors(name);
      const uploadedFile = droppedFiles[0];
      if (uploadedFile && uploadedFile.size <= MAX_FILE_SIZE) {
        const fileFormat = getFileExtention(uploadedFile.name);
        // Check if the file format is allowed
        if (acceptedFormats && !acceptedFormats.includes(fileFormat)) {
          setError(name, {
            type: "custom",
            message: `Only ${acceptedFormats.join(", ")} files are allowed.`,
          });
          return;
        }
        const reader = new FileReader();
        reader.readAsDataURL(uploadedFile);
        reader.onloadend = () => {
          onChange(reader.result)
        };
        reader.onerror = () => {
          setError(name, {
            type: "custom",
            message: "Error occurred while uploading the file",
          });
        };
      } else {
        setError(name, {
          type: "custom",
          message: "File size should not exceed more than 512KB",
        });
      }
    };

    const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
      onDrop,
      accept: { "image/*": acceptedFormats },
      multiple: false,
    });

    const handleCancelUpload = (event) => {
      event.stopPropagation();
      setValue(name, null, {
        shouldTouch: false,
        shouldDirty: true,
        shouldValidate: true,
      });
    };

    const handleReUpload = (event) => {
      event.stopPropagation();
      open();
    };

    return (
      <>
        <StyledBox
          disabled={disabled}
          sx={{ width: width, ...sx }}
        >
          <span {...getRootProps()} >
            <input ref={ref} onBlur={onBlur} {...getInputProps()} data-testid="drop-on" />
            {value ? (
              <BoxLabelDocument data-testid="box-label">
                <RenderImage
                  disabled={disabled}
                  value={value}
                  handleReUpload={handleReUpload}
                  handleCancelUpload={handleCancelUpload}
                />
              </BoxLabelDocument>
            ) : (
              <BoxDocument data-testid="box-document">
                <RenderLabel
                  isDragActive={isDragActive}
                  label={label}
                  helperText1={helperText1}
                  helperText2={helperText2}
                />
              </BoxDocument>
            )}
          </span>
        </StyledBox>
        <ErrorMessage error={error} />
      </>
    );
  }
);

const RenderImage = ({ value, handleReUpload, handleCancelUpload }) => {
  return (
    <>
      <Box className="imageWrapper" component="fieldset">
        <legend className="logoLegend" data-testid="logo">
          Store Logo:
        </legend>
        <img
          src={value}
          alt="Uploaded"
          className="logoImage"
          data-testid="uploaded-image"
        />
      </Box>
      <Box className="imageActionWrapper">
        <IconButton onClick={handleReUpload} sx={{ backgroundColor: "white" }}>
          <ReplayIcon color="action" />
        </IconButton>
        <IconButton
          onClick={handleCancelUpload}
          sx={{ backgroundColor: "white" }}
        >
          <DeleteForeverIcon color="error" />
        </IconButton>
      </Box>
    </>
  );
};

const RenderLabel = ({ isDragActive, label, helperText1, helperText2 }) => {
  return (
    <>
      {isDragActive ? (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "grid",
            placeItems: "center",
            minHeight:"220px"
          }}
        >
          Drop here
        </Box>
      ) : (
        <Stack
          direction="column"
          sx={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            py:5
          }}
        >
          <UploadFileIcon sx={{ color: "#2196F3", mb: 1.5 }} />
          <Typography sx={{ color: "#2196F3", textAlign: "center" }}>
            Click to upload
          </Typography>
          <Typography textAlign="center">
            or drag & drop <b>{label}</b><span style={{ color: "red" }}> *</span>
          </Typography>
          <Typography mt={1.5} textAlign="center" variant="body2">
            {helperText1}
          </Typography>
          <Typography textAlign="center" variant="body2">
            {helperText2}
          </Typography>
        </Stack>
      )}
    </>
  );
};

export default Base64ImageUploader;
