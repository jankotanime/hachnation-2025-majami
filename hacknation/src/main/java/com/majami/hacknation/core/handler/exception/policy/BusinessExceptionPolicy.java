package com.majami.hacknation.core.handler.exception.policy;

import com.majami.hacknation.core.handler.exception.dto.FieldValidationErrorsDto;
import org.springframework.http.HttpStatus;

import java.util.List;

public interface BusinessExceptionPolicy extends ExceptionPolicy {
    HttpStatus getHttpStatus();

    List<FieldValidationErrorsDto> getErrors();
}
