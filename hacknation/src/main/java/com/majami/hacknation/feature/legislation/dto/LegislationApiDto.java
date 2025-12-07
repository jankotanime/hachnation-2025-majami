package com.majami.hacknation.feature.legislation.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public record LegislationApiDto(
  int term,
  int number,
  String title,
  String description,
  LocalDateTime changeDate,
  Boolean passed,
  LocalDate closureDate
) {}