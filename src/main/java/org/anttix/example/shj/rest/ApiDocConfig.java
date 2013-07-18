package org.anttix.example.shj.rest;

import javax.servlet.ServletConfig;

import com.wordnik.swagger.jaxrs.ConfigReader;

public class ApiDocConfig extends ConfigReader {
	private String basePath;

    public ApiDocConfig(ServletConfig config) {
    	basePath = config.getServletContext().getContextPath() + "/rest";
    }

	@Override
	public String basePath() {
		return basePath;
	}

	@Override
	public String swaggerVersion() {
	    return com.wordnik.swagger.core.SwaggerSpec.version();
	}

	@Override
	public String apiVersion() {
		return "1.0";
	}

	@Override
	public String modelPackages() {
		return "org.anttix.example.shj.domain";
	}

	@Override
	public String apiFilterClassName() {
		return null;
	}
	
}
