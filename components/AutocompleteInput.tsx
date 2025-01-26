"use client";

import React, { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

interface AutocompleteInputProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  stations: string[];
}

export function AutocompleteInput({
  placeholder,
  value,
  onChange,
  stations,
}: AutocompleteInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filteredStations, setFilteredStations] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const filtered = stations.filter((station) =>
      station.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredStations(filtered);
    setIsOpen(filtered.length > 0 && value.length > 0);
  }, [value, stations]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (station: string) => {
    onChange(station);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={inputRef}>
      <Input
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsOpen(true)}
        className="bg-white"
      />
      {isOpen && (
        <ScrollArea className="absolute z-10 w-full max-h-60 mt-1 bg-white border border-gray-200 rounded-md shadow-lg">
          <ul className="py-1">
            {filteredStations.map((station, index) => (
              <li
                key={index}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSelect(station)}
              >
                {station}
              </li>
            ))}
          </ul>
        </ScrollArea>
      )}
    </div>
  );
}
