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
            className={`bg-[#7CA5BF] text-white placeholder-white text-sm rounded-md px-3 py-1.5 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 ${className}`}
            aria-label="Search"
        />
    );
}
