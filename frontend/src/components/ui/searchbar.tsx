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
    const [inputValue, setInputValue] = useState(value);

    // Create a debounced version of onChange using useMemo
    const debouncedOnChange = useMemo(
        () =>
            debounce((val: string) => {
                onChange(val);
            }, 300), // 300ms debounce delay
        [onChange]
    );

    // Update debounced onChange when inputValue changes
    useEffect(() => {
        debouncedOnChange(inputValue);
        // Cancel debounce on unmount
        return () => {
            debouncedOnChange.cancel();
        };
    }, [inputValue, debouncedOnChange]);

    // Also update inputValue when parent changes value prop
    useEffect(() => {
        setInputValue(value);
    }, [value]);

    return (
        <input
            type="search"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={placeholder}
            className={`border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#1E3A5F] bg-[#1E3A5F] text-white placeholder-white ${className}`}
            aria-label="Search"
        />
    );
}
