package com.majami.hacknation.feature.stage.repository;

import com.majami.hacknation.feature.stage.model.Stage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface StageRepository extends JpaRepository<Stage, UUID> {
}
