package com.majami.hacknation.feature.legislation.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.majami.hacknation.feature.legislation.model.Legislation;

public interface LegislationRepository extends JpaRepository<Legislation, UUID> {
  default Optional<Legislation> findByTermAndNumber(int term, int number) {
    return findAll().stream()
      .filter(legislation -> legislation.getApiLegislationNumber() == number)
      .filter(legislation -> legislation.getSejmTerm() == term)
      .findFirst();
  }
}
