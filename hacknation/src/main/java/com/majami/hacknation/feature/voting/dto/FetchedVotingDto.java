package com.majami.hacknation.feature.voting.dto;

import com.majami.hacknation.feature.voting.model.MajorityType;
import com.majami.hacknation.feature.voting.model.VotingKind;
import com.majami.hacknation.feature.voting.model.VotingLink;
import jakarta.annotation.Nullable;

import java.time.LocalDateTime;
import java.util.List;

public record FetchedVotingDto(
     @Nullable Integer abstain,
     @Nullable LocalDateTime date,
     @Nullable String description,
     @Nullable VotingKind kind,
     @Nullable List<VotingLink> links,
     @Nullable MajorityType majorityType,
     @Nullable Integer majorityVotes,
     @Nullable Integer no,
     @Nullable Integer notParticipating,
     @Nullable Integer present,
     @Nullable Integer sitting,
     @Nullable Integer sittingDay,
     @Nullable Integer term,
     @Nullable String title,
     @Nullable String topic,
     @Nullable Integer totalVoted,
     @Nullable Integer votingNumber,
     @Nullable Integer yes) {}
