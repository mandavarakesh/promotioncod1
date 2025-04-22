import React, { useState } from "react";
import {
  Box,
  CircularProgress,
  IconButton,
  Paper,
  Tab,
  Tabs,
  Tooltip,
} from "@mui/material";
import PageHeader from "../../components/PageHeader";
import TabPanel from "../../components/TabPanel";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import { createSearchParams, useNavigate } from "react-router-dom";
import CustomDataGrid from "../../components/CustomDataGrid";
import { useQueryClient } from "@tanstack/react-query";
import PublishUnpublishBotton from "./PublishUnPublishBotton";
import PublishButton from "./PublishButton";
import UnPublishButton from "./UnPublishButton";

const PROMOTION_TAB_POSITION = Object.freeze({
  ALL_PROMOTIONS: 0,
});

const a11yProps = (index) => {
  return {
    id: `promotion-tab-${index}`,
    "aria-controls": `promotion-tabpanel-${index}`,
  };
};

const AllPromotions = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [tabPosition, setTabPosition] = useState(
    PROMOTION_TAB_POSITION.ALL_PROMOTIONS
  );
  const promoList = true;
  const handleTabChange = (_event, newValue) => {
    setTabPosition(newValue);
  };

  const handleEdit = (row) => {
    const { code, version, templateId } = row ?? {};
    navigate({
      pathname: `/promotions/edit-promotion/${templateId}`,
      search: createSearchParams({ code, version, templateId })?.toString(),
    });
  };

  const columns = [
    { field: "code", headerName: "Promotion Code", flex: 0.8 },
    { field: "promotionName", headerName: "Promotion Name", flex: 1 },
    { field: "version", headerName: "Version", flex: 0.5 },
    {
      field: "status",
      headerName: "Status",
      flex: 0.5,
      renderCell: (params) => (
        <span>
          {params.value === "PUBLISHED" ? "Published" : "Unpublished"}
        </span>
      ),
    },
    { field: "priority", headerName: "Priority", flex: 0.5 },
    {
      field: "actions",
      headerName: "Options",
      sortable: false,
      width: 200,
      disableClickEventBubbling: true,
      renderCell: (params) => (
        <Box sx={{ display: "flex", gap: 2.5, alignItems: "end" }}>
          <Box>
            <Tooltip title="Edit Promotion" placement="top">
              <IconButton
                aria-label="edit"
                onClick={() => handleEdit(params.row)}
                sx={{
                  "&.MuiButtonBase-root.MuiIconButton-root": {
                    padding: "0px !important",
                  },
                }}
              >
                <EditIcon
                  sx={{
                    fontSize: 22,
                  }}
                />
              </IconButton>
            </Tooltip>
          </Box>
          {/* <PublishUnpublishBotton
            code={params.row.code}
            version={params.row.version}
            actionType={params.row.status}
            onSuccess={() =>
              queryClient.invalidateQueries("PROMOTION_LIST_VIEW")
            }
            // disableCondition = false
          /> */}
          <UnPublishButton
            code={params.row.code}
            version={params.row.version}
            onSuccess={() =>
              queryClient.invalidateQueries("PROMOTION_LIST_VIEW")
            }
            disableCondition={params.row.status === "UNPUBLISHED"}
          />
          <PublishButton
            code={params.row.code}
            version={params.row.version}
            onSuccess={() =>
              queryClient.invalidateQueries("PROMOTION_LIST_VIEW")
            }
            disableCondition={params.row.status === "PUBLISHED"}
            promoList={promoList}
          />
        </Box>
      ),
    },
  ];

  const { data: promotionsList, isLoading: promotionsLoading } = useQuery({
    queryKey: ["PROMOTION_LIST_VIEW"],
    queryFn: () => axios.get("http://localhost:8081/allPromotions"),
    select: (response) => response.data,
    refetchOnMount: true,
  });

  return (
    <Box>
      <PageHeader header="All Promotions" />
      <Paper>
        <Tabs
          value={tabPosition}
          onChange={handleTabChange}
          aria-label="promotions tabs"
          sx={{
            "& .MuiTabs-flexContainer": {
              gap: "26px",
            },
          }}
        >
          <Tab label="ALL PROMOTIONS" {...a11yProps(0)} />
        </Tabs>
        <TabPanel
          value={tabPosition}
          index={PROMOTION_TAB_POSITION.ALL_PROMOTIONS}
        >
          <Paper>
            {promotionsLoading ? (
              <Box
                sx={{
                  width: "100vh",
                  minHeight: "50vh",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CircularProgress />
              </Box>
            ) : (
              <Box>
                <CustomDataGrid
                  rows={promotionsList}
                  columns={columns}
                  paginationModel={{ pageSize: 10 }}
                  rowsPerPageOptions={[5, 10, 20]}
                  checkboxSelection={false}
                />
              </Box>
            )}
          </Paper>
        </TabPanel>
      </Paper>
    </Box>
  );
};

export default AllPromotions;
