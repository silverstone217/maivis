import { Jobber } from "@prisma/client";
import React from "react";
import { Button } from "../ui/button";
import { IndexTabValue } from "./MainDashBoardComp";

type Props = {
  myJob: Jobber | null;
  setIndexTab: React.Dispatch<React.SetStateAction<IndexTabValue>>;
};

const DashboardComponent = ({ myJob, setIndexTab }: Props) => {
  if (!myJob) {
    return (
      <div className="w-full flex flex-col items-center justify-center gap-4 h-96 text-balance text-center">
        <h1 className="text-xl font-bold">
          Pas encore configuré votre profile
        </h1>
        <p>
          Enregistrer vos données et devenez un de membres de{" "}
          <strong className="text-primary">Maivis</strong>
        </p>
        <Button onClick={() => setIndexTab("infos")}>
          Configurer Maintenant!
        </Button>
      </div>
    );
  }

  return <div>DashboardComponent</div>;
};

export default DashboardComponent;
