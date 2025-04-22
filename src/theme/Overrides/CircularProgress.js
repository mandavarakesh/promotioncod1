

const CircularProgress = () => {
    return {
        MuiCircularProgress: {
            styleOverrides: {
                root: {
                    '.MuiCircularProgress-circle': {
                        strokeLinecap: "round"
                    }
                }
            }
        }

    }
}

export default CircularProgress
