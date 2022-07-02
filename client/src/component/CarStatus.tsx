import React from "react"
import car_image from "../content/car.png"

interface PopupLocation {
    x: number
    y: number
    name: string
    status: "Ok" | "Fault" | "No Data"
}

const StatusContext = React.createContext<{
    onHover: (props: PopupLocation) => void
    onHoverExit: () => void
}>({
    onHover: ({x,y}) => {},
    onHoverExit: () => {}
})




export default function CarStatus({
    bmsFault,
    mitsubaFault,
}: {
    bmsFault: boolean | null
    mitsubaFault: boolean | null
}) {
    const [popupLocation, setPopupLocation] = React.useState<PopupLocation | null>(null)
    return (
        <StatusContext.Provider value={{
            onHover: (coord) => {
                setPopupLocation(coord)
            },
            onHoverExit: () => setPopupLocation(null)
        }}>
            <svg width="700" height="300">
                <image
                    href={car_image}
                    y="0"
                    x="0"
                />
                <Section
                    name="BMS"
                    isFault={bmsFault}
                    height="26"
                    width="134"
                    y="195"
                    x="390"
                />
                <Section
                    name="Motor Controller"
                    isFault={mitsubaFault}
                    height="42"
                    width="19"
                    y="120"
                    x="390"
                />
                <Section
                    name={"Rear Lights"}
                    isFault={false}
                    height="36"
                    width="15"
                    y="180"
                    x="580"
                />
                <Section
                    name="Steering Wheel"
                    isFault={false}
                    transform="rotate(-21 230 110)"
                    height="40"
                    width="20"
                    y="110"
                    x="230"
                />
                <Section
                    name="Front Lights"
                    isFault={false}
                    height="22"
                    width="22"
                    y="190"
                    x="80"
                />
                {popupLocation !== null && <Popup info={popupLocation} />}
            </svg>
        </StatusContext.Provider>
    )
}

function Popup({ info }: { info: PopupLocation }) {
    const WIDTH = 150
    const HEIGHT = 50

    const backgroundX = info.x
    const backgroundY = info.y - HEIGHT

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
                x={backgroundX + WIDTH/2}
                y={backgroundY + 20}
                textAnchor="middle"
            >
                {info.name}
            </text>
            <text
                x={backgroundX + WIDTH/2}
                y={backgroundY + 40}
                textAnchor="middle"
            >
                {info.status}
            </text>
        </>
    )
}


function Section({ isFault, name, ...rest}: React.SVGProps<SVGRectElement> & { isFault: boolean | null, name: string, x: string, y: string }) {
    const status = React.useContext(StatusContext)
    const [isHover, setIsHover] = React.useState(false)
    return <rect
        {...rest}
        stroke="#000"
        strokeWidth={isHover ? "4px" : "2px"}
        fill={isFault === false ? "#00ff00" : isFault === true ? "#ff0000" : "#ffff00"}
        cursor="pointer"
        onMouseEnter={() => {
            status.onHover({
                x: parseInt(rest.x),
                y: parseInt(rest.y),
                name: name,
                status: isFault === false ? "Ok" : isFault === true ? "Fault" : "No Data"
            })
            setIsHover(true)
        }}
        onMouseLeave={() => {
            status.onHoverExit()
            setIsHover(false)
        }}
    />
}
