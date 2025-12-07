package com.majami.hacknation.feature.legislation.model;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import lombok.NoArgsConstructor;
import org.hibernate.annotations.UpdateTimestamp;

import com.majami.hacknation.feature.stage.model.Stage;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "legislations")
@NoArgsConstructor
public class Legislation {
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private UUID id;
  private int sejmTerm;
  private int apiLegislationNumber;
  @Column(columnDefinition = "TEXT", length = 500)
  private String title;
  @Column(columnDefinition = "TEXT", length = 1000)
  private String description;
  @Column(columnDefinition = "TEXT", length = 2000)
  private String aiExplanation;
  private List<String> keypoints;
  @OneToMany(mappedBy = "legislation", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<Stage> stages;
  private LocalDateTime createdt;
  @UpdateTimestamp
  private LocalDateTime updatedAt;
  private LocalDate closureDate;
  private LocalDateTime updatedOnApiAt;
  private LegislationStatus status;

  public Legislation(int sejmTerm,
    int apiLegislationNumber,
    String title,
    String description,
    LocalDateTime updatedOnApiAt,
    Boolean passed,
    LocalDate closedAt) {
      this.sejmTerm = sejmTerm;
      this.apiLegislationNumber = apiLegislationNumber;
      this.title = title;
      this.description = description;
      this.updatedOnApiAt = updatedOnApiAt;
      this.createdt = LocalDateTime.now();
      this.updatedAt = LocalDateTime.now();
      if (passed) {
        this.status = LegislationStatus.PASSED;
      } else {
        this.status = LegislationStatus.REJECTED;
      }
      this.closureDate = closedAt;
    }

  public Legislation(int sejmTerm,
    int apiLegislationNumber,
    String title,
    String description,
    LocalDateTime updatedOnApiAt,
    Boolean passed) {
      this.sejmTerm = sejmTerm;
      this.apiLegislationNumber = apiLegislationNumber;
      this.title = title;
      this.description = description;
      this.updatedOnApiAt = updatedOnApiAt;
      this.createdt = LocalDateTime.now();
      this.updatedAt = LocalDateTime.now();
      this.status = LegislationStatus.DURING;
    }
}
