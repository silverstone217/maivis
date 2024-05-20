"use client";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Jobber } from "@prisma/client";
import DashboardComponent from "./DashboardComponent";
import MyInfosComponent from "./MyInfosComponent";

export type IndexTabValue = "dashboard" | "infos" | "activity";

type Props = {
  myJob: Jobber | null;
};

const MainDashBoardComp = ({ myJob }: Props) => {
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
        <DashboardComponent myJob={myJob} setIndexTab={setIndexTab} />
      </TabsContent>

      {/* infos */}
      <TabsContent value="infos">
        <MyInfosComponent myJob={myJob} setIndexTab={setIndexTab} />
      </TabsContent>

      {/* activities */}
      <TabsContent value="activity">
        <div>
          <p>Change your activity here.</p>
          <span onClick={() => setIndexTab("infos")}>Retour</span>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default MainDashBoardComp;
