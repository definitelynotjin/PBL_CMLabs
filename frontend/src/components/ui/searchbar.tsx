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
                className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#1E3A5F]"
                size={16}
            />

            <input
                type="search"
                value={localValue}
                onChange={(e) => setLocalValue(e.target.value)}
                placeholder={placeholder}
                className="pl-9 pr-3 py-1.5 text-sm w-full rounded-md border border-[#1E3A5F] text-[#1E3A5F] placeholder-[#1E3A5F] bg-white focus:outline-none focus:ring-2 focus:ring-[#1E3A5F]/50 transition duration-200"
            />

        </div>
    );
}
