import React, { FC, useEffect, useState } from "react";
import { TUserDetails } from "../core/models/user.model";
import { useGetAllUsers } from "../core/services/api/user.api";
import { Box, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { format } from "date-fns-jalali";
import { Loading } from "./common/Loading";
import { Avatar } from "./common/Avatar";

const columns: Array<GridColDef> = [
  {
    field: "name",
    headerName: "نام و نام خانوادگی",
    width: 250,
    renderCell(params) {
      return (
        <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Avatar src={params.row.avatar} />
          <Typography>{params.row.name}</Typography>
        </Box>
      );
    },
  },
  {
    field: "email",
    headerName: "ایمیل",
    width: 250,
  },
  {
    field: "creationAt",
    headerName: "تاریخ ثبت نام",
    width: 250,
    valueGetter(params) {
      return format(new Date(params.row.creationAt), "yyyy MMMM d");
    },
  },
];

const UsersList: FC = () => {
  const [listData, setListData] = useState<Array<TUserDetails>>([]);
  const getAllUsers = useGetAllUsers();
  useEffect(() => {
    getAllUsers.mutate(undefined, {
      onSuccess: (value) => {
        setListData(value.data);
      },
    });
  }, []);

  if (!listData || getAllUsers.isLoading)
    return (
      <Box
        sx={{
          width: "100%",
          minHeight: "400px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Loading
          sx={{ width: "100px !important", height: "100px !important" }}
        />
      </Box>
    );

  return (
    <DataGrid
      sx={{ height: "auto !important" }}
      rows={listData}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 5 },
        },
      }}
      pageSizeOptions={[5, 10]}
      disableColumnSelector
      rowSelection={false}
    />
  );
};

export { UsersList };
