package com.majami.hacknation.feature.legislation.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.majami.hacknation.feature.stage.dto.FetchedStageDto;

@JsonIgnoreProperties(ignoreUnknown = true)
public record LegislationApiDto(
  int term,
  int number,
  String title,
  String description,
  LocalDateTime changeDate,
  Boolean passed,
  List<FetchedStageDto> stages,
  LocalDate closureDate
) {}