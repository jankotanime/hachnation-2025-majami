package com.majami.hacknation.core.handler.exception;

import com.majami.hacknation.core.handler.exception.dto.FieldValidationErrorsDto;
import com.majami.hacknation.core.handler.exception.policy.BusinessExceptionPolicy;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

import java.util.List;

@Getter
@AllArgsConstructor
public enum BusinessExceptionReason implements BusinessExceptionPolicy {
    EXAMPLE_EXCEPTION("example", HttpStatus.NOT_FOUND, null),
    ALL_LEGISLATIONS_EXCEPTION("Error while getting all legislations", HttpStatus.NOT_FOUND, null),
    API_ERROR("Error while connecting with API", HttpStatus.NOT_FOUND, null),
    FETCHING_AI_EXPLANATION_ERROR("Error while fetching ai explanation", HttpStatus.NOT_FOUND, null);

    private final String code = name();
    private final String message;
    private final HttpStatus httpStatus;
    private final List<FieldValidationErrorsDto> errors;
}
