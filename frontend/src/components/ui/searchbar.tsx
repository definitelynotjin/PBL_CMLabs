'use client';

import React, { useState, useEffect, useMemo } from 'react';
import debounce from 'lodash.debounce';

interface SearchBarProps {
    value: string;
    onChange: (newValue: string) => void;
    placeholder?: string;
    className?: string;
}

export default function SearchBar({
    value,
    onChange,
    placeholder = 'Search...',
    className = '',
}: SearchBarProps) {
    const [localValue, setLocalValue] = useState(value);

    useEffect(() => {
        setLocalValue(value);
    }, [value]);

    const debouncedChange = useMemo(
        () => debounce(onChange, 300),
        [onChange]
    );

    useEffect(() => {
        debouncedChange(localValue);
        return () => debouncedChange.cancel();
    }, [localValue, debouncedChange]);

    return (
        <input
            type="search"
            value={localValue}
            onChange={(e) => setLocalValue(e.target.value)}
            placeholder={placeholder}
            className={`bg-white text-[#1E3A5F] placeholder-[#1E3A5F] text-sm rounded-lg px-4 py-2 w-full shadow-sm border border-[#1E3A5F] focus:outline-none focus:ring-2 focus:ring-[#1E3A5F] transition duration-200 ${className}`}
            aria-label="Search"
        />
    );
}
