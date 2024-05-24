import { Jobber } from "@prisma/client";
import React, { useRef } from "react";
import { Button } from "../ui/button";
import { IndexTabValue, MyBookingDataType } from "./MainDashBoardComp";
import { useSession } from "next-auth/react";
import {
  Archive,
  BriefcaseBusiness,
  CalendarCheck,
  CalendarDays,
  CalendarPlus,
} from "lucide-react";
import Image from "next/image";

type Props = {
  myJob: Jobber | null;
  setIndexTab: React.Dispatch<React.SetStateAction<IndexTabValue>>;
  myBookings: MyBookingDataType[];
};
import { Pie } from "react-chartjs-2";
import {
  Chart,
  PieController,
  PieControllerChartOptions,
  LinearScale,
  ChartOptions,
} from "chart.js";

import {
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  Tooltip,
  Title,
  Legend,
  CategoryScale,
} from "chart.js";

Chart.register(
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  Tooltip,
  Title,
  Legend,
  CategoryScale
);

const DashboardComponent = ({ myJob, setIndexTab, myBookings }: Props) => {
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

  return (
    <div>
      <DashboardDataComponent
        myJob={myJob}
        setIndexTab={setIndexTab}
        myBookings={myBookings}
      />
    </div>
  );
};

export default DashboardComponent;

const optionLabels = [
  "En attente",
  "accepte",
  "termine",
  "refuse",
  "annule",
  // "en cours",
];

