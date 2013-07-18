package org.anttix.example.shj.spring;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@Configuration
@EnableJpaRepositories("org.anttix.example.shj.services")
public class RepositoryContext {

}
