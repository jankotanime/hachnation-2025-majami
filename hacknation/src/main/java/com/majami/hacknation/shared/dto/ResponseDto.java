package com.majami.hacknation.shared.dto;

import com.majami.hacknation.core.handler.exception.dto.FieldValidationErrorsDto;
import com.majami.hacknation.shared.enums.SuccessCode;
import jakarta.annotation.Nullable;

import java.time.LocalDateTime;
import java.util.List;

public record ResponseDto<T>(
        SuccessCode code,
        String message,
        LocalDateTime timestamp,
        @Nullable List<FieldValidationErrorsDto> error,
        T data) {
    public ResponseDto(
            SuccessCode code, String message, List<FieldValidationErrorsDto> errors, T data) {
        this(code, message, LocalDateTime.now(), errors, data);
    }

    public ResponseDto(SuccessCode code, String message, T data) {
        this(code, message, LocalDateTime.now(), null, data);
    }
}
