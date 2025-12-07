package com.majami.hacknation.core.handler.exception;

import com.majami.hacknation.core.handler.exception.policy.ApplicationExceptionPolicy;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ApplicationExceptionReason implements ApplicationExceptionPolicy {
    BEAN_PROPERTY_NOT_EXISTS("Property '%s' for object '%s' doesn't exists"),
    FAILED_TO_FETCH_EXPLANATION("Failed to fetch explanation from AI Agent");

    private final String code = name();
    private final String message;
}
