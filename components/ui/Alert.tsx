
import { Chip } from "@mui/material";
import { NextPage } from "next";

type Props = {
  hasError: boolean;
  message: string;
};

const Alert: NextPage<Props> = (alert) => {
  return (
    <Chip
    label={alert.message}
    color={alert.hasError ? 'error': 'success'}
    className="fadeIn"
  />

  );
};

export default Alert;


