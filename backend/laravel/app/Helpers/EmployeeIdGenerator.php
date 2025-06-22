<?php

namespace App\Helpers;

use App\Models\User;

class EmployeeIdGenerator
{
    public static function generate()
    {
        $lastUser = User::whereNotNull('employee_id')
            ->orderBy('employee_id', 'desc')
            ->first();

        if (!$lastUser || !$lastUser->employee_id) {
            return 'EMP001';
        }

        $lastNumber = (int) filter_var($lastUser->employee_id, FILTER_SANITIZE_NUMBER_INT);
        $nextNumber = $lastNumber + 1;

        return 'EMP' . str_pad($nextNumber, 3, '0', STR_PAD_LEFT);
    }
}
