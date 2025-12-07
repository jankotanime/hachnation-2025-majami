package com.majami.hacknation.feature.legislation.service;

import java.util.List;

import com.majami.hacknation.feature.legislation.model.Legislation;

public interface LegislationService {
  public List<Legislation> getAllLegislation(int term, int legislationNumber);
  public Legislation getLegislation(int term, int number);
}
