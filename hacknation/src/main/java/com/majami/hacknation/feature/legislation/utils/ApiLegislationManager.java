package com.majami.hacknation.feature.legislation.utils;

import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.majami.hacknation.core.handler.exception.ApplicationException;
import com.majami.hacknation.core.handler.exception.ApplicationExceptionReason;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.majami.hacknation.core.handler.exception.BusinessException;
import com.majami.hacknation.core.handler.exception.BusinessExceptionReason;
import com.majami.hacknation.feature.legislation.dto.LegislationApiDto;
import com.majami.hacknation.feature.legislation.dto.AiAgentResponse;
import com.majami.hacknation.feature.legislation.model.Legislation;
import com.majami.hacknation.feature.legislation.repository.LegislationRepository;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class ApiLegislationManager {
  private final LegislationRepository legislationRepository;
  @Value("${api.external.api.url}")
  private String externalUrl;

  @Value("${ai.agent.url}")
  private String aiAgentUrl;

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
        AiAgentResponse aiResponse = getAiExplanationFromAgent();
        String aiExplanation = aiResponse == null ? null : aiResponse.content();
        List<String> aiKeyPoints = aiResponse == null ? null : aiResponse.keypoints();
        if (legislation.closureDate() != null) {
          Legislation l = new Legislation(legislation.term(), legislation.number(), legislation.title(), legislation.description(), legislation.changeDate(), legislation.passed(), legislation.closureDate());
          l.setAiExplanation(aiExplanation);
          l.setKeypoints(aiKeyPoints);
          legislationRepository.save(l);
          legislations.add(l);
        } else {
          Legislation l = new Legislation(legislation.term(), legislation.number(), legislation.title(), legislation.description(), legislation.changeDate(), legislation.passed());
          l.setAiExplanation(aiExplanation);
          l.setKeypoints(aiKeyPoints);
          legislationRepository.save(l);
          legislations.add(l);
        }
      }

      return legislations;
    } catch (Exception e) {
      throw new BusinessException(BusinessExceptionReason.ALL_LEGISLATIONS_EXCEPTION);
    }
  }

  private AiAgentResponse getAiExplanationFromAgent() {
    InputStream stream = null;
    try {
      ObjectMapper mapper = new ObjectMapper();
      Map<String, String> body = new HashMap<>();
      body.put("link", "https://orka.sejm.gov.pl/Druki10ka.nsf/0/BFD04848ECC80979C1258D55002D7562/%24File/2037.pdf");
      String requestBody = mapper.writeValueAsString(body);

      String agentUrl = aiAgentUrl == null || aiAgentUrl.isBlank() ? "http://agent:5000/explain" : aiAgentUrl.trim();
      if (!agentUrl.startsWith("http://") && !agentUrl.startsWith("https://")) {
        agentUrl = "http://" + agentUrl;
      }

      URL url = new URL(agentUrl);
      HttpURLConnection con = (HttpURLConnection) url.openConnection();
      con.setRequestMethod("POST");
      con.setDoOutput(true);
      con.setRequestProperty("Content-Type", "application/json; charset=UTF-8");

      try (java.io.OutputStream os = con.getOutputStream()) {
        os.write(requestBody.getBytes(java.nio.charset.StandardCharsets.UTF_8));
        os.flush();
      }

      int status = con.getResponseCode();
      stream = (status >= 200 && status < 300) ? con.getInputStream() : con.getErrorStream();

      if (status < 200 || status >= 300) {
        String err = stream == null ? null : new String(stream.readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
        throw new ApplicationException(ApplicationExceptionReason.FAILED_TO_FETCH_EXPLANATION);
      }

      String responseBody = stream == null ? null : new String(stream.readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
      if (responseBody == null) {
        throw new ApplicationException(ApplicationExceptionReason.FAILED_TO_FETCH_EXPLANATION);
      }

      return mapper.readValue(responseBody, AiAgentResponse.class);

    } catch (Exception e) {
      throw new BusinessException(BusinessExceptionReason.FETCHING_AI_EXPLANATION_ERROR);
    } finally {
      if (stream != null) try { stream.close(); } catch (Exception ignored) { /* ignore */ }
    }
  }
}
