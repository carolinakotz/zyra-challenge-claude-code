# estágio 1: compila o projeto e gera o jar
FROM eclipse-temurin:21-jdk AS build
WORKDIR /app
COPY .mvn/ .mvn/
COPY mvnw pom.xml ./
COPY src/ src/
RUN chmod +x mvnw && ./mvnw -B -DskipTests clean package

# estágio 2: imagem final só com o JRE e o jar
FROM eclipse-temurin:21-jre
WORKDIR /app
# roda sem ser root dentro do container
RUN useradd --system --no-create-home zyra
# o padrão *.jar não pega o zyra-...jar.original
COPY --from=build /app/target/zyra-*.jar app.jar
USER zyra
EXPOSE 8080
# heap de até 60% da memória do container; o resto fica para o que a JVM usa fora do heap
# (metaspace, threads, código compilado), já que o plano gratuito tem pouca memória
ENTRYPOINT ["java", "-XX:MaxRAMPercentage=60", "-jar", "app.jar"]
