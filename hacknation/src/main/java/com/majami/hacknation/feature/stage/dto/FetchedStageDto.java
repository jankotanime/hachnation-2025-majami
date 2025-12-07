package com.majami.hacknation.feature.stage.dto;

import com.majami.hacknation.feature.stage.model.LegislativeStage;
import com.majami.hacknation.feature.stage.model.RefferalType;
import com.majami.hacknation.feature.stage.model.Stage;
import com.majami.hacknation.feature.stage.model.StageType;
import com.majami.hacknation.feature.voting.dto.FetchedVotingDto;
import jakarta.annotation.Nullable;

import java.time.LocalDate;
import java.util.List;

public record FetchedStageDto(
    @Nullable Integer term,
    @Nullable LocalDate date,
    @Nullable String stageName,
    @Nullable String printNumber,
    @Nullable StageType stageType,
    @Nullable LegislativeStage legislativeStage,
    @Nullable String committeeCode,
    @Nullable RefferalType type,
    @Nullable String comment,
    @Nullable String decision,
    @Nullable Double sittingNum,
    @Nullable FetchedVotingDto voting,
    @Nullable String textAfter3,
    @Nullable String organ,
    @Nullable String title,
    @Nullable Double minorityMotions,
    @Nullable String proposal,
    @Nullable Integer reporterId,
    @Nullable String reporterName,
    @Nullable String reportFile,
    @Nullable String subCommittee,
    @Nullable String position,
    @Nullable String otherDocuments,
    @Nullable Integer opinionReceived,
    @Nullable Integer toCommission,
    @Nullable String omittedInconsistent,
    @Nullable List<String>continuedOn,
    @Nullable List<String> links,
    @Nullable Integer publicationNumber,
    @Nullable Integer publicationPosition,
    @Nullable Integer publicationYear,
    @Nullable String publisher,
    @Nullable String verdict,
    @Nullable LocalDate reportDate,
    @Nullable List<Stage> children) {}
