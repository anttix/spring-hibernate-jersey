package org.anttix.example.shj.rest;

import java.io.Serializable;

import javax.ws.rs.GET;
import javax.ws.rs.HEAD;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.NoRepositoryBean;
import org.springframework.data.repository.Repository;

import com.wordnik.swagger.annotations.ApiOperation;
import com.wordnik.swagger.annotations.ApiParamImplicit;
import com.wordnik.swagger.annotations.ApiParamsImplicit;

@NoRepositoryBean
@Produces(MediaType.APPLICATION_JSON)
//@org.codehaus.enunciate.modules.jersey.ExternallyManagedLifecycle
public interface ReadOnlyService<T, ID extends Serializable> extends Repository<T, ID>{
	/**
	 * Retrieves an entity by its id.
	 * 
	 * @param id must not be {@literal null}.
	 * @return the entity with the given id or {@literal null} if none found
	 * @throws IllegalArgumentException if {@code id} is {@literal null}
	 */
	@GET
	@Path("/{id}")
	@ApiOperation(value = "Retrieves an entity by its id", responseClass="T")
	public T findOne(@PathParam("id") ID id);

	/**
	 * Returns whether an entity with the given id exists.
	 * 
	 * @param id must not be {@literal null}.
	 * @return true if an entity with the given id exists, {@literal false} otherwise
	 * @throws IllegalArgumentException if {@code id} is {@literal null}
	 */
	@HEAD
	@Path("/{id}")
	public boolean exists(@PathParam("id") ID id);

	/**
	 * Returns a {@link Page} of entities meeting the paging restriction provided in the {@code Pageable} object.
	 * 
	 * @param pageable
	 * @return a page of entities
	 */
	@GET
	@ApiOperation(value = "Returns a list of entities meeting the paging restriction", multiValueResponse = true)
	@ApiParamsImplicit({
		@ApiParamImplicit(name = "limit", defaultValue = "10", dataType = "int", required = false),
		@ApiParamImplicit(name = "page", defaultValue = "0", dataType = "int", required = false)
	})
	//Page<T> findAll(@Context Pageable pageable);
	public Iterable<T> findAll(@Context Pageable pageable);

	/**
	 * Returns the number of entities available.
	 * 
	 * @return the number of entities
	 */
	@GET
	@Path("/count")
	@ApiOperation("Returns a total number of entities available")
	public long count();

	/**
	 * Returns all instances of the type.
	 * 
	 * @return all entities
	 */
	public Iterable<T> findAll();

	/**
	 * Returns all instances of the type with the given IDs.
	 * 
	 * @param ids
	 * @return
	 */
	public Iterable<T> findAll(Iterable<ID> ids);

	/**
	 * Returns all entities sorted by the given options.
	 * 
	 * @param sort
	 * @return all entities sorted by the given options
	 */
	public Iterable<T> findAll(Sort sort);
}
