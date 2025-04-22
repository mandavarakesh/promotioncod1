import { Box, Stack, Typography, styled, css } from "@mui/material";
import { useState, forwardRef } from "react";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import UploadCard from "./UploadCard";
import { Controller } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import { getFileExtention } from "../../utils/userManagement";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // Max upload size of an image will be 5MB.

const BoxDocument = styled(Box)(
  {
    border: "1px dashed grey",
    borderRadius: "8px",
    cursor: "pointer",
    height: "150px",
    width: "450px",
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
  },
  ({ disabled }) =>
    disabled &&
    css`
      pointer-events: none;
      opacity: 0.5;
      cursor: not-allowed;
    `
);

const ErrorMessage = ({ error }) => {
  if (!!error) {
    return (
      <p
        style={{
          paddingLeft: "15px",
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

const DocumentUploader = ({
  name,
  control,
  defaultValue,
  setTemplateName = () => {
    console.log("TemplateName called");
  },
  ...rest
}) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field, fieldState: { error } }) => {
        const { onChange, value, ref, onBlur } = field;
        return (
          <UploaderBase
            {...rest}
            name={name}
            ref={ref}
            onBlur={onBlur}
            error={error}
            value={value}
            onChange={onChange}
            setTemplateName={setTemplateName}
          />
        );
      }}
    />
  );
};

const UploaderBase = forwardRef(
  (
    {
      name,
      value,
      disabled,
      onBlur,
      onChange,
      label,
      helperText1,
      acceptedFormats,
      register,
      setValue,
      error,
      isDownloadDisabled,
      setError,
      clearErrors,
      required,
      setTemplateName,
    },
    ref
  ) => {
    const [fileSize, setFileSize] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);

    const formatFileSize = (size) => {
      const kilobyte = 1024;
      const megabyte = kilobyte * 1024;

      if (size < kilobyte) {
        return size + " B";
      } else if (size < megabyte) {
        return (size / kilobyte).toFixed(2) + " KB";
      } else {
        return (size / megabyte).toFixed(2) + " MB";
      }
    };

    const handleCancelUpload = () => {
      setValue(name, null, {
        shouldTouch: true,
        shouldDirty: true,
        shouldValidate: true,
      });
    };

    const handleDownload = () => {
      const link = document.createElement("a");
      link.href = value;
      link.download = label;
      link.click();
    };

    const onDrop = async (droppedFiles) => {
      clearErrors(name);
      const uploadedFile = droppedFiles[0];

      setTemplateName(uploadedFile?.name);

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

        reader.onload = () => {
          const base64String = reader.result;
          onChange(base64String);
          setFileSize(formatFileSize(uploadedFile.size));
          setUploadProgress(100);
        };

        reader.onerror = () => {
          setError(name, {
            type: "custom",
            message: "Error occurred while uploading the file",
          });
        };
        reader.readAsDataURL(uploadedFile);
      } else {
        setError(name, {
          type: "custom",
          message: "File size should not exceed more than 5MB",
        });
      }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
      accept: { "application/pdf": acceptedFormats },
      multiple: false,
    });

    const showRequired = required ? (
      <span style={{ color: "red" }}> *</span>
    ) : null;

    if (value) {
      return (
        <UploadCard
          id={name}
          file={value}
          register={register}
          fileSize={fileSize}
          label={label}
          uploadProgress={uploadProgress}
          onCancelUpload={handleCancelUpload}
          onDownload={handleDownload}
          disabled={disabled}
          isDownloadDisabled={isDownloadDisabled}
        />
      );
    }
    return (
      <>
        <BoxDocument
          disabled={disabled}
          data-testid="box-document"
          {...getRootProps()}
        >
          <input
            data-testid="file-upload"
            ref={ref}
            onBlur={onBlur}
            {...getInputProps()}
          />
          {isDragActive ? (
            <Box>Drop here</Box>
          ) : (
            <Stack
              direction="column"
              alignItems="center"
              marginTop="10px"
              gap={2}
            >
              <Box component="a" sx={{ cursor: "pointer", color: "blue" }}>
                <UploadFileIcon sx={{ color: "#2196F3" }} />
              </Box>
              <Typography>
                <Typography
                  variant="subtitle1"
                  component="a"
                  sx={{ cursor: "pointer", color: "#2196F3" }}
                >
                  Click to upload
                </Typography>{" "}
                or drag and drop <b>{label}</b>
                {showRequired}
              </Typography>
              <Typography variant="caption">{helperText1}</Typography>
            </Stack>
          )}
        </BoxDocument>
        <Box data-testid="error-id">
          <ErrorMessage error={error} />
        </Box>
      </>
    );
  }
);

export default DocumentUploader;
