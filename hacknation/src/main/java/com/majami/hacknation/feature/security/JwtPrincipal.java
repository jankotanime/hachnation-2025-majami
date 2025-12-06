package com.majami.hacknation.feature.security;

import java.util.UUID;

public record JwtPrincipal(UUID id, String email) {}
