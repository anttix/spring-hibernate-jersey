package org.anttix.example.shj.spring;


import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.aspectj.EnableSpringConfigured;

import com.wordnik.swagger.jaxrs.JaxrsApiReader;

@Configuration
@ComponentScan("org.anttix.example.shj")
@EnableSpringConfigured
public class AppContext {
	static {
		JaxrsApiReader.setFormatString("");
	}
}