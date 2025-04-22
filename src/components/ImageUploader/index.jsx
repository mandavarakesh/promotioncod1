import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Controller, useFormContext } from "react-hook-form";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import {
  Box,
  CircularProgress,
  IconButton,
  Typography,
  styled,
} from "@mui/material";
import ReplayIcon from "@mui/icons-material/Replay";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useAppSelector } from "../../redux/redux-hooks";
import { UPLOAD_PRODUCT_IMAGE } from "../../graphql/mutations";
import { useGraphQLMutation } from "../../hooks/useGraphQLMutation";

const StyledBox = styled(Box)(({ disabled }) => ({
  pointerEvents: disabled ? "none" : "all",
  opacity: disabled ? 0.5 : 1,
  minWidth: "100px",
  outline: "1px dashed grey",
  outlineOffset: "5px",
  borderRadius: "4px",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
  "&:hover": {
    backgroundColor: "lightgray",
  },
  "& .imageWrapper": {
    borderRadius: "8px",
    position: "relative",
    width: "120px",
    height:"120px"
  },
  "& .imageActionWrapper": {
    position: "absolute",
    left: 0,
    right: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
  },
  "&.inputContainer": {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  "& .textWrapper": {
    cursor: "pointer",
    color: "#2196F3",
    textAlign: "center",
    width: "120px",
    height:"120px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  "& .progressWrapper": {
    display: "flex",
    justifyContent: "center",
    alignItems:"center",
    minWidth: "120px",
    minHeight: "120px",
  },
}));

const ImageUploader = (props) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={props.name}
      control={control}
      disabled={props.disabled}
      defaultValue=""
      render={({ field, fieldState: { error } }) => {
        const { onChange, value, ref, onBlur } = field;
        return (
          <DropzoneField
            {...props}
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

const DropzoneField = React.forwardRef((props, ref) => {
  const {
    value,
    accept,
    label,
    onChange,
    name,
    error,
    onBlur,
    maxsize,
    disabled,
  } = props;

  const [progress, setProgress] = useState(false);
  const [showIcons, setShowIcons] = useState(false);
  const { setError, setValue } = useFormContext();
  const { user } = useAppSelector((state) => state.user);

  const { mutateAsync } = useGraphQLMutation(UPLOAD_PRODUCT_IMAGE);

  const uploadImage = (file, callback) => {
    setProgress(true);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      callback(reader.result);
    };
    reader.onerror = (err) => {
      console.log("Error: ", err);
    };
  };

  const kbToMb = (bytes) => {
    return bytes / 1024;
  };

  const bToMb = (bytes) => {
    return bytes / (1024 * 1024);
  };

  const getFileExtention = (fileName = "") => {
    return "." + fileName?.split(".").pop().toLocaleLowerCase();
  };

  // ondrop need to call api post image data and get the image url

  const onDrop = useCallback(
    async (droppedFiles) => {
      if (bToMb(droppedFiles[0].size) >= kbToMb(maxsize)) {
        return setError(name, {
          type: "custom",
          message: (
            <Typography sx={{ fontSize: "10px" }}>
              {`Maximum image size allowed ${Math.round(kbToMb(maxsize))}mb`}
            </Typography>
          ),
        });
      }

      if (!accept.includes(getFileExtention(droppedFiles[0].name))) {
        return setError(name, {
          type: "custom",
          message: (
            <Typography sx={{ fontSize: "10px" }}>
             {`Allowed image types: ${accept.map(ext => ext.replace('.', '')).join(', ')}`}
            </Typography>
          ),
        });
      }

      const submitDataBackend = (base64Image) => {
        const imagevariables = {
          merchantDetails: JSON.stringify({
            imageName: droppedFiles[0].name?.split(".").shift(),
            merchantId: user.defaultShop,
          }),
          imageData: base64Image,
        };
        mutateAsync(imagevariables, {
          onSuccess: (response) => {
            const { code, data, message } = response.ecsProductUploadImage;
            if (code === 200) {
              onChange(data);
            } else {
              setError(name, {
                type: "custom",
                message: message ?? "Image failed to upload",
              });
            }
          },
          onError: (_err) => {
            setError(name, {
              type: "custom",
              message: "Image failed to upload",
            });
          },
          onSettled: () => {
            setProgress(false);
          },
        });
      };
      uploadImage(droppedFiles[0], submitDataBackend);
    },
    [name, onChange, setError]
  );

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: { "image/*": accept },
    multiple: false,
  });

  return (
    <StyledBox
      disabled={disabled}
      {...getRootProps()}
      aria-label="File Upload"
      id={name}
      data-testid="drop-container"
    >
      <Box className="inputContainer">
        {progress && (
          <Box className="progressWrapper">
            <CircularProgress />
          </Box>
        )}

        <input ref={ref} onBlur={onBlur} {...getInputProps()} />
        {!progress && !value ? (
          <Box className="textWrapper">
            <RenderLabel label={label} isDragActive={isDragActive} />
            {!!error && (
              <Box textAlign="center">
                <Typography color="error" fontWeight="bold" variant="caption">
                  {error?.message}
                </Typography>
              </Box>
            )}
          </Box>
        ) : (
          !progress && (
            <Box className="imageWrapper">
              <Box
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "120px",
                  height:"120px"
                }}
                onMouseEnter={() => setShowIcons(true)}
                onMouseLeave={() => setShowIcons(false)}
              >
                <img src={value} alt="Product image" 
                 style={{
                    objectFit:"contain",width:"100%",height:"100%"
                }}/>
                {showIcons && (
                  <Box className="imageActionWrapper">
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation();
                        open();
                      }}
                      sx={{ backgroundColor: "white" }}
                    >
                      <ReplayIcon color="action" />
                    </IconButton>
                    <IconButton
                      onClick={(event) => {
                        event.stopPropagation();
                        setValue(name, "", {
                          shouldValidate: true,
                          shouldDirty: true,
                        });
                      }}
                      sx={{ backgroundColor: "white" }}
                    >
                      <DeleteForeverIcon color="error" />
                    </IconButton>
                  </Box>
                )}
              </Box>
            </Box>
          )
        )}
      </Box>
    </StyledBox>
  );
});

const RenderLabel = ({ isDragActive, label }) => {
  return (
    <>
      {isDragActive ? (
        <Typography fontSize="12px" color="black" variant="body1">
          Drop here
        </Typography>
      ) : (
        <Box>
          <UploadFileIcon />
          <Typography fontSize="12px" fontWeight="bold" variant="body1">
            Click to upload
          </Typography>
          <Typography
            style={{
              fontSize: "10px",
              fontWeight: "normal",
              color: "black",
            }}
          >
            or Drag & Drop {label}
          </Typography>
        </Box>
      )}
    </>
  );
};

export default ImageUploader;
