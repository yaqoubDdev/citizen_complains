"use client"

import { useEffect, useState } from "react"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"
import { Problem } from "@/lib/types"

// Fix for default marker icon
const iconUrl = "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png"
const iconRetinaUrl =
    "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png"
const shadowUrl = "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png"

const customIcon = new L.Icon({
    iconUrl,
    iconRetinaUrl,
    shadowUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
})

interface MapViewProps {
    problems: Problem[]
}

export default function MapView({ problems }: MapViewProps) {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return (
            <div className="flex h-full w-full items-center justify-center bg-muted">
                <p className="text-muted-foreground">Loading map...</p>
            </div>
        )
    }

    return (
        <MapContainer
            center={[51.505, -0.09]}
            zoom={13}
            scrollWheelZoom={false}
            className="h-full w-full"
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {problems.map((problem) => (
                <Marker
                    key={problem.id}
                    position={[problem.location.lat, problem.location.lng]}
                    icon={customIcon}
                >
                    <Popup>
                        <div className="max-w-xs">
                            <h3 className="font-bold">{problem.title}</h3>
                            <p className="text-sm text-gray-600">{problem.description}</p>
                            <div className="mt-2 text-xs text-gray-500">
                                {problem.upvotes} upvotes
                            </div>
                        </div>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    )
}
