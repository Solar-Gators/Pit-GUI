import React from "react"
import car_image from "../content/car.png"

export default function CarStatus() {
    return (
        <svg width="1200" height="300">
            <image
                transform="rotate(-0.269396 641.59 264.41)"
                href={car_image}
                height="279"
                width="1082"
                y="0"
                x="100.59017"
            />
            <rect
                height="26"
                width="134"
                y="201"
                x="514"
                stroke="#000"
                fill="#00ff00"
            />
            <rect
                height="42"
                width="19"
                y="127"
                x="511"
                stroke="#000"
                fill="#00ff00"
            />
            <rect
                height="36"
                width="15"
                y="180"
                x="705"
                stroke="#000"
                fill="#00ff00"
            />
            <rect
                transform="rotate(-21 364.948 129)" stroke="#000"
                height="20"
                width="7"
                y="129"
                x="361"
                fill="#00ff00"
            />
            <rect
                height="22"
                width="22"
                y="198"
                x="202"
                stroke="#000"
                fill="#00ff00"
            />
        </svg>
    )
}
