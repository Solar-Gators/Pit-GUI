import React from "react";
import { useNavigate } from "react-router-dom";
import car_image from "../content/car.png";

interface PopupLocation {
  x: number;
  y: number;
  name: string;
  status: string;
}

const StatusContext = React.createContext<{
  onHover: (props: PopupLocation) => void;
  onHoverExit: () => void;
}>({
  onHover: ({ x, y }) => {},
  onHoverExit: () => {},
});

export default function CarStatus({
  bmsFault,
  mitsubaFault,
  mppt1Fault,
  mppt2Fault,
  mppt3Fault,
}: {
  bmsFault: boolean | null;
  mitsubaFault: boolean | null;
  mppt1Fault: boolean | null;
  mppt2Fault: boolean | null;
  mppt3Fault: boolean | null;
}) {
  const [popupLocation, setPopupLocation] =
    React.useState<PopupLocation | null>(null);
  return (
    <StatusContext.Provider
      value={{
        onHover: (coord) => {
          setPopupLocation(coord);
        },
        onHoverExit: () => setPopupLocation(null),
      }}
    >
      <svg width="100%" viewBox="0 0 700 300">
        <image href={car_image} y="0" x="0" />
        <Section
          name="BMS"
          errorLink="/bms#rx4"
          isFault={bmsFault}
          height="26"
          width="134"
          y="195"
          x="390"
        />
        <Section
          name="Motor Controller"
          errorLink="/#rx2"
          isFault={mitsubaFault}
          height="42"
          width="19"
          y="120"
          x="390"
        />
        <Section name={"Rear Lights"} height="36" width="15" y="180" x="580" />
        <Section
          name="Steering Wheel"
          transform="rotate(-21 230 110)"
          height="40"
          width="20"
          y="110"
          x="230"
        />
        <Section name="Front Lights" height="22" width="22" y="190" x="80" />
        <Section
          name="MPPT #1"
          isFault={mppt1Fault}
          errorLink="/mppt_1#rx5"
          height="22"
          width="22"
          y="200"
          x="250"
        />
        <Section
          name="MPPT #2"
          isFault={mppt2Fault}
          errorLink="/mppt_2#rx5"
          height="22"
          width="22"
          y="200"
          x="290"
        />
        <Section
          name="MPPT #3"
          isFault={mppt3Fault}
          errorLink="/mppt_3#rx5"
          height="22"
          width="22"
          y="200"
          x="330"
        />
        {popupLocation !== null && <Popup info={popupLocation} />}
      </svg>
    </StatusContext.Provider>
  );
}

function Popup({ info }: { info: PopupLocation }) {
  const WIDTH = 150;
  const HEIGHT = 50;

  const backgroundX = info.x;
  const backgroundY = info.y - HEIGHT;

  return (
    <>
      <rect
        pointerEvents="none"
        stroke="#000"
        strokeWidth="4px"
        width={WIDTH}
        height={HEIGHT}
        fill="white"
        x={backgroundX}
        y={backgroundY}
      />
      <text
        x={backgroundX + WIDTH / 2}
        y={backgroundY + 20}
        textAnchor="middle"
      >
        {info.name}
      </text>
      <text
        x={backgroundX + WIDTH / 2}
        y={backgroundY + 40}
        textAnchor="middle"
      >
        {info.status}
      </text>
    </>
  );
}

interface SectionProps extends React.SVGProps<SVGRectElement> {
  errorLink?: string;
  isFault?: boolean | null;
  name: string;
  x: string;
  y: string;
}

function Section({ isFault, errorLink, name, ...rest }: SectionProps) {
  const status = React.useContext(StatusContext);
  const navigate = useNavigate();
  const [isHover, setIsHover] = React.useState(false);
  let fillColor = "#D3D3D3";
  let statusLabel = "Not Implemented";
  if (isFault) {
    fillColor = "#ff0000";
    statusLabel = "Fault";
    statusLabel = (errorLink ? "Click to see " : "") + statusLabel;
  } else if (isFault == false) {
    fillColor = "#00ff00";
    statusLabel = "Ok";
  }

  return (
    <rect
      {...rest}
      stroke="#000"
      strokeWidth={isHover ? "4px" : "2px"}
      fill={fillColor}
      cursor="pointer"
      onClick={() => {
        if (errorLink) {
          navigate(errorLink);
        }
      }}
      onMouseEnter={() => {
        status.onHover({
          x: parseInt(rest.x),
          y: parseInt(rest.y),
          name: name,
          status: statusLabel,
        });
        setIsHover(true);
      }}
      onMouseLeave={() => {
        status.onHoverExit();
        setIsHover(false);
      }}
    />
  );
}
