package com.majami.hacknation.feature.legislation.utils;

import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.majami.hacknation.core.handler.exception.BusinessException;
import com.majami.hacknation.core.handler.exception.BusinessExceptionReason;
import com.majami.hacknation.feature.legislation.dto.LegislationApiDto;
import com.majami.hacknation.feature.legislation.model.Legislation;
import com.majami.hacknation.feature.legislation.repository.LegislationRepository;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class ApiLegislationManager {
  private final LegislationRepository legislationRepository;

  public List<Legislation> getAllLegislationFromApi() {
    try {
      URL url = new URL("https://api.sejm.gov.pl/sejm/term10/processes");
      HttpURLConnection con = (HttpURLConnection) url.openConnection();
      con.setRequestMethod("GET");

      int status = con.getResponseCode();

      InputStream stream = (status >= 200 && status < 300)
        ? con.getInputStream()
        : con.getErrorStream();

      if (status < 200 || status >= 300) {
        throw new BusinessException(BusinessExceptionReason.API_ERROR, "API returned status: " + status);
      }

      ObjectMapper mapper = new ObjectMapper();
      mapper.registerModule(new com.fasterxml.jackson.datatype.jsr310.JavaTimeModule());
      mapper.configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false);

      List<LegislationApiDto> response =
        mapper.readValue(stream, new TypeReference<List<LegislationApiDto>>() {});

      List<Legislation> legislations = new ArrayList<>();
      for (LegislationApiDto legislation : response) {
        System.out.println(legislation);
        if (legislation.closureDate() != null) {
          Legislation l = new Legislation(legislation.term(), legislation.number(), legislation.title(), legislation.description(), legislation.changeDate(), legislation.passed(), legislation.closureDate());
          legislationRepository.save(l);
          legislations.add(l);
        } else {
          Legislation l = new Legislation(legislation.term(), legislation.number(), legislation.title(), legislation.description(), legislation.changeDate(), legislation.passed());
          legislationRepository.save(l);
          legislations.add(l);
        }
      }

      return legislations;
    } catch (Exception e) {
      System.out.println(e);
      throw new BusinessException(BusinessExceptionReason.ALL_LEGISLATIONS_EXCEPTION);
    }
  }
}
