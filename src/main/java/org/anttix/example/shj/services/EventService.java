package org.anttix.example.shj.services;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;

import org.anttix.example.shj.domain.Event;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.Repository;

import com.wordnik.swagger.annotations.Api;
import com.wordnik.swagger.annotations.ApiOperation;
import com.wordnik.swagger.annotations.ApiParam;
import com.wordnik.swagger.annotations.ApiParamImplicit;
import com.wordnik.swagger.annotations.ApiParamsImplicit;

/**
 * An example service that uses Spring DATA to for implementation and Swagger
 * annotations to generate full documentation for every supported operation.
 * 
 * @author Antti Andreimann
 * 
 */
@Path("/events")
@Api(value = "/events", description = "Operations on events")
public interface EventService extends Repository<Event, Long> {
	@GET
	@Path("/count")
	@Produces("application/json")
	@ApiOperation("Returns a total number of events in the system")
	public long count();

	@GET
	@Produces("application/json")
	@ApiOperation(value = "Returns a list of events meeting the paging restriction",
					multiValueResponse = true, responseClass = "org.anttix.example.shj.domain.Event")
	@ApiParamsImplicit({
		@ApiParamImplicit(name = "limit", defaultValue = "10", dataType = "int", required = false),
		@ApiParamImplicit(name = "page", defaultValue = "0", dataType = "int", required = false)
	})
	public Iterable<Event> findAll(@Context Pageable pageable);

	@GET
	@Path("/find/byCategoryName/{name}")
	@Produces("application/json")
	@ApiOperation(value = "Find events by category name")
	@ApiParamsImplicit({
		@ApiParamImplicit(name = "limit", defaultValue = "10", dataType = "int", required = false),
		@ApiParamImplicit(name = "page", defaultValue = "0", dataType = "int", required = false)
	})
	public Page<Event> findByCategoryName(@PathParam("name") String name, @Context Pageable pageable);
	
	@GET
	@Path("/find/byCategoryId/{id}")
	@Produces("application/json")
	@ApiOperation(value = "Find events by category ID")
	@ApiParamsImplicit({
		@ApiParamImplicit(name = "limit", defaultValue = "10", dataType = "int", required = false),
		@ApiParamImplicit(name = "page", defaultValue = "0", dataType = "int", required = false)
	})
	public Page<Event> findByCategoryId(@PathParam("id") Long id, @Context Pageable pageable);

	@POST
	@Consumes("application/json")
	@ApiOperation("Saves a given event")
	public Event save(@ApiParam Event entity);

	@GET
	@Path("/{id}")
	@Produces("application/json")
	@ApiOperation(value = "Retrieves an event by its id", 
			responseClass = "org.anttix.example.shj.domain.Event")
	public Event findOne(@PathParam("id") Long id);

	@DELETE
	@Path("/{id}")
	@ApiOperation("Deletes the event with the given id")
	public void delete(@PathParam("id") Long id);

	@DELETE
	@ApiOperation("Deletes all events from the system")
	public void deleteAll();	
}