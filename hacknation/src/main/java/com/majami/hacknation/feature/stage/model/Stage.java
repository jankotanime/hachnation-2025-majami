package com.majami.hacknation.feature.stage.model;

import com.majami.hacknation.feature.voting.model.Voting;
import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import com.majami.hacknation.feature.legislation.model.Legislation;
import com.majami.hacknation.feature.stage.dto.FetchedStageDto;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "stages")
public class Stage {
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private UUID id;

  @ManyToOne
  @JoinColumn(name = "legislation_id")
  private Legislation legislation;

  private Integer term;

  private LocalDate date;

  private String stageName;

  private String printNumber;

  private StageType stageType;

  private LegislativeStage legislativeStage;

  private String committeeCode;

  private RefferalType type;

  private String comment;

  private String decision;

  private Double sittingNum;

  @OneToOne(cascade = jakarta.persistence.CascadeType.ALL)
  @JoinColumn(name = "voting_id")
  private Voting voting;

  private String textAfter3;

  private String organ;

  private String title;

  private Double minorityMotions;

  private String proposal;

  private Integer reporterId;

  private String reporterName;

  private String reportFile;

  private String subCommittee;

  private String position;

  private String otherDocuments;

  private Integer opinionReceived;

  private Integer toCommission;

  private String omittedInconsistent;

  @ElementCollection
  @CollectionTable(name = "stage_continued_on", joinColumns = @JoinColumn(name = "stage_id"))
  @Column(name = "continued_on_value")
  private List<String> continuedOn;

  @ElementCollection
  @CollectionTable(name = "stage_links", joinColumns = @JoinColumn(name = "stage_id"))
  @Column(name = "link_value")
  private List<String> links;

  private Integer publicationNumber;

  private Integer publicationPosition;

  private Integer publicationYear;

  private String publisher;

  private String verdict;

  private LocalDate reportDate;

  @ManyToOne
  @JoinColumn(name = "parent_id")
  private Stage parent;

  @OneToMany(cascade = jakarta.persistence.CascadeType.ALL, orphanRemoval = true)
  @JoinColumn(name = "parent_id")
  private List<Stage> children;

  public static Stage from(FetchedStageDto dto) {
    if (dto == null) return null;
    Stage s = new Stage();

    s.setTerm(dto.term());
    s.setDate(dto.date());
    s.setStageName(dto.stageName());
    s.setPrintNumber(dto.printNumber());
    s.setStageType(dto.stageType());
    s.setLegislativeStage(dto.legislativeStage());
    s.setCommitteeCode(dto.committeeCode());
    s.setType(dto.type());
    s.setComment(dto.comment());
    s.setDecision(dto.decision());
    s.setSittingNum(dto.sittingNum());
    s.setTextAfter3(dto.textAfter3());
    s.setOrgan(dto.organ());
    s.setTitle(dto.title());
    s.setMinorityMotions(dto.minorityMotions());
    s.setProposal(dto.proposal());
    s.setReporterId(dto.reporterId());
    s.setReporterName(dto.reporterName());
    s.setReportFile(dto.reportFile());
    s.setSubCommittee(dto.subCommittee());
    s.setPosition(dto.position());
    s.setOtherDocuments(dto.otherDocuments());
    s.setOpinionReceived(dto.opinionReceived());
    s.setToCommission(dto.toCommission());
    s.setOmittedInconsistent(dto.omittedInconsistent());
    s.setContinuedOn(dto.continuedOn() == null ? null : new ArrayList<>(dto.continuedOn()));
    s.setLinks(dto.links() == null ? null : new ArrayList<>(dto.links()));
    s.setPublicationNumber(dto.publicationNumber());
    s.setPublicationPosition(dto.publicationPosition());
    s.setPublicationYear(dto.publicationYear());
    s.setPublisher(dto.publisher());
    s.setVerdict(dto.verdict());
    s.setReportDate(dto.reportDate());
    s.setChildren(dto.children() == null ? null : new ArrayList<>(dto.children()));

    return s;
  }

  @CreationTimestamp
  private LocalDateTime createdAt;

  @UpdateTimestamp
  private LocalDateTime updatedAt;
}
