package com.majami.hacknation.feature.legislation.dto;

import java.util.List;
import com.fasterxml.jackson.annotation.JsonProperty;

public record AiAgentResponse(
    @JsonProperty("content") String content,
    @JsonProperty("key_points") List<String> keypoints
) {}
