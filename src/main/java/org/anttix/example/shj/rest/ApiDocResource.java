package org.anttix.example.shj.rest;

import javax.ws.rs.Path;
import javax.ws.rs.Produces;

import com.wordnik.swagger.annotations.Api;
import com.wordnik.swagger.jaxrs.listing.ApiListing;

@Path("/api-docs")
@Api("/api-docs")
@Produces({"application/json"})
public class ApiDocResource extends ApiListing {

}
