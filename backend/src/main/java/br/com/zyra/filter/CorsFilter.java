package br.com.zyra.filter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

// libera o frontend (Vite em http://localhost:5173) para chamar esta API pelo navegador
// roda antes de tudo (HIGHEST_PRECEDENCE) para que até as respostas de erro levem os headers de CORS;
// sem eles o navegador esconderia do frontend o {"message": "..."} do erro
@Component
@Order(Ordered.HIGHEST_PRECEDENCE)
public class CorsFilter extends OncePerRequestFilter {

    private static final String ORIGEM_PERMITIDA = "http://localhost:5173";
    private static final String METODOS_PERMITIDOS = "GET, POST, PUT, DELETE, OPTIONS";
    private static final String HEADERS_PERMITIDOS = "Content-Type";

    // por quanto tempo (em segundos) o navegador pode guardar a resposta do preflight
    private static final String TEMPO_CACHE_PREFLIGHT = "3600";

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
                                    FilterChain chain) throws ServletException, IOException {
        String origem = request.getHeader("Origin");

        // a resposta muda conforme o Origin, então caches intermediários precisam saber disso
        response.addHeader("Vary", "Origin");

        // só devolve os headers de CORS para a origem liberada; outras origens ficam sem eles
        // e o próprio navegador bloqueia a leitura da resposta
        if (ORIGEM_PERMITIDA.equals(origem)) {
            response.setHeader("Access-Control-Allow-Origin", ORIGEM_PERMITIDA);
            response.setHeader("Access-Control-Allow-Methods", METODOS_PERMITIDOS);
            response.setHeader("Access-Control-Allow-Headers", HEADERS_PERMITIDOS);
            // deixa o JavaScript do frontend ler o header Location devolvido pelo POST
            response.setHeader("Access-Control-Expose-Headers", "Location");
            response.setHeader("Access-Control-Max-Age", TEMPO_CACHE_PREFLIGHT);
        }

        // preflight: o navegador manda um OPTIONS antes do POST/PUT/DELETE perguntando se pode.
        // respondemos aqui mesmo com 200 e os headers acima, sem passar pelos resources
        if (isPreflight(request)) {
            response.setStatus(HttpServletResponse.SC_OK);
            return;
        }

        chain.doFilter(request, response);
    }

    private boolean isPreflight(HttpServletRequest request) {
        return "OPTIONS".equalsIgnoreCase(request.getMethod())
                && request.getHeader("Origin") != null
                && request.getHeader("Access-Control-Request-Method") != null;
    }
}
