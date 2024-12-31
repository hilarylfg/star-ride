"use client";

import { useState, useCallback } from "react";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import {CarTaxiFront} from "lucide-react";

interface Suggestion {
    title: { text: string };
    subtitle?: { text: string };
    tags: string[];
}

const ZOOM_LEVELS: Record<string, number> = {
    house: 17,
    street: 14,
    locality: 12,
    region: 8,
    country: 5,
    metro: 17,
    business: 17,
};

const DEFAULT_COORDINATES: [number, number] = [55.751574, 37.573856];
const DEFAULT_ZOOM = 10;

export function MapComponent() {
    const [inputValue, setInputValue] = useState("");
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    const [coordinates, setCoordinates] = useState<[number, number]>(DEFAULT_COORDINATES);
    const [zoom, setZoom] = useState(DEFAULT_ZOOM);
    const [isLoading, setIsLoading] = useState(false);

    const fetchSuggestions = useCallback(async (text: string) => {
        if (text.length < 3) {
            setSuggestions([]);
            return;
        }
        try {
            const response = await fetch(
                `https://suggest-maps.yandex.ru/v1/suggest?apikey=${process.env.NEXT_PUBLIC_YANDEX_MAPS_GEOSUGGET_API_KEY}&text=${text}&bbox=19.592,41.185~170.0,81.858`
            );
            const data = await response.json();
            setSuggestions(data.results);
        } catch (error) {
            console.error("Ошибка получения адресов:", error);
        }
    }, []);

    const handleSuggestionClick = useCallback(async (suggestion: Suggestion) => {
        setInputValue(suggestion.title.text);
        setSuggestions([]);

        const tagZoom = suggestion.tags.find((tag) => ZOOM_LEVELS[tag]) || DEFAULT_ZOOM;
        setZoom(ZOOM_LEVELS[tagZoom] || DEFAULT_ZOOM);

        const queryText = `${suggestion.title.text}${suggestion.subtitle ? `, ${suggestion.subtitle.text}` : ""}`;

        try {
            setIsLoading(true);
            const response = await fetch(
                `https://geocode-maps.yandex.ru/1.x/?apikey=${process.env.NEXT_PUBLIC_YANDEX_MAPS_API_KEY}&format=json&geocode=${queryText}&bbox=19.592,41.185~170.0,81.858&rspn=1`
            );
            const data = await response.json();
            const geoObject = data.response.GeoObjectCollection.featureMember[0]?.GeoObject;

            if (geoObject) {
                const pos = geoObject.Point.pos.split(" ").map(Number).reverse() as [number, number];
                setCoordinates(pos);
            }
        } catch (error) {
            console.error("Ошибка получения координат:", error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    return (
        <div className="map">
            <div className={"section-top"}>
                <div className={"logo"}>
                    <CarTaxiFront width={50} height={50}/>
                    <span>Драйв</span>
                </div>

            </div>

            <YMaps query={{ apikey: process.env.NEXT_PUBLIC_YANDEX_MAPS_API_KEY }}>
                <Map
                    state={{ center: coordinates, zoom }}
                    width="100%"
                    height="100vh"
                >
                    <Placemark geometry={coordinates} />
                </Map>
            </YMaps>

            <div className="section">
                <input
                    type="text"
                    placeholder="Введите адрес"
                    value={inputValue}
                    onChange={(e) => {
                        setInputValue(e.target.value);
                        fetchSuggestions(e.target.value);
                    }}
                />
                {isLoading && <p>Загрузка...</p>}
                {suggestions.length > 0 && (
                    <ul className="suggestions-list">
                        {suggestions.map((suggestion, index) => (
                            <li
                                key={index}
                                onClick={() => handleSuggestionClick(suggestion)}
                                className="suggestion-item"
                            >
                                <div>{suggestion.title.text}</div>
                                {suggestion.subtitle && (
                                    <div className="subtitle">
                                        {suggestion.subtitle.text}
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}