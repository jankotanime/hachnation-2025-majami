package com.majami.hacknation.feature.security;

import lombok.RequiredArgsConstructor;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityFilterChainDevConfiguration {
  private final AccessTokenSecretConfiguration accessTokenSecretConfiguration;

  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
    String secretKey = accessTokenSecretConfiguration.getSecretKey();

    httpSecurity
    .authorizeHttpRequests(
      auth ->
        auth.requestMatchers(HttpMethod.GET, "/health-check")
          .permitAll()
          .requestMatchers(HttpMethod.GET, "/legislation*")
          .permitAll()
          .anyRequest()
          .authenticated())
      .exceptionHandling(
        eh ->
          eh.authenticationEntryPoint(
            (request, response, authException) -> {
              response.setStatus(401);
              response.setContentType("application/json");
              response.setCharacterEncoding("UTF-8");
              new ObjectMapper()
              .writeValue(response.getWriter(), "Access token error!");
              response.getWriter().flush();
            }))
      .csrf(
        csrf ->
          csrf.requireCsrfProtectionMatcher(
            request ->
              request.getServletPath() != null
                && request.getServletPath()
                  .startsWith("/web")))
      .logout(logout -> logout.disable())
      .formLogin(AbstractHttpConfigurer::disable)
      .httpBasic(AbstractHttpConfigurer::disable)
      .addFilterBefore(new JwtAuthorizationFilter(secretKey),
      UsernamePasswordAuthenticationFilter.class);
    return httpSecurity.build();
  }
}
