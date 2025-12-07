package com.majami.hacknation.feature.legislation.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.majami.hacknation.feature.legislation.model.Legislation;
import com.majami.hacknation.feature.legislation.service.LegislationService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/legislation")
public class LegislationController {
  private final LegislationService legislationService;

  @GetMapping
  public ResponseEntity<List<Legislation>> getAllLegislation(@RequestParam("term") int term, @RequestParam("number") int legislationNumber) {
    List<Legislation> response = legislationService.getAllLegislation(term, legislationNumber);
    return ResponseEntity.ok(response);
  }

  @GetMapping("/{number}")
  public ResponseEntity<Legislation> getSpecificLegislation(@RequestParam("term") int term, @PathVariable("number") int legislationNumber) {
    Legislation response = legislationService.getLegislation(term, legislationNumber);
    return ResponseEntity.ok(response);
  }
}
