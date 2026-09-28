package com.apexcare.gateway.security;

import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.core.Ordered;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

@Component
public class JwtAuthenticationFilter
        implements org.springframework.cloud.gateway.filter.GlobalFilter, Ordered {

    @Override
    public Mono<Void> filter(
            ServerWebExchange exchange,
            GatewayFilterChain chain) {

        String path = exchange.getRequest()
                .getURI()
                .getPath();

        // Login endpoint must remain public
       if (path.equals("/auth/login")
        || exchange.getRequest().getMethod().name().equals("OPTIONS")) {
    return chain.filter(exchange);
}

        String authorizationHeader = exchange.getRequest()
                .getHeaders()
                .getFirst("Authorization");

        if (authorizationHeader == null
                || !authorizationHeader.startsWith("Bearer ")) {

            exchange.getResponse().setStatusCode(
                    HttpStatus.UNAUTHORIZED
            );

            return exchange.getResponse().setComplete();
        }

        String token = authorizationHeader.substring(7);

        if (!JwtUtil.validateToken(token)) {

            exchange.getResponse().setStatusCode(
                    HttpStatus.UNAUTHORIZED
            );

            return exchange.getResponse().setComplete();
        }

        return chain.filter(exchange);
    }

    @Override
    public int getOrder() {
        return -1;
    }
}