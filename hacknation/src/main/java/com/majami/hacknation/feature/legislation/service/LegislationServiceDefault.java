package com.majami.hacknation.feature.legislation.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.majami.hacknation.feature.legislation.model.Legislation;
import com.majami.hacknation.feature.legislation.utils.ApiLegislationManager;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class LegislationServiceDefault implements LegislationService {
  private final ApiLegislationManager apiLegislationManager;

  @Override
  public List<Legislation> getAllLegislation(int term, int legislationNumber) {
    List<Legislation> response = apiLegislationManager.getAllLegislationFromApi(term, legislationNumber);

    return response;
  }

  @Override
  public Legislation getLegislation(int term, int number) {
    Legislation response = apiLegislationManager.getSpecificLegislationFromApi(term, number);

    return response;
  }
}
