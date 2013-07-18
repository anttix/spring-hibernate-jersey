package org.anttix.example.shj.services;

import javax.ws.rs.Path;

import org.anttix.example.shj.domain.Category;
import org.anttix.example.shj.rest.CrudService;

import com.wordnik.swagger.annotations.Api;

/**
 * An example service that uses Spring DATA and a JAX-RS annotated base
 * interface to automatically expose a CRUD service.
 * 
 * @author Antti Andreimann
 */
@Path("/categories")
@Api(value = "/categories", description = "Operations on categories")
public interface CategoryService extends CrudService<Category, Long> {

}

