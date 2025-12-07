package com.majami.hacknation.feature.stage.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum StageType {
  VETO("Veto"),
  READING("Reading"),
  END("End"),
  TO_PRESIDENT("ToPresident"),
  GOVERMENT_POSITION("GovermentPosition"),
  START("Start"),
  REFERRAL("Referral"),
  PRESIDENT_MOTION_CONSIDERATION("PresidentMotionConsideration"),
  SEJM_READING("SejmReading"),
  PUBLIC_HEARING("PublicHearing"),
  COMMITTEE_REPORT("CommitteeReport"),
  PRESIDENT_SIGNATURE("PresidentSignature"),
  PRESIDENT_TO_TRIBUNAL("PresidentToTribunal"),
  SENATE_POSITION("SenatePosition"),
  SENATE_POSITION_CONSIDERATION("SenatePositionConsideration"),
  OPINION("Opinion"),
  READING_REFERRAL("ReadingReferral"),
  VOTING("Voting"),
  CONSTITUTIONAL_TRIBUNAL_RULING("ConstitutionalTribunalRuling"),
  COMMITTEE_WORK("CommitteeWork");

  private final String code;

  StageType(String code) {
    this.code = code;
  }

  public String getCode() {
    return code;
  }

  @Override
  public String toString() {
    return code;
  }

  @JsonCreator
  public static StageType fromCode(String code) {
    if (code == null) return null;
    for (StageType s : values()) {
      if (s.code.equals(code)) return s;
    }
    for (StageType s : values()) {
      if (s.code.equalsIgnoreCase(code)) return s;
    }
    throw new IllegalArgumentException("Unknown StageType code: " + code);
  }

  @JsonValue
  public String toJson() {
    return code;
  }
}
