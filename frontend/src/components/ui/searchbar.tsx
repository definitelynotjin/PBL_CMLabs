'use client';

import React, { useState, useEffect, useMemo } from 'react';
import debounce from 'lodash.debounce';
import { Search } from 'lucide-react';

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

    const debouncedChange = useMemo(() => debounce(onChange, 300), [onChange]);

    useEffect(() => {
        debouncedChange(localValue);
        return () => debouncedChange.cancel();
    }, [localValue, debouncedChange]);

    return (
        <div className={`relative w-full ${className}`}>
            <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#1E3A5F]"
                size={18}
                aria-hidden="true"
            />
            <input
                type="search"
                value={localValue}
                onChange={(e) => setLocalValue(e.target.value)}
                placeholder={placeholder}
                className="pl-10 pr-4 py-2 w-full rounded-lg border-2 border-[#1E3A5F] text-[#1E3A5F] placeholder-[#1E3A5F] bg-white focus:outline-none focus:ring-4 focus:ring-[#1E3A5F]/50 transition duration-200"
                aria-label="Search"
            />
        </div>
    );
}
