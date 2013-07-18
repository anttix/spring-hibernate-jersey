package org.anttix.example.shj.services;

import javax.inject.Inject;
import javax.inject.Named;
import javax.inject.Singleton;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;

import org.anttix.example.shj.domain.SupportCase;

import com.wordnik.swagger.annotations.Api;
import com.wordnik.swagger.annotations.ApiOperation;
import com.wordnik.swagger.annotations.ApiParam;


/**
 * An example service that exposes custom logic via JAX-RS annotations.
 * 
 * @author Antti Andreimann
 */

@Named
@Singleton
@Path("/support")
@Produces("application/json")
@Api(value = "/support", description = "Operations for submitting support requests")
public class SupportService {
	@Inject
	SupportCaseRepository scr;

	@GET
	@Path("/status/{id}")
	@ApiOperation(value = "Get the status of support case")
	public SupportCase.Status getStatus(@PathParam("id") Long id) {
		try {
			return scr.findOne(id).getStatus();
		} catch(NullPointerException e) {
			return null;
		}
	}

	@POST
	@ApiOperation(value = "Create a new support case")
	public Long postRequest(@ApiParam String description) {
		SupportCase sc = new SupportCase();
		sc.setDescription(description);
		sc.setStatus(SupportCase.Status.PENDING);

		return scr.save(sc).getId();
	}
}
