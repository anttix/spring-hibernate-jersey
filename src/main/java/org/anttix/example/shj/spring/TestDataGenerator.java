package org.anttix.example.shj.spring;

import java.util.ArrayList;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import javax.inject.Named;
import javax.inject.Singleton;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import lombok.extern.slf4j.Slf4j;

import org.anttix.example.shj.domain.Event;
import org.anttix.example.shj.domain.Category;
import org.springframework.beans.factory.BeanFactory;
import org.springframework.context.annotation.Profile;
import org.springframework.transaction.annotation.Transactional;

@Named
@Singleton
@Profile("dev")
@Slf4j
public class TestDataGenerator {
	@Inject
	private BeanFactory bf;

	@PersistenceContext
	private EntityManager em;

	@PostConstruct
	public void init() {
		TestDataGenerator self = bf.getBean(TestDataGenerator.class);
		self.generateTestData();
	}

	@Transactional
	public void generateTestData() {
		final int ncat = 5;
		final int nevent = 10;

		//log.info("Generating {} test categories", ncat);
		ArrayList<Category> categories = new ArrayList<Category>();
		for(int i = 1; i <= ncat; i++) {
			Category c = new Category();
			c.setName("Cat " + i);
			em.persist(c);
			categories.add(c);
		}

		//log.info("Generating {} test events", nevent);
		for(int i = 1; i <= nevent; i++) {
			Event e = new Event();
			e.setName("Event " + i);
			e.setCategory(categories.get(i % categories.size()));
			e.setDescription("Special Event #" + i);
			em.persist(e);
		}
		em.flush();
	}
}
