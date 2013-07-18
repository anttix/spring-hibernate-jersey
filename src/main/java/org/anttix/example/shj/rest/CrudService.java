package org.anttix.example.shj.rest;

import java.io.Serializable;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.MediaType;

import org.springframework.data.repository.NoRepositoryBean;

import com.wordnik.swagger.annotations.ApiOperation;
import com.wordnik.swagger.annotations.ApiParam;

@NoRepositoryBean
@Consumes(MediaType.APPLICATION_JSON)
public interface CrudService<T, ID extends Serializable> extends ReadOnlyService<T, ID> {

	/**
	 * Saves a given entity. Use the returned instance for further operations as the save operation might have changed the
	 * entity instance completely.
	 * 
	 * @param entity
	 * @return the saved entity
	 */
	@POST
	@ApiOperation("Saves a given entity")
	public T save(@ApiParam T entity);

	// FIXME: Implement put, it should require/honor an object ID passed in as a path parameter
	// @PUT

	/**
	 * Deletes the entity with the given id.
	 * 
	 * @param id must not be {@literal null}.
	 * @throws IllegalArgumentException in case the given {@code id} is {@literal null}
	 */
    @DELETE
    @Path("/{id}")
	@ApiOperation("Deletes the entity with the given id")
	public void delete(@PathParam("id") ID id);

	/**
	 * Deletes all entities managed by the repository.
	 */
	@DELETE
	@ApiOperation("Deletes all entities managed by the repository")
	public void deleteAll();

	/**
	 * Saves all given entities.
	 * 
	 * @param entities
	 * @return the saved entities
	 * @throws IllegalArgumentException in case the given entity is (@literal null}.
	 */
	public <S extends T> Iterable<S> save(Iterable<S> entities);

	/**
	 * Deletes a given entity.
	 * 
	 * @param entity
	 * @throws IllegalArgumentException in case the given entity is (@literal null}.
	 */
	public void delete(T entity);

	/**
	 * Deletes the given entities.
	 * 
	 * @param entities
	 * @throws IllegalArgumentException in case the given {@link Iterable} is (@literal null}.
	 */
	public void delete(Iterable<? extends T> entities);
}
