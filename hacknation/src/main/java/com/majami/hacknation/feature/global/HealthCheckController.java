package com.majami.hacknation.feature.global;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/health-check")
public class HealthCheckController {
  @GetMapping
  public ResponseEntity<String> getHealthcheck() {
    return ResponseEntity.ok("Checked, all good!");
  }
}
