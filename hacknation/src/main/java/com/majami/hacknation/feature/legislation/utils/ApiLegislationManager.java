package com.majami.hacknation.feature.legislation.utils;

import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.majami.hacknation.core.handler.exception.BusinessException;
import com.majami.hacknation.core.handler.exception.BusinessExceptionReason;
import com.majami.hacknation.feature.legislation.dto.LegislationApiDto;
import com.majami.hacknation.feature.legislation.model.Legislation;
import com.majami.hacknation.feature.legislation.repository.LegislationRepository;
import com.majami.hacknation.feature.stage.dto.FetchedStageDto;
import com.majami.hacknation.feature.stage.model.Stage;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class ApiLegislationManager {
  private final LegislationRepository legislationRepository;
  @Value("${api.external.api.url}")
  private String externalUrl;

  public List<Legislation> getAllLegislationFromApi(int term, int legislationNumber) {
    try {
      URL url = new URL(externalUrl + "/sejm/term" + term + "/processes?limit=50&offset="+legislationNumber);
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

  public Legislation getSpecificLegislationFromApi(int term, int number) {
    try {
      URL url = new URL(externalUrl + "/sejm/term" + term + "/processes/"+number);
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

      LegislationApiDto legislation =
        mapper.readValue(stream, new TypeReference<LegislationApiDto>() {});

      Optional<Legislation> lOptional = legislationRepository.findByTermAndNumber(term, number);

      Legislation l;
      if (lOptional.isEmpty()) {
        if (legislation.closureDate() != null) {
          l = new Legislation(legislation.term(), legislation.number(), legislation.title(), legislation.description(), legislation.changeDate(), legislation.passed(), legislation.closureDate());
          legislationRepository.save(l);
        } else {
          l = new Legislation(legislation.term(), legislation.number(), legislation.title(), legislation.description(), legislation.changeDate(), legislation.passed());
          legislationRepository.save(l);
        }
      } else {
        l = lOptional.get();
      }

      if (l.getUpdatedOnApiAt().isAfter(l.getUpdatedAt()) || l.getAiExplanation() == null || l.getAiExplanation().isEmpty()) {
        l.setUpdatedAt(LocalDateTime.now());
        l.setAiExplanation("aaa");
        System.out.println("BOOM");
        System.out.println(legislation.stages());
        for (FetchedStageDto s : legislation.stages()) {
          Stage newStage = Stage.from(s);
          List<Stage> snewList = l.getStages();
          System.out.println(s);
          System.out.println(newStage);
          System.out.println(snewList);
          snewList.add(newStage);
          l.setStages(snewList);
        }

        legislationRepository.save(l);
      }

      return l;
    } catch (Exception e) {
      System.out.println(e);
      throw new BusinessException(BusinessExceptionReason.ALL_LEGISLATIONS_EXCEPTION);
    }
  }
}
