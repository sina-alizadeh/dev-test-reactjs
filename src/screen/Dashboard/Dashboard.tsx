import Typography from "@mui/material/Typography";
import { FC } from "react";
import { UsersList } from "../../components/UsersList";
import { PanelLayout } from "../../components/common/PanelLayout";

const Dashboard: FC = () => {
  return (
    <PanelLayout pageHeaderName={"داشبورد"}>
      <>
        <Typography sx={{ marginY: "20px" }}>به داشبورد خوش آمدید</Typography>
        <UsersList />
      </>
    </PanelLayout>
  );
};

export { Dashboard };