const DashboardDataComponent = ({ myJob, setIndexTab, myBookings }: Props) => {
  const { data: session } = useSession();
  const user = session?.user;

  const chartRef = useRef(null);
  const AcceptData = myBookings.filter((book) => book.status === "accepte");
  const RefuseData = myBookings.filter((book) => book.status === "refuse");
  const AnnuleData = myBookings.filter((book) => book.status === "annule");
  const EnAttenteData = myBookings.filter(
    (book) => book.status === "en attente"
  );
  // const EnCoursData = myBookings.filter(book => book.status === "en cours");
  const TerminerData = myBookings.filter((book) => book.status === "termine");

  const chartData = [
    EnAttenteData,
    AcceptData,
    TerminerData,
    RefuseData,
    AnnuleData,
  ];

  const data = {
    labels: optionLabels,
    datasets: [
      {
        label: " # reservation",
        data: chartData.map((bookings) => bookings.length),
        backgroundColor: [
          "#A3A3A3", //Color for En attente
          "#2E7D32", //Color for Accepte
          "#16A34A", //Color for Termine
          "#991B1B", //Color for Refuse
          "#DC2626", //Color for Annule
        ],
        hoverOffset: 4,
      },
    ],
  };

  // const options: ChartOptions = {
  //   // Spécifier le type comme ChartOptions
  //   responsive: true,
  //   plugins: {
  //     legend: {
  //       position: "top",
  //     },
  //     title: {
  //       display: true,
  //       text: "Pie Chart for Booking Data",
  //     },
  //     tooltip: {
  //       enabled: true,
  //     },
  //   },
  // };

  if (!user) {
    return null;
  }

  return (
    <div className=" w-full py-2 box-border space-y-6">
      {/* Mon dashboard */}

      <section
        className="w-full px-2 box-border flex items-start justify-start flex-col gap-4
      duration-300 ease-in-out transition-all
      "
      >
        {/* greet */}
        <div className="mb-2">
          <h1 className="lg:text-3xl text-2xl font-bold tracking-wide capitalize">
            Bonjour,{" "}
            <span
              className="bg-gradient-to-r from-green-700 
            via-green-600 to-green-400 inline-block text-transparent bg-clip-text"
            >
              {user.name}
            </span>
            .
          </h1>
        </div>
        <div
          className="w-full flex flex-wrap gap-2 items-center justify-between
         duration-300 ease-in-out transition-all"
        >
          <div
            className="flex box-border p-4 items-center justify-center gap-4
            border rounded-md capitalize flex-grow lg:flex-grow-0 flex-shrink-0"
          >
            <BriefcaseBusiness className="size-6" />
            <p>{myJob?.job}</p>
          </div>

          <div
            className="flex box-border p-4 items-center justify-center gap-4
         border rounded-md shadow-sm flex-grow lg:flex-grow-0 flex-shrink-0
         duration-300 ease-in-out transition-all"
          >
            <CalendarDays className="size-6" />
            <span className="">
              {new Date().toLocaleDateString("fr-FR", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
              })}{" "}
            </span>
          </div>
        </div>
      </section>

      {/* infos */}

      <section
        className="grid grid-cols-3 gap-4 items-start justify-start px-2 
      duration-300 ease-in-out transition-all"
      >
        {/* total */}
        <div
          className="w-full py-4 h-48 md:h-fit border rounded-md flex flex-col 
        items-start justify-start px-2 md:px-4 gap-4 duration-300 ease-in-out transition-all"
        >
          <div
            className="capitalize flex w-full
          items-center justify-between gap-1 
          flex-wrap
          "
          >
            <p className="md:text-sm text-xs text-balance">
              Reservations totales
            </p>
            <Archive className="md:size-6 size-4 flex-shrink-0" />
          </div>
          <div>
            <h2 className="font-black text-2xl lg:text-3xl line-clamp-1">45</h2>
            <span className="text-xs opacity-80">Depuis 2 jours</span>
          </div>
        </div>
        {/* termine */}
        <div
          className="w-full py-4 h-48 md:h-fit border flex flex-col items-start 
        justify-start px-2 md:px-4 gap-4 rounded-md duration-300 ease-in-out transition-all"
        >
          <div
            className="capitalize flex w-full
          items-center justify-between gap-1 
          flex-wrap
          "
          >
            <p className="md:text-sm text-xs text-balance">
              Reservations terminées
            </p>
            <CalendarCheck className="md:size-6 size-4 flex-shrink-0" />
          </div>
          <div>
            <h2 className="font-black text-2xl lg:text-3xl line-clamp-1">15</h2>
            <span className="text-xs opacity-80">En une année</span>
          </div>
        </div>

        {/* en cours */}
        <div
          className="w-full py-4 h-48 md:h-fit border flex flex-col items-start 
        justify-start px-2 md:px-4 gap-4 rounded-md duration-300 ease-in-out transition-all"
        >
          <div
            className="capitalize flex w-full
          items-center justify-between gap-1 
          flex-wrap
          "
          >
            <p className="md:text-sm text-xs text-balance">
              Reservations en cours
            </p>
            <CalendarPlus className="md:size-6 size-4 flex-shrink-0" />
          </div>
          <div>
            <h2 className="font-black text-2xl lg:text-3xl line-clamp-1">15</h2>
            <span className="text-xs opacity-80">Depuis une semaine</span>
          </div>
        </div>
      </section>

      {/* details */}
      <section
        className="w-full px-2 box-border grid grid-cols-1 md:grid-cols-2 
      gap-4 mt-2 md:mt-0 duration-300 ease-in-out transition-all"
      >
        {/* charts */}
        <div
          className="w-full flex items-center justify-center p-2 box-border border rounded-md
        duration-300 ease-in-out transition-all"
        >
          <Pie
            data={data}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "top",
                },
                title: {
                  display: true,
                  text: "Pie Chart pour les reservations",
                },
                tooltip: {
                  enabled: true,
                },
              },
              animation: {
                animateRotate: true,
                animateScale: true,
              },
            }}
          />
        </div>

        {/* recent bookings */}
        <div
          className="w-full p-2 border box-border rounded-md flex flex-col items-start 
        justify-start gap-4 duration-300 ease-in-out transition-all"
        >
          {/* title */}
          <div className="flex flex-col items-start">
            <h2 className="font-bold text-[18px]">Reservations recentes</h2>
            <p className="text-sm opacity-80">
              Vous avez eu {myBookings.length} en tout.
            </p>
          </div>
          {/* table */}
          <div
            className="w-full flex items-start justify-start gap-2 flex-col 
          duration-300 ease-in-out transition-all"
          >
            {myBookings.length > 0 ? (
              myBookings.map((booking, index) => (
                <div
                  key={index}
                  className="w-full flex items-center justify-between gap-4
                  duration-300 ease-in-out transition-all"
                >
                  <div className="flex items-center justify-start gap-4">
                    <Image
                      src={
                        booking.user.image
                          ? booking.user.image
                          : "https://github.com/shadcn.png"
                      }
                      alt="image user"
                      width={2000}
                      height={2000}
                      priority
                      className="size-10 object-cover rounded"
                    />
                    <p className="text-sm font-medium capitalize">
                      {booking.user.name}
                    </p>
                  </div>
                  <p className="text-xs opacity-80 capitalize">
                    {new Date(booking.reservationDate).toLocaleDateString(
                      "fr-FR",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                      }
                    )}{" "}
                  </p>
                </div>
              ))
            ) : (
              <div>Pas encore de reservation</div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
