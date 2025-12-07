package com.majami.hacknation.feature.voting.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "votings")
public class Voting {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private Integer abstain;

    private LocalDateTime date;

    @Column(length = 2000)
    private String description;

    @Enumerated(EnumType.STRING)
    private VotingKind kind;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "voting_id")
    private List<VotingLink> links;

    @Enumerated(EnumType.STRING)
    private MajorityType majorityType;

    private Integer majorityVotes;

    private Integer no;

    private Integer notParticipating;

    private Integer present;

    private Integer sitting;

    private Integer sittingDay;

    private Integer term;

    @Column(length = 2000)
    private String title;

    @Column(length = 4000)
    private String topic;

    private Integer totalVoted;

    private Integer votingNumber;

    private Integer yes;

}
