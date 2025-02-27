import React from "react";
import SubDashboardRight from "./sub_admin_dash";
import SuperDashboardRight from "./super_admin_dash";


const DashboardRight = ({ userRole }) => {
  return userRole !== 'sub-admin' ? (
    <SuperDashboardRight/>
  ) : (
    <SubDashboardRight/>
  );
};

export default DashboardRight;
