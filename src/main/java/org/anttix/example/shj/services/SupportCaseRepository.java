package org.anttix.example.shj.services;

import org.anttix.example.shj.domain.SupportCase;
import org.springframework.data.repository.CrudRepository;

/**
 * An example Spring DATA generated repository used by {@link SupportService}
 * 
 * @author Antti Andreimann
 *
 */
public interface SupportCaseRepository extends CrudRepository<SupportCase, Long>{

}
