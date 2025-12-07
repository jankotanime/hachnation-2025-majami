package com.majami.hacknation.feature.legislation.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.majami.hacknation.feature.legislation.model.Legislation;

public interface LegislationRepository extends JpaRepository<Legislation, UUID> {}
