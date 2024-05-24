"use client";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Booking, Jobber, User } from "@prisma/client";
import DashboardComponent from "./DashboardComponent";
import MyInfosComponent from "./MyInfosComponent";
import ActivitiesComponent from "./ActivitiesComponent";

export type IndexTabValue = "dashboard" | "infos" | "activity";
export type MyBookingDataType = Booking & {
  user: User;
};

type Props = {
  myJob: Jobber | null;
  myBookings: MyBookingDataType[];
};

const MainDashBoardComp = ({ myJob, myBookings }: Props) => {
  const [indexTab, setIndexTab] = useState<IndexTabValue>("dashboard");

  return (
    <Tabs value={indexTab} className="w-full min-h-[90vh]">
      <TabsList className="w-full gap-2">
        <TabsTrigger value="dashboard" onClick={() => setIndexTab("dashboard")}>
          Dashboard
        </TabsTrigger>
        <TabsTrigger value="infos" onClick={() => setIndexTab("infos")}>
          {" "}
          Mes infos
        </TabsTrigger>
        <TabsTrigger value="activity" onClick={() => setIndexTab("activity")}>
          Mes activités
        </TabsTrigger>
      </TabsList>
      {/* dashboard */}
      <TabsContent value="dashboard">
        <DashboardComponent
          myJob={myJob}
          setIndexTab={setIndexTab}
          myBookings={myBookings}
        />
      </TabsContent>

      {/* infos */}
      <TabsContent value="infos">
        <MyInfosComponent myJob={myJob} setIndexTab={setIndexTab} />
      </TabsContent>

      {/* activities */}
      <TabsContent value="activity">
        <ActivitiesComponent setIndexTab={setIndexTab} />
      </TabsContent>
    </Tabs>
  );
};

export default MainDashBoardComp;
