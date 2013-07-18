Spring3 Hibernate4 JAX-RS REST services example
===============================================

An example application combining Spring 3, Spring Data JPA, Swagger and Jersey
to implement a RESTful web service with minimal amount of manual code

Three service examples are provided:

1. Category:
   Minimal code implementation of a basic CRUD service
   See: CategoryService.java Category.java

2. Event:
   Spring Data based example with two finders and full Swagger documentation
   See: EventService.java Event.java

3. Support:
   Manually implemented partially restful JAX-RS service example 
   Uses a Spring Data generated Repository for database access.
   See: SupportService.java SupportCaseRepository.java SupportCase.java


Installation
------------

1. Install project Lombok into your favourite IDE
   http://projectlombok.org/download.html

2. Import as Maven project

3. Run as Web app

4. Go to http://localhost:8080/spring-hibernate-jersey

For Save->Refresh workflow, run the application from command line with

    $ MAVEN_OPTS="-XX:MaxPermSize=2048m" mvn jetty:run


References
----------

http://static.springsource.org/spring-data/data-jpa/docs/1.3.2.RELEASE/reference/html/

https://github.com/SpringSource/spring-data-jpa-examples

http://blog.springsource.org/2011/04/26/advanced-spring-data-jpa-specifications-and-querydsl/

https://github.com/wordnik/swagger-core/wiki

https://github.com/wordnik/swagger-core/wiki/java-jax-rs

https://github.com/ryankennedy/swagger-jaxrs-doclet

https://jersey.java.net
